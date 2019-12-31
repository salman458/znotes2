import React from 'react';
import PropTypes from 'prop-types';
import { lighten } from '@material-ui/core/styles';
import {
  Text,
  Title,
  Image,
  FlexBox,
  IconButton,
  ProgressBar,
} from '/client/components/atoms';
import { ChevronLeft, Chapters } from '/client/components/icons';
import Subjects from '/client/components/molecules/SubjectCard/subjectData';
import ListItem from '../ListItem';

const SidebarContent = ({
  subject,
  chapters,
  withIcon,
  handleDrawerClose,
}) => {
  const { color } = Subjects[subject] || {};
  const primaryColor = color || '#D82057';
  const secondaryColor = lighten(primaryColor, 0.5);
  return (
    <>
      <FlexBox
        align
        justify
        column
        className="organism_sidebar-top"
      >
        <Image
          className="organism_sidebar-logo"
          src="/img/logo.png"
        />
        <FlexBox
          align
          fullWidth
          className="organism_sidebar-progress-container"
        >
          <div className="organism_sidebar-progress">
            <ProgressBar
              secondaryColor={secondaryColor}
              primaryColor={primaryColor}
              variant="determinate"
              value={50}
              thin
            />
          </div>
          <Text className="organism_sidebar-text">50%</Text>
        </FlexBox>
        {withIcon && (
        <IconButton
          className="organism_sidebar-back-button"
          onClick={handleDrawerClose}
        >
          <ChevronLeft />
        </IconButton>
        )}
      </FlexBox>
      <div className="organism_sidebar-bottom">
        <Title variant="h5" className="organism_sidebar-chapters">
          <Chapters className="organism_sidebar-chapter-icon" />
          Chapters
        </Title>
        {chapters.map((chapter) => (
          <ListItem key={chapter._id} {...chapter} />
        ))}
      </div>
    </>
  );
};

SidebarContent.defaultProps = {
  withIcon: false,
  handleDrawerClose: () => {},
};

SidebarContent.propTypes = {
  withIcon: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
  subject: PropTypes.string.isRequired,
  chapters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SidebarContent;
