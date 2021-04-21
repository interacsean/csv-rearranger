import { ComponentWithChildren } from '../../types/ComponentWithChildren';

export interface CardPublicProps extends ComponentWithChildren {
  className?: string | (string | undefined | false)[];
  'no-pad'?: boolean;
  'no-radius'?: boolean;
  'no-background'?: boolean;
  'high-contrast'?: boolean;
}

export interface CardProps extends CardPublicProps {}
