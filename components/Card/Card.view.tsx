import { FC } from 'react';
import React from 'react';

import { CardProps } from './Card.props';

import css from './Card.module.scss';
import clx from '../../utils/Html/clx';
import Box from '../Box/Box';

const Card: FC<CardProps> = (props: CardProps) => {
  return (
    <Box
      className={[
        props.className && clx(props.className),
        css.card,
        props['high-contrast'] && css['--var-high-contrast'],
        !props['no-radius'] && css['--default-radius'],
        !props['no-background'] && css['--default-background'],
        !props['no-pad'] && css['--default-padding'],
      ]}
    >
      {props.children}
    </Box>
  );
};

export default React.memo(Card);
