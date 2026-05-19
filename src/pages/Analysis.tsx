import { useEffect, useState } from "react";

export default function Analysis() {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=cca2,name,population,area,region",
      );
      const data = await res.json();
      setCountries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading">Betöltés...</p>;

  const regions: Record<string, number> = {};

  countries.forEach((c) => {
    regions[c.region] = (regions[c.region] || 0) + 1;
  });

  const top10 = [...countries]
    .sort((a, b) => b.population - a.population)
    .slice(0, 10);

  const largest = countries.reduce(
    (max, c) => (c.area > max.area ? c : max),
    countries[0],
  );

  return (
    <div className="container analysis">
      <h2>Elemzés</h2>

      <h3>Országok száma régiónként</h3>
      {Object.entries(regions).map(([region, count]) => (
        <p key={region}>
          {region}: {count}
        </p>
      ))}

      <h3>Top 10 legnépesebb ország</h3>
      {top10.map((c) => (
        <p key={c.cca2}>{c.name.common}</p>
      ))}

      <h3>Legnagyobb területű ország</h3>
      <p>{largest?.name?.common}</p>
    </div>
  );
}
