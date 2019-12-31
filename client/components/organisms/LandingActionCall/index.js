import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {
  Text,
  Link,
  Title,
  Image,
  Button,
  FlexBox,
  Autosuggest,
} from '/client/components/atoms';
import { Request } from '/client/utils';
import Suggestion from './Suggestion';

import './styles.scss';

const LandingActionCall = ({
  align,
  minimal,
  titleText,
  withHint,
  className,
  buttonAlignment,
}) => {
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

  const getSuggestionValue = ({ name }) => name;

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

  return (
    <FlexBox
      column
      justify
      fullWidth
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
      <Title variant="h3">{titleText}</Title>
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
        column={buttonAlignment === 'bottom'}
      >
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
            placeholder: 'What do you want to study today?',
          }}
        />
        <Button
          onClick={onSearch}
        >
        Search
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

LandingActionCall.defaultProps = {
  minimal: false,
  withHint: false,
  align: true,
  titleText: 'For Students, By Students',
  buttonAlignment: 'bottom',
  className: '',
};

LandingActionCall.propTypes = {
  align: PropTypes.bool,
  minimal: PropTypes.bool,
  withHint: PropTypes.bool,
  titleText: PropTypes.string,
  className: PropTypes.string,
  buttonAlignment: PropTypes.oneOf(['bottom', 'right']),
};

export default LandingActionCall;
