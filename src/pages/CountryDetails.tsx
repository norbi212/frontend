import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CountryDetails() {
  const { code } = useParams();
  const [country, setCountry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/alpha/${code}?fields=name,capital,population,area,region,subregion,flags,languages,currencies`,
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setCountry(data[0]);
      } else {
        setCountry(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading">Betöltés...</p>;
  if (!country) return <p>Hiba történt</p>;

  const pop = country.population;

  let category = "";
  if (pop < 10000000) category = "kis ország";
  else if (pop < 50000000) category = "közepes ország";
  else category = "nagy ország";

  return (
    <div className="details">
      <img src={country.flags.png} />

      <h2>{country.name.official}</h2>
      <p>
        {country.region} - {country.subregion}
      </p>

      <p>Nyelvek: {Object.values(country.languages || {}).join(", ")}</p>

      <p>
        Pénznemek:{" "}
        {Object.values(country.currencies || {})
          .map((c: any) => c.name)
          .join(", ")}
      </p>

      <p>Kategória: {category}</p>
    </div>
  );
}
