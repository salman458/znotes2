import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, fade } from "@material-ui/core/styles";
import { FlowRouter } from "meteor/kadira:flow-router";
import {
  Text,
  Link,
  Title,
  Image,
  FlexBox,
  Autosuggest,
  Spinner
} from "/client/components/atoms";
import { Search, ChevronRight } from "/client/components/icons";
import { Request } from "/client/utils";
import Suggestion from "./Suggestion";
import "./styles.scss";
import { defaultTheme } from "react-autosuggest/dist/theme";
const useStyles = makeStyles(theme => ({
  small: {
    fontSize: "2.5rem"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: 10,
    backgroundColor: fade("#383838", 1),
    "&:hover": {
      backgroundColor: fade("#383838", 1)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    zIndex: 1
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 6),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 0,
      "&:focus": {
        width: 200
      }
    },
    backgroundColor: fade("#383838", 1),
    "&:hover": {
      backgroundColor: fade("#383838", 1)
    },
    border: "none",
    width: "100%",
    "border-radius": "45px!important",
    color: "white",
    "&:placeholder": {
      color: "white",
      "font-weight": "600"
    }
  }
}));

const LandingActionCall = ({
  align,
  minimal,
  titleText,
  withHint,
  collapsibleSearch,
  className
}) => {
  const classes = useStyles();
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeywords = async () => {
      const standardKeywords = (await Request({ action: "getKeywords" })) || [];
      const subjects = (await Request({ action: "getSubjectKeywords" })) || [];
      const levels = (await Request({ action: "getLevelKeywords" })) || [];
      const boards = (await Request({ action: "getBoardKeywords" })) || [];
      const module = (await Request({ action: "getModuleKeyword" })) || [];
      const allKeyWords = [
        ...standardKeywords,
        ...subjects,
        ...levels,
        ...boards,
        ...module
      ].filter(el => el != null);
      setKeywords(allKeyWords);
    };
    handleKeywords();
  }, []);

  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsCopy, setSuggestionsCopy] = useState([]);
  const [value, setValue] = useState("");

  const getSuggestions = currentValue => {
    const inputValue = currentValue.trim().toLowerCase();
    if (inputValue.length === 0) {
      return [];
    }
    return keywords.filter(
      ({ name }) =>
        name.toLowerCase().slice(0, inputValue.length) === inputValue
    );
  };

  const [searchable, setSearchable] = useState({});

  const getSearchString = data => {
    const { name, levelName, boardName, subjectName, type } = data;
    return `${name || ""}${subjectName ? ` ${subjectName}` : ""}${levelName
      ? ` ${levelName}`
      : ""}${boardName ? ` ${boardName}` : ""}`;
  };

  const getSuggestionValue = data => {
    setSearchable(data);
    return getSearchString(data);
  };
  const onSuggestionsFetchRequested = ({ value: currentValue }) => {
    setSuggestions(getSuggestions(currentValue));
    setSuggestionsCopy(getSuggestions(currentValue));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (_, { newValue: currentValue }) => {
    if (currentValue && !keywords.length) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    setValue(currentValue);
  };

  const handleSearch = async searchResult => {
    // console.log(searchResult, "searchResult");
    const { type, moduleId, boardId, subjectId, levelId } = searchResult;
    let moduleSlugName, boardSlugName, subjectSlugName, levelSlugName;
    if (moduleId) {
      moduleSlugName = await Request({
        action: "getModuleSlugName",
        body: moduleId
      });
    }
    if (boardId) {
      boardSlugName = await Request({
        action: "getBoardSlugName",
        body: boardId
      });
    }
    if (subjectId) {
      subjectSlugName = await Request({
        action: "getSubjectSlugName",
        body: subjectId
      });
    }
    if (levelId) {
      levelSlugName = await Request({
        action: "getLevelSlugName",
        body: levelId
      });
    }

    switch (type) {
      case "board":
        FlowRouter.go(`/explore/${boardSlugName || id}`);
        break;
      case "module": {
        const url = `/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}`;
        FlowRouter.go(url);
        break;
      }
      case "subject": {
        const url = `/explore/subject/${boardSlugName}/${levelSlugName}/${subjectSlugName}`;
        FlowRouter.go(url);
        break;
      }
      case "level": {
        FlowRouter.go(`/explore/level/${boardSlugName}/${levelSlugName}`);
        break;
      }
      default:
        break;
    }

    // switch (type) {
    //   case "board":
    //     FlowRouter.go(`/explore/level/${id}`);
    //     break;
    //   case "level": {
    //     const res = await Request({
    //       action: "getBoardIdByLevel",
    //       body: id
    //     });
    //     FlowRouter.go(`/explore/subject/${res}/${id}`);
    //     break;
    //   }
    //   case "subject": {
    //     const res = await Request({
    //       action: "loadSubjectName",
    //       body: id
    //     });
    //     console.log(res,"ress")
    //     FlowRouter.go(`/explore/module/${res}/${id}`);
    //     break;
    //   }
    // case "module": {
    //   const res = await Request({
    //     action: "getSubjectNameByModuleId",
    //     body: id
    //   });
    //   FlowRouter.go(`/explore/chapters/module/${id}/${res}/${1}`);
    //   break;
    // }
    //   default:
    //     break;
    // }
  };

  const onSearch = async () => {
    const result = await Request({
      action: "genericSearch",
      body: searchable
    });

    handleSearch(result);
  };

  const onKeyDown = e => {
    const isSearch = suggestionsCopy.some(val => getSearchString(val) == value);
    if ((isSearch && e.key === "Enter") || e.code === "Enter") {
      onSearch();
    }
  };

  return (
    <div style={{ zIndex: 1 }}>
      {collapsibleSearch
        ? <div className={classes.search}>
            {/* <div className="auto-s"> */}
            <FlexBox align justify className={classes.searchIcon}>
              <Search />
            </FlexBox>
            <Autosuggest
              theme={{
                ...defaultTheme,
                input: classes.inputInput
              }}
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={Suggestion}
              className={className}
              inputProps={{
                value,
                onChange,
                onKeyDown,
                placeholder: "Search.."
              }}
            />
            {/* </div> */}
          </div>
        : <FlexBox
            column
            justify
            align={align}
            className="organism_action-call-root"
          >
            {!minimal &&
              <Image
                className="organism_action-call-logo"
                src="/img/logo.png"
              />}
            {titleText &&
              <Title
                variant="h1"
                component="h1"
                className={clsx(
                  "organism_action-call-header",
                  !minimal && classes.small
                )}
              >
                {titleText}
              </Title>}

            {withHint &&
              <Text>
                Search for a course, or go to the{" "}
                <Link className="organism_landing-hint-link" to="/explore">
                  Explore
                </Link>{" "}
                page to see whole content.
              </Text>}
            <FlexBox
              justify
              align
              fullWidth
              className="organism_landing-autosuggest"
            >
              <Search className="organism_landing-autosuggest-icon left" />

              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={Suggestion}
                className={className}
                inputProps={{
                  value,
                  onChange,
                  onKeyDown,
                  placeholder: "What do you want to revise?"
                }}
              />
              <Spinner className="spinner" isLoading={isLoading} />
              <ChevronRight
                onClick={onSearch}
                className="organism_landing-autosuggest-icon right"
              />
            </FlexBox>
          </FlexBox>}
    </div>
  );
};

LandingActionCall.defaultProps = {
  minimal: false,
  withHint: false,
  align: true,
  titleText: undefined,
  className: "",
  collapsibleSearch: false
};

LandingActionCall.propTypes = {
  align: PropTypes.bool,
  minimal: PropTypes.bool,
  withHint: PropTypes.bool,
  titleText: PropTypes.string,
  className: PropTypes.string
};

export default LandingActionCall;
