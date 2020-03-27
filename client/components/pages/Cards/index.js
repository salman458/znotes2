import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import ReactMarkdown from "react-markdown";
import MathJax from "react-mathjax-preview";
import Paper from "@material-ui/core/Paper";
import { Request } from "/client/utils";
import {
  IconButton,
  FlexBox,
  Title,
  PageContainer,
  Button,
  ErrorBoundary
} from "/client/components/atoms";
import { Next, Prev } from "/client/components/icons";
import "./styles.scss";

const Cards = ({
  subjectId,
  moduleId,
  boardSlugName,
  levelSlugName,
  subjectSlugName,
  moduleSlugName,
  chapterId,
  cardId
}) => {
  const [currentCardId, setCurrentCardId] = useState(cardId);
  const [subject, setSubjectData] = useState({});
  const [cards, setCards] = useState([]);
  const slider = useRef(null);
  const urlParams = new URLSearchParams(window.location.search);
  const module = urlParams.get("moduleId");
  const subj = urlParams.get("subjectId");

  const setInitailSlide = cards => {
    setTimeout(() => {
      let slideIndex = cards.findIndex(val => val._id == cardId);
      if (slideIndex == -1) {
        slideIndex = 0;
      }
      slider.current.slickGoTo(slideIndex, true);
    }, 150);
  };
  const onPrev = () => {
    slider.current.slickPrev();
  };
  const onNext = () => {
    slider.current.slickNext();
  };
  const adIterator = 10;
  useEffect(
    () => {
      const getNecessaryData = async () => {
        // const subjectData = await Request({
        //   action: 'getSubjectById',
        //   body: subjectId,
        // });
        const subjectData = await Request({
          action: "getSubjectBySlug",
          body: subjectSlugName
        });
        setSubjectData(subjectData);

        // const cardData = await Request({
        //   action: 'getAllCardsByModule',
        //   body: moduleId,
        // });

        const cardData = await Request({
          action: "getAllCardsByModuleSlugName",
          body: moduleSlugName
        });
        let counter = 0;
        let cardsResult = [];
        if (cardData && cardData.length > adIterator) {
          for (const item of cardData) {
            cardsResult.push(item);
            counter++;
            if (counter == adIterator) {
              cardsResult.push({
                ...item,
                isAd: true
              });
              counter = 0;
            }
          }
        } else cardsResult = cardData;

        setCards(cardsResult);
        setInitailSlide(cardsResult);
      };
      getNecessaryData();
    },
    [cardId]
  );
  const editHandler = async event => {
    const cardId = event.target.id;
    const chapterId = await Request({
      action: "getChapterByCard",
      body: cardId
    });
    const url = `/editor/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}?chapterId=${chapterId}&cardId=${cardId}`;
    FlowRouter.go(url);
  };

  const deleteHandler = async event => {
    const card = event.target.id;
    const deleteCard = await Request({
      action: "deleteCard",
      body: card
    });
    const chapter = await Request({
      action: "getChapterByCard",
      body: card
    });
    const removeRef = await Request({
      action: "removeCardRef",
      body: {
        chapterId: chapter,
        cardId: card
      }
    });

    const cardData = await Request({
      action: "getAllCardsByModuleSlugName",
      body: moduleSlugName
    });

    window.location.reload();
  };
  // console.log(
  //   {
  //     cards,
  //     subjectId,
  //     moduleId,
  //     boardSlugName,
  //     levelSlugName,
  //     subjectSlugName,
  //     moduleSlugName,
  //     chapterId,
  //     cardId,
  //   },
  //   'Cards screens',
  // );

  renderAd = () => {
    return (
      <ErrorBoundary>
        <div id="ezoic-pub-ad-placeholder-101">
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />

          <ins
            class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-6119346428517801"
            data-ad-slot="6150940530"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />

          <ins
            class="adsbygoogle"
            style="display:block"
            data-ad-client="ca-pub-6119346428517801"
            data-ad-slot="6150940530"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </div>
      </ErrorBoundary>
    );
  };

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
        beforeChange={async (current, next) => {
          if (cards && cards.length && next !== -1) {
            const cardID = cards[next]._id;
            setCurrentCardId(cardID);
            const chapterId = await Request({
              action: "getChapterByCard",
              body: cardID
            });
            const url = `/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}?chapterId=${chapterId}&cardId=${cardID}`;
            FlowRouter.go(url);
          }
        }}
        // afterChange={current => {    }}
      >
        {cards.map(({ _id, content, isAd }, i) => {
          if (isAd) {
            return renderAd()
          } else {
            return (
              <div key={i}>
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
            );
          }
        })}
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
