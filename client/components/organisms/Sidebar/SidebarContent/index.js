import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Title,
  Image,
  FlexBox,
  IconButton,
  ProgressBar,
} from '/client/components/atoms';
import { ChevronLeft, Chapters } from '/client/components/icons';
import ListItem from '../ListItem';

const SidebarContent = ({
  chapters,
  withIcon,
  handleDrawerClose,
}) => (
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
      <Title variant="h5">
        <Chapters className="organism_sidebar-chapter-icon" />
          Chapters
      </Title>
      {chapters.map((chapter) => (
        <ListItem items={[{}, {}, {}]} />
      ))}
    </div>
  </>
);

SidebarContent.defaultProps = {
  withIcon: false,
  handleDrawerClose: () => {},
};

SidebarContent.propTypes = {
  withIcon: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
  chapters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SidebarContent;
