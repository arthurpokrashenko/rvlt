import { ECurrency, TCurrency } from './../types/currency';
export type IRates = { base: TCurrency; [key: string]: string } & {[key in ECurrency]: number};

export interface IStore {
  balance: {[key in ECurrency]: number};
  rates: IRates;
  exchange: {
    sourceCurrency: TCurrency;
    targetCurrency: TCurrency;
    sourceAmount: number;
    targetAmount: number;
  };
}
