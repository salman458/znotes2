import PropTypes from 'prop-types';

// TODO: Create general layout here,
// Add header and footer.
const App = ({ content }) => content;

App.propTypes = {
  content: PropTypes.element.isRequired,
};

export default App;
