import { CSSProperties } from 'react';

export type IStyleConfig = Array<CSSProperties | string> | CSSProperties | string;

export interface IStyleProps {
  style: CSSProperties;
  className: string;
}

export type IStyleArgument = IStyleConfig | IStyleProps | void;

const isStyleProps = (styleProps: IStyleArgument): styleProps is IStyleProps =>
  (styleProps as IStyleProps).style !== undefined && (styleProps as IStyleProps).className !== undefined;

export function mergeStyles(...styles: IStyleArgument[]): IStyleProps {
  return [].concat.apply([], styles)
    .reduce((acc: IStyleProps, style: IStyleArgument) => {
      if (typeof style === 'string') {
        acc.className += acc.className.length === 0
          ? style
          : ` ${style}`;
      } else if (typeof style === 'object') {

        if (isStyleProps(style)) {

          acc.className += acc.className.length === 0
            ? style.className
            : ` ${style.className}`;

          Object.assign(acc.style, style.style);

        } else {
          Object.assign(acc.style, style);
        }
      }

      return acc;
    }, { style: {}, className: '' });
}
