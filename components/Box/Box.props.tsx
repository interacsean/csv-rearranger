import React, { CSSProperties } from 'react';
import { UtilProps } from '../../utils/Html/getUtilClasses';

type InheritedProps = Partial<
  Omit<
    React.BaseHTMLAttributes<any>,
    'className' | 'tagName' | 'children' | 'style'
  >
>;

export interface BoxPublicProps extends InheritedProps, UtilProps {
  children?: React.ReactNode;
  className?: string | (string | undefined | false)[];
  tagName?: string;
  style?: CSSProperties;
  flex?: boolean;
  'flex-col'?: boolean;
  'flex-center'?: boolean;
  'flex-wrap'?: boolean;
  'flex-1'?: boolean;
  'flex-pri'?:
    | 'start'
    | 'center'
    | 'end'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  'flex-sec'?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  'inline-block'?: boolean;
}

export interface BoxProps extends BoxPublicProps {}
