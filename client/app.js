import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import { Layout } from '/client/components/atoms';
import { Header, Footer } from '/client/components/organisms';
import { UserProvider } from '/client/contexts/user';
import theme from './theme';

import './styles/root.scss';

const App = ({ content }) => (
  <ThemeProvider theme={theme}>
    <UserProvider>
      <Header />
      <Layout>
        {content}
      </Layout>
      <Footer />
    </UserProvider>
  </ThemeProvider>
);

App.propTypes = {
  content: PropTypes.element.isRequired,
};

export default App;
