import "./Home.css";
import heroImage1 from "../assets/heroImg1.svg";
import heroImage2 from "../assets/heroImg2.svg";
import heroImage3 from "../assets/heroImg3.svg";
import Sidebar from "../Components/Sidebar";

export default function Home() {
  const models = [
    {
      name: "Monte Carlo SDE GBM",
      description:
        "This method simulates price paths using drift (return) and shock (volatility) from Geometric Brownian Motion's SDE over discrete time steps.",
    },
    {
      name: "Alternative Monte Carlo GBM",
      description:
        "This approach uses pre-generated random deviates to model Brownian motion, combining them with drift and volatility to calculate the GBM price path at each time step.",
    },
    {
      name: "Analytic Solution GBM",
      description:
        "This method uses the closed-form GBM solution, generating a single random value for Brownian motion and applying it to the analytic solution to obtain the terminal price",
    },
  ];
  const steps = [
    {
      stepNo: 1,
      title: "Define the Objective",
      description:
        "Predict future ETF prices using Monte Carlo simulations by generating numerous possible price paths based on historical data and statistical techniques.",
    },
    {
      stepNo: 2,
      title: "Gather Historical Data",
      description:
        "Collect historical price data for the ETF to calculate necessary parameters like average return and volatility.",
    },
    {
      stepNo: 3,
      title: "Set Simulation Parameters",
      description:
        "Determine initial stock price, average return rate (mean), volatility (standard deviation), prediction time frame, number of time steps, and simulations.",
    },
    {
      stepNo: 4,
      title: "Generate Random Paths",
      description:
        "Use the Geometric Brownian Motion model to create random future price paths by applying calculated mean and volatility changes.",
    },
    {
      stepNo: 5,
      title: "Execute Simulations",
      description:
        "Perform simulations by iterating through each time step, applying random price changes, and repeating the process for the desired number of simulations.",
    },
  ];
  return (
    <div className="parentHomepage_container">
    <Sidebar />
    <div className="homepage_container">
        <section className="hero-section">
          <div className="hero-content">
            <div className="tagline">
              Invest Today, Prosper Tomorrow: Embrace the Future with Buy and
              Hold
              <span role="img" aria-label="temple">
                🏛️
              </span>
            </div>
            <h1>
              Invest Wise: <span className="lineBreak">Buy and Hold.</span>
            </h1>
            <p>
              Discover the power of patience with our Buy and Hold investment
              strategy. By focusing on long-term growth, you can ride out market
              fluctuations and steadily increase your wealth. Trust in proven
              methods and expert insights to secure a prosperous financial
              future. Start investing today and watch your wealth flourish over
              time.
            </p>
          </div>
          <div className="hero-image">
            <figure className="snip1401">
              <img src={heroImage1} alt="Hero Image1" />
              <figcaption>
                <h3>Steady Growth</h3>
                <p>
                  Invest for the long term to experience consistent and reliable
                  growth.
                </p>
              </figcaption>
            </figure>
            <figure className="snip1401">
              <img src={heroImage2} alt="Hero Image2" />
              <figcaption>
                <h3>Market Resilience</h3>
                <p>
                  Weather market fluctuations with a strategy designed for
                  stability.
                </p>
              </figcaption>
            </figure>
            <figure className="snip1401">
              <img src={heroImage3} alt="Hero Image3" />
              <figcaption>
                <h3>Expert Insights</h3>
                <p>
                  Leverage proven methods and expert advice for optimal returns.
                </p>
              </figcaption>
            </figure>
          </div>
        </section>
        <section className="monteCarloSection">
          <h1>
            What is <span className="highlight">Monte Carlo Simulation</span>?
          </h1>
          <p className="para_MonteCarlo">
            Monte Carlo Simulation is a computational technique used to estimate
            the behavior of complex systems and understand the impact of risk
            and uncertainty in prediction models. It involves generating a large
            number of random samples from probability distributions of uncertain
            variables. These random samples are used to run multiple
            simulations, often thousands or more, to observe a range of possible
            outcomes. By analyzing these outcomes, it provides a probabilistic
            understanding of the models behavior, offering insights into the
            likelihood of different results and helping to make informed
            decisions. This method is widely used in fields such as finance,
            engineering, supply chain management, and project management to
            model the effects of uncertainty and variability.
          </p>
          <h1 className="monteCarlo_h1">
            How <span className="highlight">Monte Carlo Simulation</span> is
            Utilized in Our Project?
          </h1>
          <h3 className="container_name"> STEPS </h3>
          <div className="monte-carlo-simulation">
            {steps.map((step, index) => (
              <div className="card" key={index}>
                <h4 className="stepNo">{step.stepNo}</h4>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
          <h3 className="container_name"> MODELS </h3>
        </section>
        <div className="models_section">
          <div className="ModelCard-container">
            <p className="models_explanation">
              In our project, we explore the dynamic world of asset price
              simulation through the implementation of three advanced Monte
              Carlo models based on Geometric Brownian Motion (GBM). Each model
              offers a unique approach to simulating asset price paths,
              providing a comprehensive understanding of market behavior. By
              utilizing stochastic differential equations, pre-generated random
              values, and closed-form solutions, these models allow us to
              capture the intricate interplay of drift, volatility, and
              randomness inherent in financial markets. Through these
              simulations, we aim to enhance our predictive capabilities and
              gain deeper insights into asset price dynamics.
            </p>
            {models.map((model, index) => (
              <div key={index} className="ModelCard">
                <div className="ModelCard-inner">
                  <div className="ModelCard-front">
                    <h3 className="model_heading">{model.name}</h3>
                  </div>
                  <div className="ModelCard-back">
                    <p className="model_description">{model.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
