# Import all modules used in the script
import stat
import matplotlib.pyplot as plt
import matplotlib.ticker
import seaborn as sns 
import numpy as np

# This function plots the evolution of the price with time for the different simulations
def plot_price_with_time(model_name, results, T, dt):
    values = results.values
    mean_final_price = values[-1].mean()  # Compute the mean of the last row of results dataframe

    # n_steps = round(T / dt)
    n_steps = values.shape[0]  # Use the number of rows in results_simulation
    t = np.linspace(0, T, n_steps)  # Creates a time vector to plot from 0 to T with timesteps of n_steps

    fig = plt.figure()
    plt.style.use('bmh')
    title = f"Monte Carlo Simulation : {T} Years"
    for col in values.T:
        plt.plot(t, col)  
    # plt.plot(t, results)  # Plot the final prices results in function of time
    fig.suptitle(title,fontsize=18, fontweight='bold')
    fig.text(0.15, 0.75, 'Model ' + str(model_name) , color = 'r' , weight = 'bold', va='center', size = 18, )
    plt.xlabel('Years')
    plt.ylabel('Investment Value ($)')
    plt.grid(True, color='grey')
    plt.axhline(y=mean_final_price, color='r', linestyle='-', label=f'Last mean ETF investment value: {mean_final_price:.3f} $')  # Plot the mean final price line
    plt.legend()
    plt.tight_layout()
    return plt.gcf()

# This function plots the histogram of the distribution of final values for the different simulations
def plot_histogram(name, results_simulation, color):
    values = results_simulation.values
    final_price = values[-1]  # retrieve the final price data --> values of last row of the results dataframe
    num_bins = 100
    # Create the histogram
    plt.figure()
    n, bins, patches = plt.hist(final_price, num_bins, density=True, alpha=0.5, label=name, color=color)
    plt.xlabel('Value ($)')
    plt.ylabel('Probability')
    plt.title(r'Histogram of Speculated Investment Value', fontsize=17, fontweight='bold')
     # plot vertical line of 30%-percentile 
    plt.axvline(np.percentile(final_price,30), linestyle='dashed', linewidth=2, label = '30%-ile: ' 
                + str(round(np.percentile(final_price,30), 2)) + '$', color='k')
    # Tweak spacing to prevent clipping of ylabel
    plt.subplots_adjust(left=0.15)
    plt.legend()
    return plt.gcf()
   


# This function plots the kde of the distribution of final values for the simulation results
def plot_kde(name, results_simulation, color,save_fig = 1):       
    values = results_simulation.values
    final_price = values[-1] # retrieve the final price data --> values of last row of the results dataframe

    sns.distplot(final_price, rug=False, hist =False, 
                kde_kws={"color": str(color), "lw": 3, "shade": True, "label": str(name)})
                #hist_kws={"histtype": "step", "linewidth": 3, "alpha": 1, "color": "g"})     

    plt.xlabel('Value ($)')
    plt.ylabel('Probability')
    plt.title(r'KDE of Speculated Investment Value', fontsize=17, fontweight='bold')
    plt.legend()

    # Tweak spacing to prevent clipping of ylabel
    plt.subplots_adjust(left=0.15)
    return plt.gcf()


# Function to show statistics for simulation results
def show_stats(name, results_simulation):
    stats = {}
    
    # Last Price Stats
    stats['Last_Price_Stats'] = {
        'Mean_Price': np.mean(results_simulation.iloc[-1, :]),
        'Maximum_Price': np.max(results_simulation.iloc[-1, :]),
        'Minimum_Price': np.min(results_simulation.iloc[-1, :]),
        'Standard_Deviation': np.std(results_simulation.iloc[-1, :])
    }
    
    # Descriptive Stats
    stats['Descriptive_Stats'] = results_simulation.iloc[-1, :].describe().to_dict()
    
    return stats



# This function prints the percentiles for the final price distribution of the simulation
def print_percentiles(name, results_simulation):
    values = results_simulation.values
    final_price = values[-1]
    p_tiles = np.percentile(final_price,[5,15,30,50,70,85,95])
    
    percentiles_data = {
        "model": name,
        "percentiles": {}
    }
    
    for p in range(len(p_tiles)):
        l = [5, 15, 30, 50, 70, 85, 95]
        percentiles_data["percentiles"][f"{l[p]}%-ile"] = round(p_tiles[p], 1)
    
    percentiles_data["70%_greater_than"] = round(p_tiles[2], 1)
    percentiles_data["70%_range"] = (round(p_tiles[1], 1), round(p_tiles[-2], 1))
    
    return percentiles_data



