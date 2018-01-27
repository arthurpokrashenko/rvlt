import React, { Component } from 'react';
import { IRates } from '../../store/IStore';
import { ECurrency, TCurrency } from '../../types/currency';
import { calculateConversionRate, extractRates, formatMoney } from '../../utils/money';
const style = require('./style.css');

export interface IConversionRateProps {
  sourceCurrency: TCurrency;
  targetCurrency: TCurrency;
  rates: IRates;
}

export default class ConversionRate extends Component<IConversionRateProps, {}> {
  public render() {
    const { sourceCurrency, targetCurrency, rates } = this.props;

    const exchangeRate = calculateConversionRate({
      sourceCurrency,
      targetCurrency,
      baseCurrency: rates.base,
      rates: extractRates(rates),
    });

    return (
      <div className={style.container}>
        {formatMoney(1, sourceCurrency)} = {formatMoney(exchangeRate, targetCurrency)}
      </div>
    );
  }
}
