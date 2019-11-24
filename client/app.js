import React from 'react';
import PropTypes from 'prop-types';
import Header from '/client/components/organisms/Header';

// TODO: Create general layout here,
// Add header and footer.
const App = ({ content }) => (
  <>
    <Header />
    {content}
  </>
);

App.propTypes = {
  content: PropTypes.element.isRequired,
};

export default App;
