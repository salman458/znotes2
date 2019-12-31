import React, {
  useState,
  useEffect,
  Fragment,
} from 'react';
import { Request } from '/client/utils';
import {
  Title,
  PageContainer,
} from '/client/components/atoms';
import { SubjectSlider } from '/client/components/organisms';
import './styles.scss';

const Explore = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const getNecessaryData = async () => {
      const allBoards = await Request({
        action: 'loadAllData',
        body: {},
      });
      setBoards(allBoards);
    };
    getNecessaryData();
  }, []);

  return (
    <PageContainer
      className="page_explore-container"
    >
      {boards.map(({ boardId, name, levels }) => (
        <Fragment key={boardId}>
          <Title variant="h3">{name}</Title>
          {levels.map(({ levelId, name: levelName, subjects }) => (
            <Fragment key={levelId}>
              <Title variant="h5">{levelName}</Title>
              <SubjectSlider subjects={subjects} />
            </Fragment>
          ))}
        </Fragment>
      ))}
    </PageContainer>
  );
};

export default Explore;
