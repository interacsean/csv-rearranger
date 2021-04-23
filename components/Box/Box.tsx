import React, { FC, ReactElement } from 'react';

import getUtilClasses from '../../utils/Html/getUtilClasses';
import clx from '../../utils/Html/clx';
import { BoxProps } from './Box.props';

const NON_TAG_PROPS = [
  'mt',
  'mr',
  'mb',
  'ml',
  'mh',
  'mv',
  'pt',
  'pr',
  'pb',
  'pl',
  'ph',
  'pv',
  'p',
  'h',
];

const Box: FC<BoxProps> = ({
  className,
  flex: flex,
  'flex-1': flex1,
  'flex-col': flexCol,
  'flex-center': flexCenter,
  'flex-wrap': flexWrap,
  'inline-block': inlineBlock,
  'flex-pri': flexPri,
  'flex-sec': flexSec,
  children,
  tagName,
  ...props
}: BoxProps): ReactElement<'div'> => {
  const Tag = tagName || 'div';
  const utilClasses = getUtilClasses(props);

  const tagProps = (Object.keys(
    props
  ) as (keyof typeof props)[]).reduce<Partial<BoxProps>>(
    (acc, tagPropName ) => {
      if (!NON_TAG_PROPS.includes(tagPropName) && props[tagPropName] !== undefined) {
        // Note: careful mutation here to avoid potential performance issues
        acc[tagPropName] = props[tagPropName];
      }
      return acc;
    },
    {},
  )

  return (
    // @ts-ignore (Assuming props.tagName is a valid html element, and that tagProps are applicable to it)
    <Tag
      className={clx([
        className && clx(className),
        (flex || flexCol || flexCenter || flexPri || flexSec || flexWrap) &&
          'flex',
        flexCol && '--col',
        flexCenter && '--center',
        flexWrap && '--wrap',
        flexPri && `--pri-${flexPri}`,
        flexSec && `--sec-${flexSec}`,
        flex1 && 'flex-1',
        inlineBlock && 'inline-block',
        ...utilClasses,
      ])}
      {...tagProps}
    >
      {children || null}
    </Tag>
  );
};

export default React.memo(Box);
