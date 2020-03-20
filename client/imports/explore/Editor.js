import React, { Component } from 'react';
import ReactMde from 'react-mde';
import Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import '../../styles/editor.css';
import { Button } from 'react-bootstrap';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '**Hello world!!!**',
      tab: 'write',
      moduleId: props.moduleId,
      chapterId: props.chapterId,
      subjectName: props.subjectName,
      cardId: props.cardId,
      cardName: '',
      sortKey: '',
      moduleSlugName: props.moduleSlugName,
      subjectSlugName: props.subjectSlugName,

    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
    });
  }

  async componentDidMount() {
    if (this.state.cardId != 1) {
      Meteor.call('loadCards', this.state.cardId, (err, res) => {
        if (err) console.log(err);
        else {
          this.setState({ value: res[0].content });
          this.setState({ cardName: res[0].title });
          this.setState({ sortKey: res[0].sortKey });
        }
      });
    }

    if (this.state.moduleSlugName) {
      Meteor.call('getModuleIdBySlug', this.state.moduleSlugName, (err, res) => {
        if (err) console.log(err);
        else {
          console.log(res, 'res getModuleIdBySlug');
          this.setState({
            moduleId: res,
          });
        }
      });
    }
    if (this.state.subjectSlugName) {
      Meteor.call('getSubjectNameBySlug', this.state.subjectSlugName, (err, res) => {
        if (err) console.log(err);
        else {
          console.log(res, 'res getModuleIdBySlug');
          this.setState({
            subjectName: res,
          });
        }
      });
    }
  }

  handleChangeName = (event) => {
    this.state = {
      value: this.state.value,
      tab: this.state.tab,
      chapterId: this.state.chapterId,
      moduleId: this.state.moduleId,
      subjectName: this.state.subjectName,
      cardId: this.state.cardId,
      cardName: event.target.value,
    };
  };

  handleChangeKey = (event) => {
    this.state = {
      value: this.state.value,
      tab: this.state.tab,
      chapterId: this.state.chapterId,
      moduleId: this.state.moduleId,
      subjectName: this.state.subjectName,
      cardName: this.state.cardName,
      cardId: this.state.cardId,
      sortKey: event.target.value,

    };
  };

  handleValueChange = (value: string) => {
    this.setState({ value });
  };

  handleTabChange = (tab: "write" | "preview") => {
    this.setState({ tab });
  };

  handleMDSave = () => {
    const card = {
      title: this.state.cardName,
      content: this.state.value,
      data_created: new Date(),
      data_updated: '',
      author: Meteor.userId(),
      sortKey: this.state.sortKey,
    };
    console.log('apush', this.state.cardId);
    Meteor.call('loadCards', this.state.cardId, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log('valod', res);
        if (res.length > 0) {
          console.log('shun', res);
          const cardFetched = res[0];
          card.cardId = cardFetched._id;
          Meteor.call('updateCard', card, (err, res) => {
            if (err) {
              console.log(err);
            } else {
              alert('Successfully updated!');
              FlowRouter.go(
                `/explore/chapters/module/${this.state.moduleId}/${this.state
                  .subjectName}/${this.state.cardId}`,
              );
            }
          });
        } else {
          Meteor.call('addCard', card, (err, cardId) => {
            if (err) console.log(err);
            else {
              Meteor.call('loadCards', cardId, (err, cards) => {
                if (err) {
                  console.log(err);
                } else {
                  const obj = {
                    chapterId: this.state.chapterId,
                    cards: cards[0],
                  };
                  console.log(obj);
                  Meteor.call('updateChapterWithCard', obj, (err, res) => {
                    if (err) {
                      console.log(err);
                    } else {

                      FlowRouter.go(
                        `/explore/chapters/module/${this.state.moduleId}/${this
                          .state.subjectName}/${cardId}`,
                      );
           
                    }
                  });
                }
              });
            }
          });
        }
      }
    });
  };

  render() {
    console.log(this.props, this.state, 'props state');
    return (
      <div className="home-page1 -padding-20">
        <div className="customContainer">
          <ReactMde
            onChange={this.handleValueChange}
            onTabChange={this.handleTabChange}
            value={this.state.value}
            generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
            selectedTab={this.state.tab}
          />
        </div>
        <div className="customContainer -full-width -outer-center">
          <form>
            <label htmlFor="name">
              <b>Card Title</b>
            </label>
            <input
              style={{ backgroundColor: 'white' }}
              type="text"
              placeholder={this.state.cardName || 'title'}
              name="name"
              onChange={this.handleChangeName}
            />
            <label htmlFor="key">
              <b>Sort Key</b>
            </label>
            <input
              style={{ backgroundColor: 'white' }}
              type="text"
              placeholder={this.state.sortKey || 'key'}
              name="name"
              onChange={this.handleChangeKey}
            />
          </form>
          <button
            className="baton baton1 -center"
            onClick={this.handleMDSave}
            variant="outline-primary"
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

export default Editor;
