import "./Table.css";
import numberOne from '../assets/numberOne.svg'
import numberTwo from '../assets/numberTwo.svg'
import numberThree from '../assets/numberThree.svg'
import Sidebar from "../Components/Sidebar";

const googleData = [
  {
    date: "2023-06-20",
    Open: 122.93,
    High: 124.57,
    Low: 122.14,
    AdjClose: 122.96,
    Volume: 26097500,
  },
  {
    date: "2023-06-21",
    Open: 122.4,
    High: 122.66,
    Low: 120.1,
    AdjClose: 120.41,
    Volume: 30306300,
  },
  {
    date: "2023-06-22",
    Open: 120.0,
    High: 123.24,
    Low: 118.83,
    AdjClose: 123.01,
    Volume: 26952200,
  },
  {
    date: "2023-06-23",
    Open: 121.38,
    High: 122.79,
    Low: 121.06,
    AdjClose: 122.2,
    Volume: 34885300,
  },
  {
    date: "2023-06-26",
    Open: 120.76,
    High: 122.0,
    Low: 118.27,
    AdjClose: 118.2,
    Volume: 33969900,
  },
  {
    date: "2023-06-27",
    Open: 118.9,
    High: 119.8,
    Low: 116.5,
    AdjClose: 117.3,
    Volume: 23408500,
  },
  {
    date: "2023-06-28",
    Open: 117.4,
    High: 118.5,
    Low: 115.0,
    AdjClose: 117.0,
    Volume: 29804000,
  },
  {
    date: "2023-06-29",
    Open: 118.2,
    High: 119.6,
    Low: 117.0,
    AdjClose: 119.0,
    Volume: 30484500,
  },
];

const appleData = [
  {
    date: "2023-06-20",
    Open: 184.41,
    High: 186.1,
    Low: 184.41,
    AdjClose: 184.28,
    Volume: 49799100,
  },
  {
    date: "2023-06-21",
    Open: 184.9,
    High: 185.41,
    Low: 182.59,
    AdjClose: 183.24,
    Volume: 49515700,
  },
  {
    date: "2023-06-22",
    Open: 183.74,
    High: 187.05,
    Low: 183.67,
    AdjClose: 186.26,
    Volume: 51245300,
  },
  {
    date: "2023-06-23",
    Open: 185.55,
    High: 187.56,
    Low: 185.01,
    AdjClose: 185.95,
    Volume: 53079300,
  },
  {
    date: "2023-06-26",
    Open: 186.83,
    High: 188.05,
    Low: 185.23,
    AdjClose: 184.54,
    Volume: 48088700,
  },
  {
    date: "2023-06-27",
    Open: 185.97,
    High: 187.0,
    Low: 183.68,
    AdjClose: 185.29,
    Volume: 47962000,
  },
  {
    date: "2023-06-28",
    Open: 187.42,
    High: 189.45,
    Low: 186.94,
    AdjClose: 188.0,
    Volume: 56129800,
  },
  {
    date: "2023-06-29",
    Open: 188.25,
    High: 190.61,
    Low: 187.0,
    AdjClose: 189.59,
    Volume: 66249300,
  },
];

const etfData = [
  { date: "2005-01-03T00:00:00Z", close: 1784.956 },
  { date: "2005-01-04T00:00:00Z", close: 1764.302 },
  { date: "2005-01-05T00:00:00Z", close: 1758.067 },
  { date: "2005-01-06T00:00:00Z", close: 1764.626 },
  { date: "2005-01-07T00:00:00Z", close: 1762.123 },
  { date: "2005-01-10T00:00:00Z", close: 1768.166 },
  { date: "2005-01-11T00:00:00Z", close: 1757.506 },
  { date: "2005-01-12T00:00:00Z", close: 1764.717 },
];

export default function TableSection() {
  return (
    <div style={{display:"flex",flexDirection:"row"}}>

   
    <Sidebar/>
    <div>
    <section>
      <div className="dataset_description">
        <h1 className="datasetDescription_h1">
          Project <span className="highlight">Datasets</span>.
        </h1>
        <p className="datasetDescription_p">
          This section of our website is dedicated to providing you with a brief
          overview of historical market data for Exchange Traded Funds (ETFs)
          and major technology companies, specifically Apple Inc. (APPLE) and
          Google Inc. (GOOGLE). By analyzing this data, investors and market
          enthusiasts can gain valuable insights into market trends, price
          movements, and trading volumes.
        </p>
      </div>
      <img className="dataset_Number" src={numberOne} alt="numberOne" />
      <div className="table_section-container">
        <div className="table-container">
          <h2 className="dataTable_h2">ETF Stock Data</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Close</th>
              </tr>
            </thead>
            <tbody>
              {etfData.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  <td>{row.close}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table_description">
          <h2>APPLE Dataset Explanation</h2>
          <p>
            The dataset contains historical stock price data for Alphabet Inc.
            (GOOGL). The columns include:
          </p>
          <ul>
            <li>
              <strong>Date</strong>: The date of the trading day.
            </li>
            <li>
              <strong>Close</strong>: This column represents the closing price
              of the ETF (Exchange Traded Fund) on the respective date.
            </li>
          </ul>
        </div>
      </div>
      <img className="dataset_Number" src={numberTwo} alt="numberTwo" />
      <div className="table_section-container">
        <div className="table-container">
          <h2 className="dataTable_h2">GOOGLE Stock Data</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Adj Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {googleData.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  <td>{row.Open}</td>
                  <td>{row.High}</td>
                  <td>{row.Low}</td>
                  <td>{row.AdjClose}</td>
                  <td>{row.Volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table_description">
          <h2>GOOGLE Dataset Explanation</h2>
          <p>
            The dataset contains historical stock price data for Alphabet Inc.
            (GOOGL). The columns include:
          </p>
          <ul>
            <li>
              <strong>Date</strong>: The date of the trading day.
            </li>
            <li>
              <strong>Open</strong>: The opening price of the stock on that
              date.
            </li>
            <li>
              <strong>High</strong>: The highest price of the stock on that
              date.
            </li>
            <li>
              <strong>Low</strong>: The lowest price of the stock on that date.
            </li>
            <li>
              <strong>Adj Close</strong>: The adjusted closing price of the
              stock, which accounts for events such as stock splits and
              dividends.
            </li>
            <li>
              <strong>Volume</strong>: The number of shares traded on that date.
            </li>
          </ul>
        </div>
      </div>
      <img className="dataset_Number" src={numberThree} alt="numberThree" />
      <div className="table_section-container">
        <div className="table-container">
          <h2 className="dataTable_h2">APPLE Stock Data</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Open</th>
                <th>High</th>
                <th>Low</th>
                <th>Adj Close</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {appleData.map((row, index) => (
                <tr key={index}>
                  <td>{row.date}</td>
                  <td>{row.Open}</td>
                  <td>{row.High}</td>
                  <td>{row.Low}</td>
                  <td>{row.AdjClose}</td>
                  <td>{row.Volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table_description">
          <h2>APPLE Dataset Explanation</h2>
          <p>
            The dataset contains historical stock price data for Alphabet Inc.
            (GOOGL). The columns include:
          </p>
          <ul>
            <li>
              <strong>Date</strong>: The date of the trading day.
            </li>
            <li>
              <strong>Open</strong>: The opening price of the stock on that
              date.
            </li>
            <li>
              <strong>High</strong>: The highest price of the stock on that
              date.
            </li>
            <li>
              <strong>Low</strong>: The lowest price of the stock on that date.
            </li>
            <li>
              <strong>Adj Close</strong>: The adjusted closing price of the
              stock, which accounts for events such as stock splits and
              dividends.
            </li>
            <li>
              <strong>Volume</strong>: The number of shares traded on that date.
            </li>
          </ul>
        </div>
      </div>
    </section>
    </div>
    </div>
  );
}
