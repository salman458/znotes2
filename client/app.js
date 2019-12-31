import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import { Layout } from '/client/components/atoms';
import { Header, Sidebar, Footer } from '/client/components/organisms';
import { UserProvider } from '/client/contexts/user';
import theme from './theme';

import './styles/root.scss';

const sidebarWidth = 325;

const App = ({
  content,
  subject,
  moduleId,
  withSidebar,
  opaqueHeader,
}) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Header
          open={open}
          withSidebar={withSidebar}
          sidebarWidth={sidebarWidth}
          opaqueHeader={opaqueHeader}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
        <Layout
          open={open}
          withSidebar={withSidebar}
          sidebarWidth={sidebarWidth}
        >
          {content}
        </Layout>
        {withSidebar && (
          <Sidebar
            open={open}
            subject={subject}
            moduleId={moduleId}
            sidebarWidth={sidebarWidth}
            handleDrawerClose={handleDrawerClose}
          />
        )}
        <Footer
          open={open}
          withSidebar={withSidebar}
          sidebarWidth={sidebarWidth}
        />
      </UserProvider>
    </ThemeProvider>
  );
};

App.defaultProps = {
  withSidebar: false,
  opaqueHeader: false,
};

App.propTypes = {
  withSidebar: PropTypes.bool,
  opaqueHeader: PropTypes.bool,
  content: PropTypes.element.isRequired,
};

export default App;
