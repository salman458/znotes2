import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from '/client/components/atoms';
import { Header, Footer } from '/client/components/organisms';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import './styles/root.scss';

const App = ({ content }) => (
  <MuiThemeProvider theme={theme}>
    <Header />
    <Layout>
      {content}
    </Layout>
    <Footer />
  </MuiThemeProvider>
);

App.propTypes = {
  content: PropTypes.element.isRequired,
};

export default App;
