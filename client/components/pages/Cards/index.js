import React, {
  useState, useEffect, useRef,
} from 'react';
import Slider from 'react-slick';
import ReactMarkdown from 'react-markdown';
import Paper from '@material-ui/core/Paper';
import { Request } from '/client/utils';
import {
  IconButton,
  FlexBox,
  Title,
  PageContainer,
} from '/client/components/atoms';
import {
  Next,
  Prev,
} from '/client/components/icons';
import './styles.scss';

const Cards = ({ subjectId }) => {
  const [subject, setSubjectData] = useState({});
  const [cards, setCards] = useState([]);
  const slider = useRef(null);

  const onPrev = () => slider.current.slickPrev();
  const onNext = () => slider.current.slickNext();

  console.log('HERE');

  useEffect(() => {
    const getNecessaryData = async () => {
      const subjectData = await Request({
        action: 'getSubjectById',
        body: subjectId,
      });
      setSubjectData(subjectData);

      const cardData = await Request({
        action: 'getAllCards',
      });
      setCards(cardData);
    };
    getNecessaryData();
  }, []);

  return (
    <PageContainer
      className="page_cards-container"
    >
      <Title variant="h5">
        {subject.boardName}
        {' '}
        {subject.levelName}
      </Title>
      <Title variant="h3">{subject.name}</Title>
      <Slider
        ref={slider}
        arrows={false}
        slidesToShow={1}
        slidesToScroll={1}
      >
        {cards.map(({ content }) => (
          <Paper className="page_cards-paper">
            <ReactMarkdown source={content} />
          </Paper>
        ))}
      </Slider>
      <FlexBox align justify>
        <IconButton className="page_cards-arrows" onClick={onPrev}>
          <Prev />
        </IconButton>
        <IconButton className="page_cards-arrows" onClick={onNext}>
          <Next />
        </IconButton>
      </FlexBox>
    </PageContainer>
  );
};

export default Cards;
