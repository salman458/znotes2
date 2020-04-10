import React, { useState, useEffect, Fragment } from "react";
import { Request, USER_PERMISSIONS } from "/client/utils";
import { usePermission } from "/client/contexts/permission";
import {
  Title,
  Button,
  FlexBox,
  PageContainer
} from "/client/components/atoms";
import { SubjectSlider, AddPopup } from "/client/components/organisms";
import { makeStyles } from "@material-ui/core/styles";
import "./styles.scss";
import { Loading } from "/client/components/molecules";
import { useUserData } from "/client/contexts/user";

const useStyles = makeStyles(() => ({
  title: {
    fontSize: "3.5rem",
    textAlign: "center"
  }
}));

const Explore = props => {
  console.log(props);
  const { boardId, board, level, subject, module, ...rest } = props;
  const classes = useStyles();
  const [boards, setBoards] = useState([]);
  const role = usePermission();
  const [isLoading, setLoading] = useState(false);
  const user = useUserData();

  useEffect(() => {
    let allBoards;
    const getNecessaryData = async () => {
      setLoading(true);
      if (board) {
        const boardId = await Request({
          action: "getBoardIdBySlugName",
          body: board
        });
        if (boardId) {
          allBoards = await Request({
            action: "loadAllData",
            body: boardId
          });
        }
      } else {
        allBoards = await Request({
          action: "loadAllData",
          body: {}
        });
      }
      setLoading(false);
      setBoards(allBoards);
    };
    getNecessaryData();
  }, []);

  const addBoard = async ({ itemId, name }) => {
    const boardSlugName = await Request({
      action: "getBoardSlugName",
      body: itemId
    });

    setBoards([
      {
        name,
        boardId: itemId,
        levels: [],
        slug: boardSlugName
      },
      ...boards
    ]);
  };

  const addLevel = boardId => async ({ itemId, name }) => {
    const levelSlugName = await Request({
      action: "getLevelSlugName",
      body: itemId
    });

    const newLevel = {
      board: boardId,
      levelId: itemId,
      name,
      subjects: [],
      slug: levelSlugName
    };
    const newBoards = boards.map(
      board =>
        board.boardId === boardId
          ? {
              ...board,
              levels: [newLevel, ...board.levels]
            }
          : board
    );
    setBoards(newBoards);
  };

  const addSubject = ({ boardId, levelId }) => async ({ itemId, name }) => {
    const subjectSlugName = await Request({
      action: "getSubjectSlugName",
      body: itemId
    });

    const newSubject = {
      _id: itemId,
      board: boardId,
      level: levelId,
      name,
      slug: subjectSlugName
      // slug:name.split(" ").join('-')
    };
    const newBoards = boards.map(board => {
      if (board.boardId === boardId) {
        const newLevels = board.levels.map(
          level =>
            level.levelId === levelId
              ? {
                  ...level,
                  subjects: [
                    {
                      ...newSubject,
                      boardName: board.name,
                      levelName: level.name
                    },
                    ...level.subjects
                  ]
                }
              : level
        );
        return {
          ...board,
          levels: newLevels
        };
      }
      return board;
    });
    setBoards(newBoards);
  };

  return (
    <PageContainer className="page_explore-container">
      <Loading isLoading={isLoading} />
      <Title variant="h1" gutterBottom className={classes.title}>
        Explore the Subjects
      </Title>
      {role > USER_PERMISSIONS.logged &&
        <AddPopup action="addBoard" onAdd={addBoard} title="Add a new board">
          {openPopup =>
            <FlexBox column align>
              <Title variant="h3" gutterBottom>
                Need to add a new board?
              </Title>
              <Button onClick={openPopup}>Add Board</Button>
            </FlexBox>}
        </AddPopup>}
      {boards.map(({ boardId, name, levels, slug: boardSlugName }) =>
        <Fragment key={boardId}>
          <AddPopup
            addData={{ board: boardId }}
            action="addLevel"
            onAdd={addLevel(boardId)}
            title="Add a new level"
          >
            {openPopup =>
              <FlexBox justifyBetween align>
                <Title variant="h3">
                  {name}
                </Title>
                {role > USER_PERMISSIONS.logged &&
                  <Button variant="text" onClick={openPopup}>
                    Add Level
                  </Button>}
              </FlexBox>}
          </AddPopup>

          {levels.map(
            ({ levelId, name: levelName, subjects, slug: levelSlugName }) =>
              <Fragment key={levelId}>
                <AddPopup
                  addData={{ board: boardId, level: levelId }}
                  action="addSubject"
                  onAdd={addSubject({ boardId, levelId })}
                  title="Add a new subject"
                >
                  {openPopup =>
                    <FlexBox justifyBetween align>
                      <Title variant="h4">
                        {levelName}
                      </Title>
                      {role > USER_PERMISSIONS.logged &&
                        <Button variant="text" onClick={openPopup}>
                          Add Subject
                        </Button>}
                    </FlexBox>}
                </AddPopup>
                <SubjectSlider
                  subjects={subjects}
                  boardName={name}
                  levelName={levelName}
                  boardSlugName={boardSlugName}
                  levelSlugName={levelSlugName}
                  boardId={boardId}
                  levelId={levelId}
                  user={user}
                />
              </Fragment>
          )}
        </Fragment>
      )}
    </PageContainer>
  );
};

export default Explore;
