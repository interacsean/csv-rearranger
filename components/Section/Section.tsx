import React from 'react';

import Box from '../Box/Box';

import css from './Section.module.scss';
import clx from '../../utils/Html/clx';

interface Props {
  bgColor?: string,
  altPanel?: boolean,
  noVPad?: boolean,
  children?: string | React.ReactNode,
  className?: string | (string | false)[],
}

const Section = (props: Props) => {
  const custClass = [
    props.className && clx(props.className),
    css.sectionCtnr,
    props.altPanel && css.__altPanel,
    !props.noVPad && css.__vPad,
  ];
  const sectionCtnrStyle = React.useMemo(
    () => ({
      backgroundColor: props.bgColor,
    }),
    [props.bgColor],
  );

  return (
    <Box className={custClass} style={sectionCtnrStyle}>
      <Box className={css.sectionInner}>
        {props.children}
      </Box>
    </Box>
  );
};

export default Section;
