const getCssExtn = (n: number) => {
  switch (n) {
    case 2:
      return '-2';
    case 3:
      return '-3';
    case 4:
      return '-4';
    case 1 / 2:
      return '-1-2';
    case 1 / 3:
      return '-1-3';
    case 1 / 4:
      return '-1-4';
    case 1:
      return '';
  }
};

const applyUtilClasses = (prefix: string, value: undefined | number | false) =>
  !value ? false : `${prefix}${getCssExtn(value)}`;

export interface UtilProps {
  m?: number | false;
  mt?: number | false;
  mr?: number | false;
  mb?: number | false;
  ml?: number | false;
  mh?: number | false;
  mv?: number | false;
  p?: number | false;
  pt?: number | false;
  pr?: number | false;
  pb?: number | false;
  pl?: number | false;
  ph?: number | false;
  pv?: number | false;
}
type UtilPropsKeys = (keyof UtilProps)[];

const utilPropKeys: UtilPropsKeys = <UtilPropsKeys>[
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mh',
  'mv',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'ph',
  'pv',
];

/**
 * Create an array of known utility classnames from a props object
 *
 * E.g. props of:  { mv: 1, ph: 1 / 2 }
 * Returns:        ['mv-1', 'ph-1-2']
 */
function getUtilClasses<P extends UtilProps>(props: P) {
  return utilPropKeys.map(
      (pfx) => applyUtilClasses(pfx, props[pfx]),
    )
    .filter((x) => x !== false);
}

export default getUtilClasses;
