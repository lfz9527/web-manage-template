import {
  InputNumber as AntInputNumber,
  type InputNumberProps as AntInputNumberProps,
} from 'antd';
import React from 'react';

export interface CustomInputNumberProps extends AntInputNumberProps {
  style?: React.CSSProperties;
}

const InputNumber: React.FC<CustomInputNumberProps> = ({ style, ...props }) => (
  <AntInputNumber
    style={{ width: '100%', ...style }} // 添加默认的 object-fit 样式
    {...props}
  />
);

export default InputNumber;
