import React, { useState } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { Search } from '/client/components/icons';
import { FlexBox } from '/client/components/atoms';
import { Request } from '/client/utils';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginRight: 10,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 0,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

const CollapsibleSearch = () => {
  const [search, setSearch] = useState('');
  const classes = useStyles();

  const onChange = (e) => {
    setSearch(e.target.value);
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
      body: search,
    });
    handleSearch(result);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={classes.search}>
      <FlexBox align justify className={classes.searchIcon}>
        <Search />
      </FlexBox>
      <InputBase
        value={search}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={onChange}
        onKeyDown={onKeyDown}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
};

export default CollapsibleSearch;
