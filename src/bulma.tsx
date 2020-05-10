import 'bulma/css/bulma.css';

export enum Breakpoint {
  desktop = 'desktop',
  tablet = 'tablet',
  mobile = 'mobile',
  widescreen = 'widescreen',
  fullhd = 'fullhd',
  touch = 'touch',
}

export enum Color {
  PRIMARY = 'primary',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
  LIGHT = 'light',
  DARK = 'dark',
  WHITE = 'white',
  BLACK = 'black',
  LINK = 'link',
}

export enum ColorVariant {
  light = 'light',
  dark = 'dark'
}

interface ContainerProps {
  children: any;
  fluid: boolean;
  breakpoint: Breakpoint;
  className: string;
}
export const Container = (props: Partial<ContainerProps>) => {};
