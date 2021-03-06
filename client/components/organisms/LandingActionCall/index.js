import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {
  Text,
  Link,
  Title,
  Image,
  FlexBox,
  Autosuggest,
} from '/client/components/atoms';
import { Search, ChevronRight } from '/client/components/icons';
import { Request } from '/client/utils';
import Suggestion from './Suggestion';

import './styles.scss';

const useStyles = makeStyles(() => ({
  small: {
    fontSize: '2.5rem',
  },
}));

const LandingActionCall = ({
  align,
  minimal,
  titleText,
  withHint,
  className,
}) => {
  const classes = useStyles();
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    const handleKeywords = async () => {
      const standardKeywords = await Request({ action: 'getKeywords' }) || [];
      const subjects = await Request({ action: 'getSubjectKeywords' }) || [];
      const levels = await Request({ action: 'getLevelKeywords' }) || [];
      const boards = await Request({ action: 'getBoardKeywords' }) || [];
      setKeywords([...standardKeywords, ...subjects, ...levels, ...boards]);
    };
    handleKeywords();
  }, []);

  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState('');

  const getSuggestions = (currentValue) => {
    const inputValue = currentValue.trim().toLowerCase();
    if (inputValue.length === 0) {
      return [];
    }
    return keywords.filter(({ name }) => name
      .toLowerCase()
      .slice(0, inputValue.length) === inputValue);
  };

  const getSuggestionValue = ({
    name,
    levelName,
    boardName,
    subjectName,
  }) => `${name} ${subjectName} ${levelName} ${boardName}`;

  const onSuggestionsFetchRequested = ({ value: currentValue }) => {
    setSuggestions(getSuggestions(currentValue));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (_, { newValue: currentValue }) => {
    setValue(currentValue);
  };

  const handleSearch = async (searchResult) => {
    const { type } = searchResult;
    const { _id: id } = searchResult.id[0];

    switch (type) {
      case 'board':
        FlowRouter.go(`/explore/level/${id}`);
        break;
      case 'level':
      {
        const res = await Request({
          action: 'getBoardIdByLevel',
          body: id,
        });
        FlowRouter.go(`/explore/subject/${res}/${id}`);
        break;
      }
      case 'subject':
      {
        const res = await Request({
          action: 'loadSubjectName',
          body: id,
        });
        FlowRouter.go(`/explore/module/${res}/${id}`);
        break;
      }
      case 'module':
      {
        const res = await Request({
          action: 'getSubjectNameByModuleId',
          body: id,
        });
        FlowRouter.go(`/explore/chapters/module/${id}/${res}/${1}`);
        break;
      }
      default:
        break;
    }
  };

  const onSearch = async () => {
    const result = await Request({
      action: 'genericSearch',
      body: value,
    });
    handleSearch(result);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      onSearch();
    }
  };

  return (
    <FlexBox
      column
      justify
      align={align}
      className="organism_action-call-root"
    >
      {!minimal
        && (
        <Image
          className="organism_action-call-logo"
          src="/img/logo.png"
        />
        )}
      <Title
        variant="h1"
        component="h1"
        className={clsx('organism_action-call-header', !minimal && classes.small)}
      >
        {titleText}
      </Title>
      {withHint && (
        <Text>
          Search for a course, or go to the
          {' '}
          <Link className="organism_landing-hint-link" to="/explore">Explore</Link>
          {' '}
          page to see whole content.
        </Text>
      )}
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
            placeholder: 'What do you want to revise?',
          }}
        />
        <ChevronRight
          onClick={onSearch}
          className="organism_landing-autosuggest-icon right"
        />
      </FlexBox>
    </FlexBox>
  );
};

LandingActionCall.defaultProps = {
  minimal: false,
  withHint: false,
  align: true,
  titleText: 'FOR STUDENTS. BY STUDENTS.',
  className: '',
};

LandingActionCall.propTypes = {
  align: PropTypes.bool,
  minimal: PropTypes.bool,
  withHint: PropTypes.bool,
  titleText: PropTypes.string,
  className: PropTypes.string,
};

export default LandingActionCall;
