import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fontsource/roboto'; // Example font, you can choose another font
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  TableChart as TableIcon,
  Insights as InsightsSharp,
  Assessment as AssessmentOutlined,
  Analytics as AnalyticsOutlined,
  Google as GoogleIcon,
  Apple as AppleIcon
} from '@mui/icons-material';
import '../../src/index.css';

const Sidebar = () => {
  const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      window.addEventListener("resize", listener);
      return () => window.removeEventListener("resize", listener);
    }, [matches, query]);

    return matches;
  };

  const navigate = useNavigate();

  let menuItems = [
    { name: "Invest Wise", icon: <HomeIcon />, path:"/" },
    { name: "About the Dataset", icon: <TableIcon />, path:"/tables" },
    { name: "ETFKDE", icon: <InsightsSharp />, path: "/home" },
    { name: "ETFPlotTime", icon: <AnalyticsOutlined />, path: "/ETFplottime" },
    { name: "ETFHistrogram", icon: <AssessmentOutlined />, path: "/ETFhistrogram" },
    { name: "GoogleKDE", icon: <GoogleIcon />, path: "/google" },
    { name: "GooglePlotTime", icon: <GoogleIcon />, path: "/googleplottime" },
    { name: "GoogleHistrogram", icon: <GoogleIcon />, path: "/googlehistrogram" },
    { name: "AppleKDE", icon: <AppleIcon />, path: "/apple" },
    { name: "AppleHistrogram", icon: <AppleIcon />, path: "/applehistrogram" },
    { name: "ApplePlotTime", icon: <AppleIcon />, path: "/applePlotTime" },
    { name: "", icon: null , path: "" },

  ];

  const [hovered, setHovered] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const changeSmall = useMediaQuery("(max-height: 550px)");

  return (
    <div className={`sidebar ${expanded && "expanded"}`} style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div
        className={`boxicon-container`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="icon hamburger">
          <MenuIcon />
        </div>
      </div>
      {menuItems.map((item, index) => (
        <div
          className={`boxicon-container ${expanded && "expanded-boxicon-container"}`}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate(item.path)}
          key={index}
        >
          <div
            className={`icon boxicon`}
            style={{
              fontSize: changeSmall ? "20px" : "24px",
              color: hovered === index ? "white" : item.color
            }}
          >
            {item.icon}
          </div>
          <p className={`description ${expanded && "show-description"}`}>
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
