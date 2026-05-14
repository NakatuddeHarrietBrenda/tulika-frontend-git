import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Dashboard</Link> | 
      <Link to="/segmentation"> Segmentation</Link> | 
      <Link to="/sentiment"> Sentiment</Link> | 
      <Link to="/recommend"> Recommendations</Link>
    </nav>
  );
}

export default Navbar;