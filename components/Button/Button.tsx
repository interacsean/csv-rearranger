import React from 'react';
import clx from '../../utils/Html/clx';
import Box from '../Box/Box';
import { ButtonProps } from './Button.props';
import css from './Button.module.scss';

const Button = (props: ButtonProps) => {
  const onClickHandler = React.useCallback(
    () =>
      !props.disabled && props.onClick
        ? props.onClick()
        : null,
    [props.onClick, props.disabled],
  );
  const isPrimary = !props.secondary && !props.tertiary;
  const isMedium = !props.small && !props.large;

  return (
    <button
      onClick={onClickHandler}
      className={clx([
        css['button'],
        props.className && clx(props.className),
        isPrimary && css['--style-primary'],
        props.secondary && css['--style-secondary'],
        props.tertiary && css['--style-tertiary'],
        props.outline && css['--style-outline'],
        !props.outline && css['--style-filled'],
        isMedium && css['--size-medium'],
        props.large && css['--size-large'],
        props.small && css['--size-small'],
        props.disabled && css['--state-disabled'],
        props['full-width'] && css['--var-full-width'],
        props['full-width-mobile'] && css['--var-full-width-mobile'],
      ])}
      disabled={props.disabled}
      type={props.type}
    >
      {/* todo: Loading icon animation */}
      {props.loading && (
        <Box flex className={['--center', css['_loadingIndicator']]}>
          •••
        </Box>
      )}
      <span
        className={clx([
          css._buttonContent,
          props.loading && css['--loading'],
        ])}
      >
        {props.children}
      </span>
    </button>
  );
}

export default Button;
