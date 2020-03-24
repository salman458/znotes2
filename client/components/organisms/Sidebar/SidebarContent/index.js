import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { lighten } from '@material-ui/core/styles';
import {
  Text,
  Title,
  Image,
  FlexBox,
  IconButton,
  ProgressBar,
  Button,
  TextField
} from '/client/components/atoms';
import { Request } from '/client/utils';
import { ChevronLeft, Chapters } from '/client/components/icons';
import Subjects from '/client/components/molecules/SubjectCard/subjectData';
import ListItem from '../ListItem';
import ClosePopup from '/client/components/molecules/ClosePopup';
const SidebarContent = ({
  subject,
  chapters,
  withIcon,
  handleDrawerClose,
  boardSlugName,
  levelSlugName,
  subjectSlugName,
  moduleSlugName,
  chapterId,
  cardId
}) => {
  const { color } = Subjects[subject] || {};
  const primaryColor = color || '#D82057';
  const secondaryColor = lighten(primaryColor, 0.5);
  const [open, setOpen] = useState(false);
  const [chapter, setChapters] = useState([]);
  const [name, setName] = useState('');
  const urlParams = new URLSearchParams(window.location.search);
  const module = urlParams.get("moduleId");
  const subj = urlParams.get("subjectId");
  const addCard = async (chapId) => {

    const url = `/editor/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}?chapterId=${chapId}&cardId=${1}`


    FlowRouter.go(url);
  };
  const openPopup = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setName(e.target.value);
  };
  const onSubmit = async () => {
    let chapter = {
      name,
      created: new Date(),
      cards: []
    };
    const itemId = await Request({
      action: 'addChapter',
      body: chapter,
    });
    let chapterMod = {
      name: chapter.name,
      created: chapter.created,
      cards: chapter.cards,
      _id: itemId
    };

    const update = await Request({
      action: 'updateChapter',
      body: { slug: moduleSlugName, chapter: chapterMod },
    });
    setChapters([
      {
        _id: itemId,
        name,
        created: new Date(),
        cards: []
      },
      ...chapters,
    ]);
    onClose();
    
    const url = `/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}?chapterId=${itemId}&cardId=${1}`;
    FlowRouter.go(url);
    window.location.reload();
  };

  const onCardClick = (cardData,chapter)=>{
    console.log(cardData._id, chapter._id,"------")
    const url = `/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}?chapterId=${chapter._id}&cardId=${cardData._id}`;
    FlowRouter.go(url);
  }
console.log({
  subject,
  chapters,
  withIcon,
  handleDrawerClose,
  boardSlugName,
  levelSlugName,
  subjectSlugName,
  moduleSlugName,
  chapterId,
  cardId
}, "SidebarContent")
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
          <div>
            <ListItem key={chapter._id} {...chapter} onCardClick={(cardData)=>onCardClick(cardData,chapter)} />
            <button className="MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-root-98 MuiButton-containedPrimary" id={chapter._id} onClick={()=>{addCard(chapter._id)}}
            >Add
              Card
           </button>
          </div>
        ))}
        <Button className="Ch-btns" onClick={openPopup}>Add Chapter</Button>
        <ClosePopup
          open={open}
          onClose={onClose}
          title="Add a new chapter"
        >
          <TextField
            style={{ marginBottom: 20 }} 
            onChange={onChange}
            label="Name"
          />
          <Button onClick={onSubmit}>Add</Button>
        </ClosePopup>
      </div>
    </>
  );
};

SidebarContent.defaultProps = {
  withIcon: false,
  handleDrawerClose: () => { },
};

SidebarContent.propTypes = {
  withIcon: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
  subject: PropTypes.string.isRequired,
  chapters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SidebarContent;
