import React, {
  useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Request } from '/client/utils';
import {
  Title,
  FlexBox,
  PageContainer,
} from '/client/components/atoms';
import { ModuleCard } from '/client/components/molecules';

const Modules = ({ subjectName, subjectId }) => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const getNecessaryData = async () => {
      const allModules = await Request({
        action: 'getModulesBySubject',
        body: subjectId,
      });
      setModules(allModules);
    };
    getNecessaryData();
  }, []);

  return (
    <PageContainer
      className="page_modules-container"
    >
      <Title
        className="page_modules-title"
        variant="h2"
      >
        Select The Module
      </Title>
      <FlexBox
        align
        className="page_modules-main"
      >
        <Grid container spacing={3}>
          {modules.map(({ _id, name }) => (
            <Grid item sm={12} md={6} lg={3}>
              <ModuleCard
                id={_id}
                subjectName={subjectName}
                moduleName={name}
                subjectId={subjectId}
              />
            </Grid>
          ))}
        </Grid>
      </FlexBox>
    </PageContainer>
  );
};

Modules.propTypes = {
  subjectName: PropTypes.string.isRequired,
  subjectId: PropTypes.string.isRequired,
};

export default Modules;
