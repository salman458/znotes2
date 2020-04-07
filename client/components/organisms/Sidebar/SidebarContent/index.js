import React, { useState, useEffect } from 'react';
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
  TextField,
} from '/client/components/atoms';
import { Request, USER_PERMISSIONS } from '/client/utils';
import { ChevronLeft, Chapters } from '/client/components/icons';
import Subjects from '/client/components/molecules/SubjectCard/subjectData';
import ListItem from '../ListItem';
import ClosePopup from '/client/components/molecules/ClosePopup';
import  ConfirmationDialog from "/client/components/molecules/ConfirmationDialog";


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
  cardId,
  role,
}) => {
  const isTeamRole = role === USER_PERMISSIONS.editor;
  const { color } = Subjects[subject.toLowerCase()] || {};
  const primaryColor = color || '#D82057';
  const secondaryColor = lighten(primaryColor, 0.5);
  const [open, setOpen] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [allChapters, setChapters] = useState(chapters);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [name, setName] = useState('');
  const [cards, setCards] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const module = urlParams.get('moduleId');
  const subj = urlParams.get('subjectId');

const getAllCardsByModuleSlugName=async()=>{
  const cardData = await Request({
    action: 'getAllCardsByModuleSlugName',
    body: moduleSlugName,
  });
  setCards(cardData);
}

  useEffect(() => {
    getAllCardsByModuleSlugName();

    setChapters(chapters);
  }, [chapters]);

  const addCard = async (chapId) => {
    const url = `/editor/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}?chapterId=${chapId}&cardId=${1}`;
    FlowRouter.go(url);
  };

  const getProgressValue = () => {
    const totalCards = cards.length;
    if (totalCards) {
      let cardIndex = cards.findIndex((item) => item._id == cardId);
      if (cardIndex == -1) {
        cardIndex = 0;
      }
      const value = ((cardIndex + 1) / totalCards) * 100;
      return value.toFixed(0);
    } return 0;
  };
  
  const openPopup = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const openEditPopup =(selectedChapter)=>{
    setEditPopupOpen(true);
    setSelectedChapter(selectedChapter);
  }
  const onCloseEditPopup = () => {
    setEditPopupOpen(false);
  };
  const onChange = (e) => {
    setName(e.target.value);
  };
  const onChapterChange = (e) => {
    setSelectedChapter({
      ...selectedChapter,
      name:e.target.value
    });
  };
  const onSubmit = async () => {
    const chapter = {
      name,
      created: new Date(),
      cards: [],
    };
    const itemId = await Request({
      action: 'addChapter',
      body: chapter,
    });
    const chapterMod = {
      name: chapter.name,
      created: chapter.created,
      cards: chapter.cards,
      _id: itemId,
    };

    const update = await Request({
      action: 'updateChapterInModules',
      body: { slug: moduleSlugName, chapter: chapterMod },
    });
    setChapters([
      {
        _id: itemId,
        name,
        created: new Date(),
        cards: [],
      },
      ...allChapters,
    ]);
    onClose();

    // const url = `/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}?chapterId=${itemId}&cardId=${cardId ?cardId: 1}`;
    // FlowRouter.go(url);
    window.location.reload();
  };

  const onCardClick = (cardData, chapter) => {
    const url = `/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}?chapterId=${chapter._id}&cardId=${cardData._id}`;
    FlowRouter.go(url);
  };
 
  const deleteChapter = async(chapter)=>{
    
    const deleteChapter =  await Request({
      action: 'deleteChapter',
      body: chapter._id ,
    });
    const removeChapterRef =  await Request({
      action: 'removeChapterRef',
      body: chapter ,
    });
    const newState = allChapters.filter((item)=>item._id !==chapter._id)
    setChapters(newState);
  }
  const onUpdateChapter = async()=>{

  const updatechapterName =  await Request({
    action: 'updateChapter',
    body: selectedChapter ,
  });
  const update = await Request({
    action: 'updateChapterInModules',
    body: { slug: moduleSlugName, chapter: selectedChapter },
  });
  const newState = allChapters.map(obj =>
    obj._id === selectedChapter._id ?selectedChapter : obj
);
    setChapters(newState);
    onCloseEditPopup()
  }


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
              value={getProgressValue()}
              thin
            />
          </div>
          <Text className="organism_sidebar-text">
            {getProgressValue()}
            %
          </Text>
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
        {allChapters.map((chapter, i) => (
          <div key={i}>
            <ListItem key={chapter._id} {...chapter} onCardClick={(cardData) => onCardClick(cardData, chapter)} />
            {isTeamRole && (

              <div>
<button
              className="Sbar-config MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-root-98 MuiButton-containedPrimary"
              id={chapter._id}
              onClick={() => { openEditPopup(chapter); }}
            >
              Edit
            </button>
            <button
              className="Sbar-config MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-root-98 MuiButton-containedPrimary"
              id={chapter._id}
              onClick={() => { 
                setShowConfirmDialog(true)
                setSelectedChapter({...chapter })
                }}
            >
              Delete
            </button>
</div>
            )}

            {isTeamRole && (
            <button
              className="Ch-btns MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-root-98 MuiButton-containedPrimary"
              id={chapter._id}
              onClick={() => { addCard(chapter._id); }}
            >
              Add
              Card
            </button>
            )}

          </div>
        ))}

        {isTeamRole && (<Button className="Ch-btns" onClick={openPopup}>Add Chapter</Button>)}
        
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

        {/* chapter updated popup */}

        <ClosePopup
          open={editPopupOpen}
          onClose={onCloseEditPopup}
          title="Update chapter"
        >
          <TextField
            style={{ marginBottom: 20 }}
            onChange={onChapterChange}
            label="Name"
            value={selectedChapter.name}
          />
          <Button onClick={onUpdateChapter}>Update</Button>
        </ClosePopup>
        <ConfirmationDialog
        onClose={() => setShowConfirmDialog(false)}
        isShow={showConfirmDialog}
        onSubmit={()=>{deleteChapter(selectedChapter)}}
      />


      </div>

    </>
  );
};

SidebarContent.defaultProps = {
  withIcon: false,
  handleDrawerClose: () => { },
  chapters: [],
};

SidebarContent.propTypes = {
  withIcon: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
  subject: PropTypes.string.isRequired,
  chapters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SidebarContent;
