import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import { Layout } from '/client/components/atoms';
import { Header, Sidebar, Footer } from '/client/components/organisms';
import { UserProvider } from '/client/contexts/user';
import { PermissionProvider } from '/client/contexts/permission';
import theme from './theme';

import './styles/root.scss';

const sidebarWidth = 325;

const App = ({
  content,
  subject,
  moduleId,
  withSidebar,
  opaqueHeader,
  boardSlugName,
  levelSlugName,
  subjectSlugName,
  moduleSlugName,
}) => {
  const [open, setOpen] = useState(false);
  const [isOpaque, setOpaque] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <PermissionProvider>
          <Header
            open={open}
            withSidebar={withSidebar}
            sidebarWidth={sidebarWidth}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            opaqueHeader={opaqueHeader && isOpaque}
          />
        </PermissionProvider>
        <Layout
          open={open}
          withSidebar={withSidebar}
          sidebarWidth={sidebarWidth}
        >
          {content({ setOpaque })}
        </Layout>
        {withSidebar && (
          <Sidebar
            open={open}
            subject={subject}
            moduleId={moduleId}
            sidebarWidth={sidebarWidth}
            handleDrawerClose={handleDrawerClose}
            boardSlugName={boardSlugName}
            levelSlugName={levelSlugName}
            subjectSlugName={subjectSlugName}
            moduleSlugName={moduleSlugName}
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
  subject: '',
  moduleId: '',
  withSidebar: false,
  opaqueHeader: false,
};

App.propTypes = {
  subject: PropTypes.string,
  moduleId: PropTypes.string,
  withSidebar: PropTypes.bool,
  opaqueHeader: PropTypes.bool,
  content: PropTypes.func.isRequired,
};

export default App;
