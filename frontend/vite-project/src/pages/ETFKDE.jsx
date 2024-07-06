import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import '../../src/index.css'; // Assuming you create a Home.css file for styles

export default function ETFKDE() {
  const [kdePlot, setKdePlot] = useState(null);
  const [description, setDescription] = useState('');

  const descriptions = {
    sde_gbm: (
      <ul>
        
        <li><strong>Most Likely Outcome:</strong> The KDE plot indicates that the most likely final outcome of the investment is around the peak of the curve.</li>
<li><strong>Distribution Spread:</strong> The plot displays a right-skewed distribution, with a high density around the peak and a long tail extending towards higher values, suggesting the potential for higher but less probable investment returns.</li>
<li><strong>Volatility:</strong> The shape and spread of the KDE curve suggest considerable volatility, highlighting significant uncertainty in the predicted investment outcomes and indicating the presence of both moderate and extreme potential results.</li>


        {/* <li><strong>Analysis:</strong> Peaks in the KDE plot indicate higher likelihood of certain final prices, offering a clear visual representation of potential investment outcomes.</li> */}
      </ul>
    ),
    analytic_exp_gbm: (
      <ul>
       <li><strong>Most Likely Outcome:</strong> The KDE plot indicates that the most likely final outcome of the investment is around the peak of the curve.</li>
<li><strong>Distribution Spread:</strong> The plot displays a right-skewed distribution, with a high density around the peak and a long tail extending towards higher values, suggesting the potential for higher but less probable investment returns.</li>
<li><strong>Volatility:</strong> The shape and spread of the KDE curve suggest moderate volatility, highlighting some uncertainty in the predicted investment outcomes and indicating the presence of both moderate and extreme potential results.</li>

      </ul>
    ),
    analytic: (
      <ul>


<li><strong>Most Likely Outcome:</strong> The KDE plot indicates that the most likely final outcome of the investment is around the peak of the curve.</li>
<li><strong>Distribution Spread:</strong> The plot displays a right-skewed distribution, with a high density around the peak and a long tail extending towards higher values, suggesting the potential for higher but less probable investment returns.</li>
<li><strong>Volatility:</strong> The shape and spread of the KDE curve suggest considerable volatility, highlighting significant uncertainty in the predicted investment outcomes and indicating the presence of both moderate and extreme potential results.</li>

      </ul>
    )
  };

  const plotKDE = async (model) => {
    try {
      const response = await fetch(`/api/plot-kde?model=${model}`);
      console.log("response", response)
      const blob = await response.blob();
      console.log("blob in home", blob)
      setKdePlot(URL.createObjectURL(blob));
      setDescription(descriptions[model]);
    } catch (error) {
      console.error('Error fetching KDE plot:', error);
      // Handle error if fetching or processing fails
    }
  };
  console.log(kdePlot)
  const runSimulation = async () => {
    try {
      const response = await fetch('api/run-simulation', { method: 'POST' });
      if (response.ok) {
        const resultText = await response.text();
        const result = resultText ? JSON.parse(resultText) : {};
        console.log(result);
      } else {
        console.error('Simulation failed:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error running simulation:', error);
    }
  };
  return (
    <div className="page-container">
      <Sidebar className="sidebar" />
      <div className="main-content">
        <h1 className="main-heading">Monte Carlo Simulations for ETF Data</h1>
        <button className="click-btn btn-style510" style={{marginLeft:"30px"}}  onClick={runSimulation}>Run Simulation</button>
        <div className="containerddd">
          <div className='button-container'>
            <div className='buttons-wrapper'>
              <button className="click-btn btn-style510" onClick={() => plotKDE('sde_gbm')}>Plot KDE (SDE GBM)</button>
            </div>
            <div className='buttons-wrapper'>
              <button className="click-btn btn-style510" onClick={() => plotKDE('analytic_exp_gbm')}>Plot KDE (Analytic Exp GBM)</button>
            </div>
            <div className='buttons-wrapper'>
              <button className="click-btn btn-style510" onClick={() => plotKDE('analytic')}>Plot KDE (Analytic)</button>
            </div>
          </div>
          {kdePlot && (
            <div className="graph-container">
              <img id="kde-plot" className="result" alt="KDE Plot" src={kdePlot} />
              <div className="description-container">
                {description}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
