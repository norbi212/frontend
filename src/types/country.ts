export interface Country {
  cca2: string;
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  population: number;
  area: number;
  region: string;
  subregion: string;
  flags: {
    png: string;
  };
}
