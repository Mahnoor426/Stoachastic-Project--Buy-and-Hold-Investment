// import React, { useState } from 'react';
// import '../../src/index.css';

// export default function PriceTimePlot() {
//   const [graphImage, setGraphImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const plotPriceTime = async (model) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`/plot-price-time?model=${model}`);
//       const blob = await response.blob();
//       const imageUrl = URL.createObjectURL(blob);
//       setGraphImage(imageUrl);
//     } catch (error) {
//       console.error('Error fetching price-time plot:', error);
//       // Handle error if fetching or processing fails
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className='button-container'>
//         <div className='buttons-wrapper'>
//           <button className="click-btn btn-style510" onClick={() => plotPriceTime('sde_gbm')}>
//             Plot Price-Time (SDE GBM)
//           </button>
//         </div>
//         <div className='buttons-wrapper'>
//           <button className="click-btn btn-style510" onClick={() => plotPriceTime('analytic_exp_gbm')}>
//             Plot Price-Time (Analytic Exp GBM)
//           </button>
//         </div>
//         <div className='buttons-wrapper'>
//           <button className="click-btn btn-style510" onClick={() => plotPriceTime('analytic')}>
//             Plot Price-Time (Analytic)
//           </button>
//         </div>
//       </div>
//       <div className="graph-container">
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           <img id="price-time-plot" className="result" src={graphImage} alt="Price-Time Plot" />
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import '../../src/index.css'; // Assuming you create a Home.css file for styles

export default function AppleHistrogram() {
  const [Plottimeprice, setPlottimeprice] = useState(null);
  const [description, setDescription] = useState('');

  const descriptions = {
    sde_gbm: (
      <ul>
      <li><strong>Model Approaches:</strong> The graphs depict the distribution of final simulated investment values using three different approaches of the Geometric Brownian Motion (GBM) model.</li>
      <li><strong>x-axis:</strong> Represents the final values of the investment in dollars.</li>
      <li><strong>y-axis:</strong> Represents the probability density of these values.</li>
      <li><strong>Histogram:</strong> Shaded in varying colors to represent the frequency of the final values.</li>
      <li><strong>Vertical Line</strong>A vertical dashed line marks the 30th percentile of the distribution,</li>
  </ul>
  
    ),
    analytic_exp_gbm: (
      <ul>
      <li><strong>Model Approaches:</strong> The graphs depict the distribution of final simulated investment values using three different approaches of the Geometric Brownian Motion (GBM) model.</li>
      <li><strong>x-axis:</strong> Represents the final values of the investment in dollars.</li>
      <li><strong>y-axis:</strong> Represents the probability density of these values.</li>
      <li><strong>Histogram:</strong> Shaded in varying colors to represent the frequency of the final values.</li>
      <li><strong>Vertical Line</strong>A vertical dashed line marks the 30th percentile of the distribution,</li>
  </ul>
  
    ),
    analytic: (
      <ul>
      <li><strong>Model Approaches:</strong> The graphs depict the distribution of final simulated investment values using three different approaches of the Geometric Brownian Motion (GBM) model.</li>
      <li><strong>x-axis:</strong> Represents the final values of the investment in dollars.</li>
      <li><strong>y-axis:</strong> Represents the probability density of these values.</li>
      <li><strong>Histogram:</strong> Shaded in varying colors to represent the frequency of the final values.</li>
      <li><strong>Vertical Line</strong>A vertical dashed line marks the 30th percentile of the distribution,</li>
  </ul>
  
    ),
  };

  const plotKDE = async (model) => {
    try {
      const response = await fetch(`http://localhost:5002/plot-histogram?model=${model}`);
      console.log("response", response);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.startsWith('image/png')) {
        const blob = await response.blob();
        console.log('Fetched blob:', blob);
        const imageUrl = URL.createObjectURL(blob);
        console.log('Created URL:', imageUrl);
        setPlottimeprice(imageUrl);
        setDescription(descriptions[model]);
      } else {
        throw new Error('Unexpected content type received.');
      }
    } catch (error) {
      console.error('Error fetching or processing KDE plot:', error);
      // Handle error if fetching or processing fails
    }
  };
  
  
  return (
    <div className="page-container">
      <Sidebar className="sidebar" />
      <div className="main-content">
        {/* <h1 className="main-heading">Monte Carlo Simulations for ETF Data</h1> */}
        <div className="containerddd">
          <div className='button-container'>
            <div className='buttons-wrapper'>
              <button className="click-btn btn-style510" onClick={() => plotKDE('sde_gbm')}>Plot Histogram  (SDE GBM)</button>
            </div>
            <div className='buttons-wrapper'>
              <button className="click-btn btn-style510" onClick={() => plotKDE('analytic_exp_gbm')}>Plot Histogram (Analytic Exp GBM)</button>
            </div>
            <div className='buttons-wrapper'>
              <button className="click-btn btn-style510" onClick={() => plotKDE('analytic')}>Plot Histogram (Analytic)</button>
            </div>
          </div>
          {Plottimeprice && (
            <div className="graph-container">
              <img id="kde-plot" className="result" alt="KDE Plot" src={Plottimeprice} />
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
