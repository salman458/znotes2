import React, {
  useState,
  useEffect,
  Fragment,
} from 'react';
import {
  Request,
  USER_PERMISSIONS,
} from '/client/utils';
import { usePermission } from '/client/contexts/permission';
import {
  Title,
  Button,
  FlexBox,
  PageContainer,
} from '/client/components/atoms';
import { SubjectSlider, AddPopup } from '/client/components/organisms';
import { makeStyles } from '@material-ui/core/styles';
import './styles.scss';

const useStyles = makeStyles(() => ({
  title: {
    fontSize: '3.5rem',
    textAlign: 'center',
  },
}));

const Explore = ({boardId,...rest}) => {
  const classes = useStyles();
  const [boards, setBoards] = useState([]);
  const role = usePermission();

  useEffect(() => {
    let allBoards;
    const getNecessaryData = async () => {
      if(boardId){
         allBoards = await Request({
          action: 'loadAllData',
          body: boardId,
        });
      }else {
         allBoards = await Request({
          action: 'loadAllData',
          body: {},
        });
      }

      console.log(allBoards,"all Boards")
      setBoards(allBoards);
    };
    getNecessaryData();
  }, []);

  const addBoard = ({ itemId, name }) => {
    setBoards([
      {
        name,
        boardId: itemId,
        levels: [],
      },
      ...boards,
    ]);
  };

  const addLevel = (boardId) => ({ itemId, name,slug }) => {
    const newLevel = {
      board: boardId, levelId: itemId, name, subjects: [],slug
    };
    const newBoards = boards.map((board) => (board.boardId === boardId
      ? {
        ...board,
        levels: [
          newLevel,
          ...board.levels,
        ],
      }
      : board));
    setBoards(newBoards);
  };

  const addSubject =  ({ boardId, levelId}) => async ({ itemId, name }) => {

    const subjectSlugName = await Request({
      action: "getSubjectSlugName",
      body: itemId ,
    });

    const newSubject = {
      _id: itemId,
      board: boardId,
      level: levelId,
      name,
      slug :subjectSlugName
      // slug:name.split(" ").join('-')
    };
    const newBoards = boards.map((board) => {
      if (board.boardId === boardId) {
        const newLevels = board.levels.map((level) => (level.levelId === levelId
          ? {
            ...level,
            subjects: [
              {
                ...newSubject,
                boardName: board.name,
                levelName: level.name,
              },
              ...level.subjects,
            ],
          }
          : level));
        return {
          ...board,
          levels: newLevels,
        };
      }
      return board;
    });
    setBoards(newBoards);
  };

  console.log({boards})

  return (
    <PageContainer
      className="page_explore-container"
    >
      <Title
        variant="h1"
        gutterBottom
        className={classes.title}
      >
        Explore the Subjects
      </Title>
      {role > USER_PERMISSIONS.logged && (
      <AddPopup
        action="addBoard"
        onAdd={addBoard}
        title="Add a new board"
      >
        {(openPopup) => (
          <FlexBox column align>
            <Title variant="h3" gutterBottom>Need to add a new board?</Title>
            <Button onClick={openPopup}>Add Board</Button>
          </FlexBox>
        )}
      </AddPopup>
      )}
      {boards.map(({ boardId, name, levels }) => (
        <Fragment key={boardId}>
          <AddPopup
            addData={{ board: boardId }}
            action="addLevel"
            onAdd={addLevel(boardId)}
            title="Add a new level"
          >
            {(openPopup) => (
              <FlexBox justifyBetween align>
                <Title variant="h3">{name}</Title>
                {role > USER_PERMISSIONS.logged && (
                  <Button variant="text" onClick={openPopup}>Add Level</Button>
                )}
              </FlexBox>
            )}
          </AddPopup>

          {levels.map(({ levelId, name: levelName, subjects }) => (
            <Fragment key={levelId}>
              <AddPopup
                addData={{ board: boardId, level: levelId }}
                action="addSubject"
                onAdd={addSubject({ boardId, levelId })}
                title="Add a new subject"
              
              >
                {(openPopup) => (
                  <FlexBox justifyBetween align>
                    <Title variant="h4">{levelName}</Title>
                    {role > USER_PERMISSIONS.logged && (
                      <Button variant="text" onClick={openPopup}>Add Subject</Button>
                    )}
                  </FlexBox>
                )}
              </AddPopup>
              <SubjectSlider subjects={subjects} />
            </Fragment>
          ))}
        </Fragment>
      ))}
    </PageContainer>
  );
};

export default Explore;
