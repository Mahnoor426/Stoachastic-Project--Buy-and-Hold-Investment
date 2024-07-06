from flask import Flask, jsonify, request, send_file, render_template
import matplotlib 
matplotlib.use('Agg')  # Use a non-GUI backend
import pandas as pd
import numpy as np
#import matplotlib as plt
import matplotlib.pyplot as plt
import io
from Monte_Carlo_GBM import Monte_Carlo_SDE_GBM, Alternative_Monte_Carlo_GBM, Analytic_Solution_GBM, evaluate_algorithms
from Post_processing import plot_kde, show_stats, print_percentiles, plot_price_with_time, plot_histogram

# app = Flask(__name__)
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# Load the ETF data
ETF_data = pd.read_excel('ETF_data.xlsx', index_col=0, parse_dates=['date'])
ETF_data.index.name = 'date'
ETF_data['return'] = (ETF_data['close'].pct_change()).shift(-1)

ETF_data['ln_return'] = (np.log(ETF_data['close'].shift(-1) / ETF_data['close']))
trading_days_per_year = int(ETF_data['close'].resample("Y").count()[:-1].mean())
delta_days = (ETF_data.index.date[-1] - ETF_data.index.date[0]).days
cumu_return = (ETF_data.close[-1] - ETF_data.close[0]) / ETF_data.close[0]
annual_return = (1 + cumu_return)**(365 / delta_days) - 1
daily_sigma = np.std(ETF_data['return'])
annual_sigma = daily_sigma * np.sqrt(trading_days_per_year)

S0 = ETF_data.close[-1]
sigma = annual_sigma
mu = annual_return
T = 10
dt = 1 / trading_days_per_year
n_ETF = 10000 / S0
num_iterations = 100

# Initialize Matrix_results globally
Matrix_results = None

models = {
    'sde_gbm': Monte_Carlo_SDE_GBM,
    'analytic_exp_gbm': Alternative_Monte_Carlo_GBM,
    'analytic': Analytic_Solution_GBM
}
color_map = {
    'sde_gbm': 'blue',
    'analytic_exp_gbm': 'green',
    'analytic': 'red'
}

@app.route('/')
def home():
    return render_template('index.html')

# Route to get ETF data
@app.route('/etf-data', methods=['GET'])
def get_etf_data():
    etf_data_copy = ETF_data.copy()
    etf_data_copy.reset_index(inplace=True)
    etf_data_dict = etf_data_copy.to_dict(orient='records')
    return jsonify(etf_data_dict)

@app.route('/monte-carlo-properties', methods=['GET'])
def get_monte_carlo_properties():
    properties = {
        'Initial price S0': f'{round(S0, 1)}$',
        'Annualized return mu': f'{round(mu, 4) * 100}%',
        'Annualized volatility sigma': f'{round(sigma, 4) * 100}%',
        'Period of simulation': f'{T} years',
        'Timestep': f'{round(dt, 3)} days',
        'Number of ETF(s) held': f'{round(n_ETF, 3)}'
    }
    return jsonify(properties)

# Route to run Monte Carlo simulations and return results
@app.route('/run-simulation', methods=['POST'])
def run_simulation():
    global Matrix_results
    Matrix_results = evaluate_algorithms(models, num_iterations, S0, sigma, mu, T, dt, n_ETF)
    matrix_results_json = []
    for df in Matrix_results:
        matrix_results_json.append(df.to_dict(orient='records'))
    return jsonify(matrix_results_json)


def generate_plot(plot_func, *args, **kwargs):
    img = io.BytesIO()
    plot_func(*args, **kwargs)
    plt.savefig(img, format='png', bbox_inches='tight')
    img.seek(0)
    plt.close()
    return img

@app.route('/plot-price-time', methods=['GET'])
def plot_price_time():
    if Matrix_results is None:
        return jsonify({"error": "Simulations not run yet"}), 400
    name = request.args.get('model')
    if name not in models:
        return jsonify({"error": "Model not found"}), 404
    img = generate_plot(plot_price_with_time, name, Matrix_results[list(models.keys()).index(name)], T, dt)
    return send_file(img, mimetype='image/png')



@app.route('/plot-histogram', methods=['GET'])
def plot_histogram_route():
    if Matrix_results is None:
        return jsonify({"error": "Simulations not run yet"}), 400
    name = request.args.get('model')
    if name not in models:
        return jsonify({"error": "Model not found"}), 404
    color = color_map.get(name, 'blue')  # Default to blue if the model is not in the color map
    img = generate_plot(plot_histogram, name, Matrix_results[list(models.keys()).index(name)], color)
    return send_file(img, mimetype='image/png')


# Route to get kde plot
@app.route('/plot-kde', methods=['GET'])
def plot_kde_route():
    if Matrix_results is None:
        return jsonify({"error": "Simulations not run yet"}), 400
    name = request.args.get('model')
    if name not in models:
        return jsonify({"error": "Model not found"}), 404
    color = color_map.get(name, 'blue')  # Default to blue if the model is not in the color map
    img = generate_plot(plot_kde, name, Matrix_results[list(models.keys()).index(name)], color)
    return send_file(img, mimetype='image/png')

# Route to get statistics
@app.route('/statistics', methods=['GET'])
def get_statistics():
    if Matrix_results is None:
        return jsonify({"error": "Simulations not run yet"}), 400
    stats = {}
    for name, _ in models.items():
        stats[name] = show_stats(name, Matrix_results[list(models.keys()).index(name)])
    return jsonify(stats)

# Route to get percentiles
@app.route('/percentiles', methods=['GET'])
def get_percentiles():
    if Matrix_results is None:
        return jsonify({"error": "Simulations not run yet"}), 400
    percentiles = {}
    for name, _ in models.items():
        percentiles[name] = print_percentiles(name, Matrix_results[list(models.keys()).index(name)])
    return jsonify(percentiles)

if __name__ == '__main__':
     app.run(debug=True, port=5000)

