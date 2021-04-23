import { ComponentWithChildren } from '../../../types/ComponentWithChildren';
import { ComponentWithClassNames } from '../../../types/ComponentWithClassNames';

export interface ButtonProps extends ComponentWithChildren, ComponentWithClassNames {
  icon?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  tertiary?: boolean;
  outline?: boolean;
  small?: boolean;
  large?: boolean;
  disabled?: boolean;
  loading?: boolean;
  'full-width'?: boolean;
  'full-width-mobile'?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}
