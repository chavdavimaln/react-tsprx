import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { productsList } from "../../Pages/Shop/ProductsList";

export default function NavSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [index, setIndex] = useState(-1);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const filtered = productsList.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    setResults(filtered);
    setIndex(-1);
  }, [query]);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) { setResults([]); setIndex(-1); } };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goToProduct = (product) => {
    navigate(`/product/${product.id}`);
    setQuery("");
    setResults([]);
  };

  const handleKeyDown = (e) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setIndex(i => i < results.length - 1 ? i + 1 : 0); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setIndex(i => i > 0 ? i - 1 : results.length - 1); }
    else if (e.key === "Enter" && index >= 0) { e.preventDefault(); goToProduct(results[index]); }
    else if (e.key === "Escape") { setResults([]); setIndex(-1); }
  };

  return (
    <div ref={ref}>
      <div className="input-group">
        <input className="form-control" placeholder="Search products..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown} />
        <button className="btn btn-outline-secondary" onClick={() => index >= 0 ? goToProduct(results[index]) : results.length && goToProduct(results[0])}>
          <Search size={18} />
        </button>
      </div>
      {results.length > 0 && (
        <ul className="dropdown-menu show mt-1" style={{ maxHeight: "300px", overflowY: "auto" }}>
          {results.map((p, i) => (
            <li key={p.id}>
              <div className={`dropdown-item ${i === index ? "active" : ""}`} onClick={() => goToProduct(p)} onMouseEnter={() => setIndex(i)} style={{ cursor: "pointer" }}>
                <div className="product-main">{p.name}</div>
                <div className="product-subtitle text-muted small">{p.prescription.split(" ").slice(0, 5).join(" ")}{p.prescription.split(" ").length > 5 && "..."}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}