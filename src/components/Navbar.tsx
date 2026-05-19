import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Főoldal</Link>
      <Link to="/countries">Országok</Link>
      <Link to="/analysis">Elemzés</Link>
      <Link to="/info">Infó</Link>
    </nav>
  );
}
