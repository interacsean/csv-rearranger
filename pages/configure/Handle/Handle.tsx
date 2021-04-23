import React from 'react';
import { ComponentWithClassNames } from '../../../types/ComponentWithClassNames';
import clx from '../../../utils/Html/clx';
import css from '../configure.module.scss';

export function Handle(props: ComponentWithClassNames) {
  return (
    <span className={`${props.className ? clx(props.className) : ''} ${css.dragHandle}`}>
      &#8226;&#8226;&#8226;<br/>
      &#8226;&#8226;&#8226;
    </span>
  );
}
