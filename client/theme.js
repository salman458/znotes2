import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#DA1D56',
      dark: '#BF073E',
      light: '#F23A71',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#26B3E8',
      dark: '#0D9ACF',
      light: '#40CDFF',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#4F4F4F',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
    background: {
      paper: '#051017',
      default: '#051017',
    },
  },
  typography: {
    fontFamily: '\'Open Sans\', sans-serif',
    h1: {
      fontFamily: '\'Raleway\', sans-serif',
      fontWeight: 700,
      fontSize: '3.5rem',
    },
    h2: {
      fontFamily: '\'Raleway\', sans-serif',
    },
    h3: {
      fontFamily: '\'Raleway\', sans-serif',
    },
    h4: {
      fontFamily: '\'Raleway\', sans-serif',
    },
  },
});
