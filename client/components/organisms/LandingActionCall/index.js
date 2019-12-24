import React, { useMemo, useState } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {
  Title,
  Image,
  Button,
  FlexBox,
  Autosuggest,
} from '/client/components/atoms';
import { Request } from '/client/utils';
import Suggestion from './Suggestion';

import './styles.scss';

const LandingActionCall = () => {
  const keywords = useMemo(() => {
    const result = [];
    const addToPool = (res) => [...result, ...res];
    Request({ action: 'getKeywords', callback: addToPool });
    Request({ action: 'getSubjectKeywords', callback: addToPool });
    Request({ action: 'getLevelKeywords', callback: addToPool });
    Request({ action: 'getBoardKeywords', callback: addToPool });
    return result;
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

  const searchHandler = (searchResult) => {
    const { type } = searchResult;
    const { _id: id } = searchResult.id[0];

    switch (type) {
      case 'board':
        FlowRouter.go(`/explore/level/${id}`);
        break;
      case 'level':
        Request({
          action: 'getBoardIdByLevel',
          body: id,
          callback: (res) => FlowRouter.go(`/explore/subject/${res}/${id}`),
        });
        break;
      case 'subject':
        Request({
          action: 'loadSubjectName',
          body: id,
          callback: (res) => FlowRouter.go(`/explore/module/${res}/${id}`),
        });
        break;
      case 'module':
        Request({
          action: 'getSubjectNameByModuleId',
          body: id,
          callback: (res) => FlowRouter.go(`/explore/chapters/module/${id}/${res}/${1}`),
        });
        break;
      default:
        break;
    }
  };

  const onSearch = () => {
    Request({
      action: 'genericSearch',
      body: value,
      callback: searchHandler,
    });
  };

  return (
    <FlexBox
      column
      align
      justify
      fullWidth
      className="organism_action-call-root"
    >
      <Image
        className="organism_action-call-logo"
        src="/img/logo.png"
      />
      <Title variant="h3">For Students, By Students</Title>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={Suggestion}
        className="test"
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
  );
};

export default LandingActionCall;
