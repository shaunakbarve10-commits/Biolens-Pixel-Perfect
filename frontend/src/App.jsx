import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="app-background">
      <div className="streak"></div>
      <div className="glass-container">
        <Navbar />
        <div style={{ padding: "20px" }}>
          <h1>Items</h1>
          {items.length > 0 ? (
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          ) : (
            <p>No items found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
