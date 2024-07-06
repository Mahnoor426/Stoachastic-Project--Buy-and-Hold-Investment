import React, { useState } from "react";
import Sidebar from "../Components/Sidebar";
import "../../src/index.css"; // Assuming you create a Home.css file for styles

export default function GoogleKDE() {
  const [kdePlot, setKdePlot] = useState(null);
  const [description, setDescription] = useState("");

  const descriptions = {
    sde_gbm: <ul>

      <li><strong>Most Likely Outcome:</strong> The KDE plot shows that the most likely final outcome of the investment is around $500,000, indicated by the peak of the curve.</li>
      <li><strong>Distribution Spread:</strong> The right-skewed distribution with a significant spread suggests a higher probability of moderate investment returns, but also indicates the potential for extreme values up to around $2,500,000.</li>
      <li><strong>Volatility:</strong> The broad spread of the KDE curve implies a high level of volatility in the predicted investment outcomes, indicating substantial uncertainty and risk in the investment results.</li>

    </ul>,
    analytic_exp_gbm: <ul>
      <li><strong>Most Likely Outcome:</strong> The KDE plot indicates that the most likely final value of the investment is around $1,000,000, as shown by the peak of the curve.</li>
      <li><strong>Distribution Spread:</strong> The plot reveals a right-skewed distribution, with the majority of the density concentrated below $1,000,000 and a long tail extending towards higher values up to around $3,000,000.</li>
      <li><strong>Volatility and Risk:</strong> The broad spread and the presence of the long right tail suggest a considerable level of volatility and potential for extreme positive outcomes, indicating substantial uncertainty in the investment's final value.</li>

    </ul>,
    analytic: (
      <ul>
        <li><strong>Most Likely Outcome:</strong> The KDE plot indicates that the most likely final value of the investment is around $500,000, as evidenced by the peak of the curve.</li>
        <li><strong>Distribution Spread:</strong> The plot displays a right-skewed distribution, with a high density around the peak and a long tail extending towards higher values up to approximately $2,500,000, suggesting the potential for higher but less probable investment returns.</li>
        <li><strong>Volatility and Risk:</strong> The shape and spread of the KDE curve suggest considerable volatility, highlighting significant uncertainty in the predicted investment values and indicating the presence of both moderate and extreme potential outcomes.</li>


      </ul>
    ),
  };

  const plotKDE = async (model) => {
    try {
      const response = await fetch(
        `http://localhost:5001/plot-kde?model=${model}`
      );
      console.log("response", response);
      const blob = await response.blob();
      console.log("blob in home", blob);
      setKdePlot(URL.createObjectURL(blob));
      setDescription(descriptions[model]);
    } catch (error) {
      console.error("Error fetching KDE plot:", error);
      // Handle error if fetching or processing fails
    }
  };
  console.log(kdePlot);
  const runSimulation = async () => {
    try {
      const response = await fetch("http://localhost:5001/run-simulation", {
        method: "POST",
      });
      if (response.ok) {
        const resultText = await response.text();
        const result = resultText ? JSON.parse(resultText) : {};
        console.log(result);
      } else {
        console.error(
          "Simulation failed:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error running simulation:", error);
    }
  };
  return (
    <div className="page-container">
      <Sidebar className="sidebar" />
      <div className="main-content">
        <h1 className="main-heading">Monte Carlo Simulations for Google Data</h1>
        <button className="click-btn btn-style510" style={{marginLeft:"30px"}}  onClick={runSimulation}>
          Run Simulation
        </button>
        <div className="containerddd">
          <div className="button-container">
            <div className="buttons-wrapper">
              <button
                className="click-btn btn-style510"
                onClick={() => plotKDE("sde_gbm")}
              >
                Plot KDE (SDE GBM)
              </button>
            </div>
            <div className="buttons-wrapper">
              <button
                className="click-btn btn-style510"
                onClick={() => plotKDE("analytic_exp_gbm")}
              >
                Plot KDE (Analytic Exp GBM)
              </button>
            </div>
            <div className="buttons-wrapper">
              <button
                className="click-btn btn-style510"
                onClick={() => plotKDE("analytic")}
              >
                Plot KDE (Analytic)
              </button>
            </div>
          </div>
          {kdePlot && (
            <div className="graph-container">
              <img
                id="kde-plot"
                className="result"
                alt="KDE Plot"
                src={kdePlot}
              />
              <div className="description-container">{description}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
