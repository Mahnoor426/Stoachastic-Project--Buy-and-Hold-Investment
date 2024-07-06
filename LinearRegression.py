import pandas as pd
from sklearn.linear_model import LinearRegression

def run_linear_regression(file_path):
    # Load the Excel file
    df = pd.read_excel(file_path)

    # Extract the relevant columns
    X = df[['Open', 'High', 'Low', 'Adj Close', 'Volume']]
    y = df['close']

    # Fit linear regression model
    model = LinearRegression()
    model.fit(X, y)

    # Coefficients and intercept
    coefficients = model.coef_
    intercept = model.intercept_

    # Apply the formula to calculate the 'Predicted Close' for each row
    df['Predicted_Close'] = intercept + (
        coefficients[0] * df['Open'] +
        coefficients[1] * df['High'] +
        coefficients[2] * df['Low'] +
        coefficients[3] * df['Adj Close'] +
        coefficients[4] * df['Volume']
    )

    # Drop the existing 'Close' column
    df = df.drop(columns=['close'])

    # Save the DataFrame with the new column to a new Excel file
    output_file_path = file_path.replace('.xlsx', '_with_predictions.xlsx')
    df.to_excel(output_file_path, index=False)

    return output_file_path
