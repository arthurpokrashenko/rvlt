import React, { Component, CSSProperties } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { IRates } from '../../store/IStore';
import { ECurrency, TCurrency } from '../../types/currency';
import { calculateConversionRate, formatMoney } from '../../utils/money';
import { mergeStyles } from '../../utils/style';
import CurrencyPlate from '../CurrencyPlate';
import HeaderContainer from '../Header/container';

const style = require('./style.css');

const carouselOptions = {
  showArrows: false,
  showStatus: false,
  showThumbs: false,
  emulateTouch: true,
  verticalSwipe: 'natural',
};

const carouselCurrenciesOrder: Array<TCurrency> = ['EUR', 'GBP', 'USD'];

export interface IExchangeProps {
  balance: {[key in ECurrency]: number};
  sourceCurrency: TCurrency;
  targetCurrency: TCurrency;
  sourceAmount: number;
  targetAmount: number;
  rates: IRates;
  rateBase: TCurrency;
  updateRates: () => void;
  onChangeSourceCurrency: (currency: TCurrency) => void;
  onChangeTargetCurrency: (currency: TCurrency) => void;
  onChangeSourceAmount: (value: number) => void;
}

export interface IExchangeState {}

class Exchange extends Component<IExchangeProps, IExchangeState> {
  private ratesTimer: NodeJS.Timer;

  public render() {
    const { sourceCurrency, targetCurrency, sourceAmount, targetAmount } = this.props;

    return (
      <div className={style.container}>
        <div>
          <HeaderContainer/>
        </div>
        <div className={style.plate}>
          {this.renderCarousel({
            selectedCurrency: sourceCurrency,
            amount: sourceAmount,
            isSource: true,
            onChange: this.handleSourceCurrencyIndexChanged.bind(this),
            onAmountChange: this.props.onChangeSourceAmount.bind(this),
            plateCSS: style.plateSource,
          })}
          <div className={style.plateArrow}></div>
        </div>
        <div {...mergeStyles(style.plate, style.plateTarget)}>
          {this.renderCarousel({
            selectedCurrency: targetCurrency,
            amount: targetAmount,
            isSource: false,
            onChange: this.handleTargetCurrencyIndexChanged.bind(this),
          })}
        </div>
      </div>
    );
  }

  public componentDidMount() {
    this.props.updateRates();
    this.ratesTimer = setInterval(this.props.updateRates, 10 * 1000);
  }

  public componentWillUnMount() {
    clearInterval(this.ratesTimer);
  }

  private handleSourceCurrencyIndexChanged(index: number) {
    const { onChangeSourceCurrency } = this.props;
    const currency = carouselCurrenciesOrder[index];

    onChangeSourceCurrency(currency);
  }

  private handleTargetCurrencyIndexChanged(index: number) {
    const { onChangeTargetCurrency } = this.props;
    const currency = carouselCurrenciesOrder[index];

    onChangeTargetCurrency(currency);
  }

  private renderCarousel(options: {
      selectedCurrency: TCurrency;
      amount: number;
      isSource: boolean;
      onChange: (index: number) => void;
      onAmountChange?: (value: number) => void;
      plateCSS?: CSSProperties;
    },
  ) {
    const { balance, rates, rateBase, sourceCurrency } = this.props;
    const selectedIndex = carouselCurrenciesOrder.indexOf(options.selectedCurrency || 'EUR') || 0;

    return (
      <Carousel {...carouselOptions} selectedItem={selectedIndex} onChange={options.onChange}>
        {carouselCurrenciesOrder.map(item => {
          const rate = calculateConversionRate({
            sourceCurrency: item,
            targetCurrency: sourceCurrency,
            baseCurrency: rateBase,
            rates,
          });
          const rateStr = `${formatMoney(1, item)} = ${formatMoney(rate, sourceCurrency)}`;

          return (
            <CurrencyPlate
              key={item}
              isSelected={sourceCurrency === item}
              isSource={options.isSource}
              balance={balance[item]}
              currency={item}
              amount={options.amount}
              onChange={options.onAmountChange}
              rate={options.isSource ? undefined : rateStr}
              containerStyle={options.plateCSS}
            />
          );
        })}
      </Carousel>
    );
  }
}

export default Exchange;
