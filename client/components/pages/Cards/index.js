import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import ReactMarkdown from 'react-markdown';
import MathJax from 'react-mathjax-preview';
import Paper from '@material-ui/core/Paper';
import { Request } from '/client/utils';
import {
  IconButton,
  FlexBox,
  Title,
  PageContainer,
  Button,
} from '/client/components/atoms';
import { Next, Prev } from '/client/components/icons';
import './styles.scss';

const Cards = ({
  subjectId,
  moduleId,
  boardSlugName,
  levelSlugName,
  subjectSlugName,
  moduleSlugName,
  chapterId,
  cardId,
}) => {
  const [currentCardId, setCurrentCardId] = useState(cardId);
  const [subject, setSubjectData] = useState({});
  const [cards, setCards] = useState([]);
  const slider = useRef(null);
  const urlParams = new URLSearchParams(window.location.search);
  const module = urlParams.get('moduleId');
  const subj = urlParams.get('subjectId');

  const setInitailSlide = (cards) => {
    console.log(slider, cardId, 'slider');

    cards.some((value, i) => {
      onNext();
      return value._id == cardId;
    });
  };
  const onPrev = () => {
    slider.current.slickPrev();
  };
  const onNext = () => {
    slider.current.slickNext();
  };

  useEffect(() => {
    const getNecessaryData = async () => {
      // const subjectData = await Request({
      //   action: 'getSubjectById',
      //   body: subjectId,
      // });
      const subjectData = await Request({
        action: 'getSubjectBySlug',
        body: subjectSlugName,
      });
      setSubjectData(subjectData);

      // const cardData = await Request({
      //   action: 'getAllCardsByModule',
      //   body: moduleId,
      // });

      const cardData = await Request({
        action: 'getAllCardsByModuleSlugName',
        body: moduleSlugName,
      });

      console.log(cardData, 'cardData');
      setCards(cardData);
      // setInitailSlide(cardData);
    };
    getNecessaryData();
  }, []);
  const editHandler = async (event) => {
    const cardId = event.target.id;
    const chapterId = await Request({
      action: 'getChapterByCard',
      body: cardId,
    });
    const url = `/explore/editor/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}?chapterId=${chapterId}&cardId=${cardId}`;
    FlowRouter.go(url);
  };

  const deleteHandler = async (event) => {
    const card = event.target.id;
    const deleteCard = await Request({
      action: 'deleteCard',
      body: card,
    });
    const chapter = await Request({
      action: 'getChapterByCard',
      body: card,
    });
    const removeRef = await Request({
      action: 'removeCardRef',
      body: {
        chapterId: chapter,
        cardId: card,
      },
    });
    window.location.reload();
  };

  console.log({
    subjectId,
    moduleId,
    boardSlugName,
    levelSlugName,
    subjectSlugName,
    moduleSlugName,
    chapterId,
    cardId,
    currentCardId,
  });
  return (
    <PageContainer className="page_cards-container">
      <Title variant="h5">
        {subject.boardName}
        {subject.levelName}
      </Title>
      <Title variant="h3">
        {subject.name}
      </Title>
      <Slider
        ref={slider}
        arrows={false}
        slidesToShow={1}
        slidesToScroll={1}
        initialSlide={2}
        beforeChange={(current, next) => {
          // console.log(current, next, cards, "beforeChange current, next");
          if (next !== -1) {
            const cardID = cards[next]._id;
            setCurrentCardId(cardID);
            const url = `/explore/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}?chapterId=${chapterId}&cardId=${cardID}`;
            FlowRouter.go(url);
          }
        }}
        // afterChange={current => {    }}
      >
        {cards.map(({ _id, content }) => (
          <div>
            <Paper key={_id} className="page_cards-paper">
              <ReactMarkdown escapeHtml={false} source={content} />
              <MathJax />
            </Paper>
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-root-98 MuiButton-containedPrimary"
              id={_id}
              onClick={editHandler}
            >
              Edit
            </button>
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-root-98 MuiButton-containedPrimary"
              id={_id}
              onClick={deleteHandler}
            >
              Delete
            </button>
          </div>
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

Cards.propTypes = {
  // subjectId: PropTypes.string.isRequired,
  // moduleId: PropTypes.string.isRequired,
};

export default Cards;
