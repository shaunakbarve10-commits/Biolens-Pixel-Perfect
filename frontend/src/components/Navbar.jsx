import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo"><img src="logo.jpg"></img></h1>
      <ul className="nav-links">
        <li>
          <a href="#" className="nav-link">Home</a>
        </li>
        <li>
          <a href="#" className="nav-link">About</a>
        </li>
        <li>
          <a href="#" className="nav-link">Contact</a>
        </li>
      </ul>
    </nav>
  );
}
