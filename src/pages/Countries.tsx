import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Country } from "../types/country";

export default function Countries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=cca2,name,capital,population,area,region,subregion,flags",
      );
      const data = await res.json();
      setCountries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  let filtered = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  if (sort === "pop-asc") {
    filtered.sort((a, b) => a.population - b.population);
  } else if (sort === "pop-desc") {
    filtered.sort((a, b) => b.population - a.population);
  } else if (sort === "area-asc") {
    filtered.sort((a, b) => a.area - b.area);
  } else if (sort === "area-desc") {
    filtered.sort((a, b) => b.area - a.area);
  }

  if (loading) return <p className="loading">Betöltés...</p>;

  return (
    <div className="container">
      <h2>Országok</h2>

      <input
        placeholder="Keresés..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">Rendezés</option>
        <option value="pop-asc">Népesség növekvő</option>
        <option value="pop-desc">Népesség csökkenő</option>
        <option value="area-asc">Terület növekvő</option>
        <option value="area-desc">Terület csökkenő</option>
      </select>

      {filtered.length === 0 && <p>Nincs találat</p>}

      <div className="countries-grid">
        {filtered.map((c) => (
          <div className="country-card" key={c.cca2}>
            <img src={c.flags.png} />

            <h3>{c.name.common}</h3>
            <p>Főváros: {c.capital?.[0]}</p>
            <p>Népesség: {c.population}</p>
            <p>Terület: {c.area} km²</p>
            <p>Népsűrűség: {Math.round(c.population / c.area)}</p>

            <Link to={`/country/${c.cca2}`}>Részletek</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
