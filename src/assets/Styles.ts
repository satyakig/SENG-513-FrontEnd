import { createMuiTheme } from '@material-ui/core';

export const PRIMARY = '#e14eca';
export const SECONDARY = '#f4f5f7';
export const DANGER = '#fd5d93';
export const WARNING = '#ff8d72';
export const INFO = '#1d8cf8';
export const SUCCESS = '#00f2c3';

export const LIGHT = '#adb5bd';
export const DARK = '#212529';
export const DEFAULT = '#344675';
export const WHITE = '#ffffff';
export const DARKER = '#000000';

export const BACKGROUND = '#1e1e2f';
export const CARD_BG = '#27293d';

export const blue = '#5e72e4';
export const indigo = '#5603ad';
export const purple = '#8965e0';
export const pink = '#f3a4b5';
export const red = '#f5365c';
export const orange = '#fb6340';
export const yellow = '#ffd600';
export const green = '#2dce89';
export const teal = '#11cdef';
export const cyan = '#2bffc6';
export const gray = '#6c757d';
export const grayDark = '#32325d';
export const light = '#ced4da';
export const lighter = '#e9ecef';

export const NAV_BAR_HEIGHT = '64px';

export const THEME = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: PRIMARY,
    },
    secondary: {
      main: SECONDARY,
    },
    error: {
      main: DANGER,
    },
    warning: {
      main: WARNING,
    },
    info: {
      main: INFO,
    },
    success: {
      main: SUCCESS,
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});
