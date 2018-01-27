import React, { Component } from 'react';
import { IRates } from '../../store/IStore';
import { ECurrency, TCurrency } from '../../types/currency';
import { formatMoney } from '../../utils/money';
import { mergeStyles } from '../../utils/style';
import ConversionRate from '../ConversionRate';

const style = require('./style.css');

export interface IHeaderProps {
  sourceCurrency: TCurrency;
  targetCurrency: TCurrency;
  rates: IRates;
  isExchangeAllowed: boolean;
  onExchange: () => void;
}

export default class Header extends Component<IHeaderProps, {}> {
  public render() {
    const { sourceCurrency, targetCurrency, rates, isExchangeAllowed } = this.props;

    return (
      <div className={style.container}>
        <div className={style.left}></div>
        <div className={style.rate}>
          <ConversionRate
            sourceCurrency={sourceCurrency}
            targetCurrency={targetCurrency}
            rates={rates}
          />
        </div>
        <div className={style.right}>
          <div
            {...mergeStyles(style.exchange, !isExchangeAllowed && style.exchangeDisabled)}
            onClick={() => this.handleExchangeClick()}>
              Exchange
          </div>
        </div>
      </div>
    );
  }

  private handleExchangeClick() {
    const { isExchangeAllowed } = this.props;

    if (!isExchangeAllowed) {
      return;
    }

    this.props.onExchange();
  }
}
