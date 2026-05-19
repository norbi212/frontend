export default function Home() {
  return (
    <div className="container">
      <h1>CityExplorer – országadatok</h1>

      <p>
        Ez az alkalmazás a világ országainak adatait jeleníti meg egy külső API
        segítségével. Lehetőséged van keresni, böngészni és részletes
        információkat megtekinteni. Az alkalmazás React és TypeScript
        használatával készült. A cél az adatok feldolgozása és vizuális
        megjelenítése.
      </p>

      <img src="/images/countries.jpg" style={{ width: "100%" }} />
    </div>
  );
}
