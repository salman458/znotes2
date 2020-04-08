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
import AdSense from "react-adsense";
import { usePermission } from "/client/contexts/permission";
import { USER_PERMISSIONS } from "/client/utils";
import { Loading, ConfirmationDialog } from "/client/components/molecules";
import Subjects from "/client/components/molecules/SubjectCard/subjectData";
import _ from "lodash";
import { SanitizeName } from "/client/utils";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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
  const [isLoading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const module = urlParams.get("moduleId");
  const subj = urlParams.get("subjectId");
  const [slideIndex, setSlideIndex] = useState(-1);

  const { color } =
    Subjects[!_.isEmpty(subject) ? SanitizeName(subject.name) : ""] || {};
  const primaryColor = color || "#D82057";
  const isTeamRole = usePermission() === USER_PERMISSIONS.editor;

  const setInitailSlide = cards => {
    setTimeout(() => {
      let slideIndex = cards.findIndex(val => val._id == currentCardId);
      if (slideIndex == -1) {
        slideIndex = 0;
      }
      setSlideIndex(slideIndex);
      slider.current.slickGoTo(slideIndex, true);
    }, 150);
  };
  const onPrev = () => {
    slider.current.slickPrev();
  };
  const onNext = () => {
    slider.current.slickNext();
  };
  const adIterator = 5;

  const getSubjectBySlug = async () => {
    const subjectData = await Request({
      action: "getSubjectBySlug",
      body: subjectSlugName
    });

    setSubjectData(subjectData);
  };

  const getAllCardsByModuleSlugName = async () => {
    if (slideIndex == -1) {
      setShowLoading(true);
    }
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
    setShowLoading(false);
  };

  useEffect(
    () => {
      getSubjectBySlug();
    },
    [currentCardId]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyPressed);
    return () => {
      {
        document.removeEventListener("keydown", onKeyPressed);
      }
    };
  }, []);

  const onKeyPressed = event => {
    const { key } = event;
    if (key == " " || key == "ArrowUp") {
      onNext();
    }
    if (key == "ArrowDown") {
      onPrev();
    }
  };

  useEffect(
    () => {
      getAllCardsByModuleSlugName();
    },
    [currentCardId]
  );

  useEffect(
    () => {
      if (cardId) {
        setCurrentCardId(cardId);
      }
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

  const deleteHandler = async () => {
    const card = currentCardId;
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

  renderAd = () => {
    return (
      <div id="ezoic-pub-ad-placeholder-101">
        <AdSense.Google
          client="ca-pub-6119346428517801"
          slot="6150940530"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
        />
      </div>
    );
  };

  return (
    <PageContainer className="page_cards-container">
      <ConfirmationDialog
        onClose={() => setShowConfirmDialog(false)}
        isShow={showConfirmDialog}
        onSubmit={deleteHandler}
      />
      <Loading isLoading={showLoading} />
      <Title variant="h5">
        {subject.boardName} {subject.levelName}
      </Title>
      <Title style={{ color: primaryColor }} variant="h3">
        {subject.name}
      </Title>
      <Slider
        ref={slider}
        arrows={false}
        slidesToShow={1}
        slidesToScroll={1}
        initialSlide={2}
        beforeChange={async (current, next) => {
          if (cards && cards.length && next !== -1 && !isLoading) {
            setLoading(true);
            const cardID = cards[next]._id;
            setCurrentCardId(cardID);

            const chapterId = await Request({
              action: "getChapterByCard",
              body: cardID
            });

            const url = `/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}?chapterId=${chapterId}&cardId=${cardID}`;

            FlowRouter.go(url);

            setLoading(false);
          }
        }}
        // afterChange={current => {    }}
      >
        {cards.map(({ _id, content, isAd }, i) => {
          if (isAd) {
            return renderAd();
          } else {
            return (
              <div key={i}>
                <Paper key={_id} className="page_cards-paper">
                  <div className="markdown-body">
                    <ReactMarkdown escapeHtml={false} source={content} />
                    <MathJax />
                  </div>
                </Paper>

                {isTeamRole &&
                  <div>
                    <button
                      className="Card-btn MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-root-98 MuiButton-containedPrimary"
                      id={_id}
                      onClick={editHandler}
                    >
                      Edit
                    </button>
                    <button
                      className="Card-btn MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-root-98 MuiButton-containedPrimary"
                      id={_id}
                      onClick={() => {
                        setCurrentCardId(_id);
                        setShowConfirmDialog(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>}
              </div>
            );
          }
        })}
      </Slider>
      <FlexBox align justify>
        <IconButton className="page_cards-arrows" onClick={onPrev}>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton className="page_cards-arrows" onClick={onNext}>
          <ArrowForwardIosIcon />
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
