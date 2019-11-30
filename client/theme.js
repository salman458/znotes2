import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#D82057',
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
  },
  background: {
    paper: '#121212',
    default: '#121212',
  },
  typography: {
    fontFamily: '\'Open Sans\', sans-serif',
  },
});
