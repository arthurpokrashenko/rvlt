import accounting from 'accounting';
import { ECurrency, TCurrency } from '../types/currency';
import { IRates } from './../store/IStore';

const currencySymbols: {
  [key in ECurrency]: string;
} = {
  [ECurrency.USD]: '$',
  [ECurrency.EUR]: '€',
  [ECurrency.GBP]: '£',
};

export function formatMoney(amount: number, currency: TCurrency): string {
  const hasFractions = amount - Math.trunc(amount) > 0;

  if (hasFractions) {
    return accounting.formatMoney(amount, currencySymbols[currency]);
  }

  return accounting.formatMoney(amount, {
    symbol: currencySymbols[currency],
    precision: 0,
  });
}

export function calculateConversionRate(options: {
  sourceCurrency: TCurrency;
  targetCurrency: TCurrency;
  baseCurrency: TCurrency;
  rates: {[key in ECurrency]: number};
}): number {
  const { sourceCurrency, targetCurrency, baseCurrency, rates } = options;
  const baseCurrencyRate = rates[baseCurrency];
  const sourceCurrencyRate = rates[sourceCurrency];
  const targetCurrencyRate = rates[targetCurrency];
  const rate = targetCurrencyRate / sourceCurrencyRate;

  return rate;
}

export function extractRates(ratesState: IRates): {[key in ECurrency]: number} {
  // tslint:disable-next-line:no-any
  const rates: any = {};

  for (let key in ratesState) {
    if (ratesState.hasOwnProperty(key) && key !== 'base') {
      rates[key] = ratesState[key];
    }
  }

  return rates;
}
