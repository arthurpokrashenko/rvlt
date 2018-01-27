
import * as React from 'react';

interface IWhenProps {
  children: React.ReactNode;
  check?: boolean;
}

const When = (props: IWhenProps) => {
  if (props.check && props.children) {
    return props.children;
  }

  return null;
};

export default When;
