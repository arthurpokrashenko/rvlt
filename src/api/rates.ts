import config from '../config';
import { ECurrency } from './../types/currency';

export function getRates(): Promise<{[key in ECurrency]: number}> {
  const apiKey = config.OERApiKey;

  return new Promise((resolve, reject) => {
    fetch(`https://openexchangerates.org/api/latest.json?app_id=${apiKey}`)
      .then(resp => resp.json())
      .then(data => {
        const { USD, GBP, EUR } = data.rates;
        resolve({ USD, GBP, EUR });
      })
      .catch(e => reject(e));
  });
}
