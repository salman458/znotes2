import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import ReactMarkdown from "react-markdown";
import MathJax from "react-mathjax-preview";
import Paper from "@material-ui/core/Paper";
import { FlowRouter } from "meteor/kadira:flow-router";
import { Request } from "/client/utils";
import {
  IconButton,
  FlexBox,
  Title,
  PageContainer,
  ErrorBoundary,
} from "/client/components/atoms";

import "./styles.scss";
import AdSense from "react-adsense";
import { usePermission } from "/client/contexts/permission";
import { USER_PERMISSIONS } from "/client/utils";
import { Loading, ConfirmationDialog } from "/client/components/molecules";
import Subjects from "/client/components/molecules/SubjectCard/subjectData";
import _ from "lodash";
import { SanitizeName } from "/client/utils";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { useGlobal, setGlobal } from "reactn";
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
  const [isLoading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  // const module = urlParams.get("moduleId");
  // const subj = urlParams.get("subjectId");
  const [slideIndex, setSlideIndex] = useState(-1);
  const [cardsData, setCardsData] = useGlobal("cardsData");
  const { color } =
    Subjects[!_.isEmpty(subject) ? SanitizeName(subject.name) : ""] || {};
  const primaryColor = color || "#D82057";
  const isTeamRole = usePermission() === USER_PERMISSIONS.editor;

  const setInitailSlide = (cards) => {
    setTimeout(() => {
      let slideIndexLocal = cards.findIndex((val) => val._id == currentCardId);
      if (slideIndexLocal == -1) {
        slideIndexLocal = 0;
      }
      setSlideIndex(slideIndexLocal);
      slider.current.slickGoTo(slideIndexLocal, true);
    }, 200);
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
      body: subjectSlugName,
    });

    setSubjectData(subjectData);
    setTitle(subjectData);
  };

  const setTitle = (subject) => {
    if (!_.isEmpty(subject)) {
      document.title = `ZNotes | Learn ${subject.boardName} ${
        subject.levelName
      } ${subject.name} ${moduleSlugName.replace(/[^A-Za-z]+/g, " ")}`;
    }
  };

  const getAllCardsByModuleSlugName = async () => {
    if (slideIndex == -1) {
      setShowLoading(true);
    }
    const cardData = await Request({
      action: "getAllCardsByModuleSlugName",
      body: moduleSlugName,
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
            isAd: true,
          });
          counter = 0;
        }
      }
    } else cardsResult = cardData;

    setCards(cardsResult);
    setShowLoading(false);
    setCardsData(cardData);
    setInitailSlide(cardsResult);
  };

  useEffect(() => {
    if (cards && cards.length > 0) {
      setInitailSlide(cards);
    }
  }, [currentCardId]);

  useEffect(() => {
    getSubjectBySlug();
  }, [subjectSlugName]);

  useEffect(() => {
    getAllCardsByModuleSlugName();
  }, [moduleSlugName]);

  useEffect(() => {
    if (cardId) {
      setCurrentCardId(cardId);
    }
  }, [cardId]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyPressed);
    return () => {
      {
        document.removeEventListener("keydown", onKeyPressed);
      }
    };
  }, []);

  const onKeyPressed = (event) => {
    const { key } = event;
    if (key == " " || key == "ArrowUp") {
      onNext();
    }
    if (key == "ArrowDown") {
      onPrev();
    }
  };

  const editHandler = async (event) => {
    const cardId = event.target.id;
    const chapterId = await Request({
      action: "getChapterByCard",
      body: cardId,
    });
    const url = `/editor/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}?chapterId=${chapterId}&cardId=${cardId}`;
    FlowRouter.go(url);
  };

  const deleteHandler = async () => {
    const card = currentCardId;
    const deleteCard = await Request({
      action: "deleteCard",
      body: card,
    });
    const chapter = await Request({
      action: "getChapterByCard",
      body: card,
    });
    const removeRef = await Request({
      action: "removeCardRef",
      body: {
        chapterId: chapter,
        cardId: card,
      },
    });
    window.location.reload();
  };

  const afterChange = async (next) => {
    if (cards && cards.length && next !== -1 && !isLoading) {
      let currentCardChapterId;

      setLoading(true);
      const cardID = cards[next]._id;
      setCurrentCardId(cardID);

      const currentCard = cards.find((v) => v._id === cardID);
      currentCardChapterId = currentCard.chapterId;

      if (!currentCardChapterId) {
        currentCardChapterId = await Request({
          action: "getChapterByCard",
          body: cardID,
        });
      }

      const url = `/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}?chapterId=${currentCardChapterId}&cardId=${cardID}`;

      await FlowRouter.go(url);

      await setLoading(false);
    }
  };

  const renderAd = () => {
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

  const handleClick = (event) => {
    event.preventDefault();
  };

  const renderCard = (i) => {
    if (cards && cards[i]) {
      if (cards[i].isAd) {
        return renderAd();
      }

      return (
        <div key={i}>
          <Paper key={cards[i]._id} className="page_cards-paper">
            <div className="markdown-body">
              <ReactMarkdown escapeHtml={false} source={cards[i].content} />
              <MathJax />
            </div>
          </Paper>

          {isTeamRole && (
            <div className="slider-edit-delet-box">
              <button
                type="button"
                className="Card-btn MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-root-98 MuiButton-containedPrimary"
                id={cards[i]._id}
                onClick={editHandler}
              >
                Edit
              </button>
              <button
                type="button"
                className="Card-btn MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-root-98 MuiButton-containedPrimary"
                id={cards[i]._id}
                onClick={() => {
                  setCurrentCardId(cards[i]._id);
                  setShowConfirmDialog(true);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <PageContainer className="page_cards-container">
      <ConfirmationDialog
        onClose={() => setShowConfirmDialog(false)}
        isShow={showConfirmDialog}
        onSubmit={deleteHandler}
      />
      <Loading isLoading={showLoading} />

      {/* breadcrumb start */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link
          color="inherit"
          href={`/explore/${boardSlugName}`}
          onClick={handleClick}
        >
          <Title variant="h5">{subject.boardName}</Title>
        </Link>
        <Link
          color="inherit"
          href={`/explore/level/${boardSlugName}/${levelSlugName}`}
          onClick={handleClick}
        >
          <Title variant="h5">{subject.levelName}</Title>
        </Link>
      </Breadcrumbs>

      {/* breadcrumb end */}
      <Link
        color="inherit"
        href={`/explore/subject/${boardSlugName}/${levelSlugName}/${subjectSlugName}`}
        onClick={handleClick}
      >
        <Title style={{ color: primaryColor }} variant="h3">
          {subject.name}
        </Title>
      </Link>

      <Slider
        ref={slider}
        arrows={false}
        slidesToShow={1}
        slidesToScroll={1}
        initialSlide={2}
        afterChange={afterChange}
        beforeChange={async (current, next) => {
          // if (cards && cards.length && next !== -1 && !isLoading) {
          //   setLoading(true);
          //   const cardID = cards[next]._id;
          //   setCurrentCardId(cardID);
          //   const currentCard = cards.find(v => v._id === cardID);
          //   const { chapterId } = currentCard;
          //   if (!chapterId) {
          //     let chapterId = await Request({
          //       action: "getChapterByCard",
          //       body: cardID,
          //     });
          //   }
          //   const url = `/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}?chapterId=${chapterId}&cardId=${cardID}`;
          //   await FlowRouter.go(url);
          //   await setLoading(false);
          // }
        }}
        // afterChange={current => {    }}
      >
        {cards.map(({ _id, content, isAd }, i) => {
          return renderCard(i);
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
