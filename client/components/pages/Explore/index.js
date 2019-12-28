import React, {
  useState, useEffect,
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
      {boards.map(({ name, levels }) => (
        <>
          <Title variant="h3">{name}</Title>
          {levels.map(({ name: levelName, subjects }) => (
            <>
              <Title variant="h5">{levelName}</Title>
              <SubjectSlider subjects={subjects} />
            </>
          ))}
        </>
      ))}
    </PageContainer>
  );
};

export default Explore;
