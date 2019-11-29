import React, { Component } from 'react';

import '../../styles/boards.css';
import '../../styles/chapter.css';
import '../../styles/community.css';
import SideNav, { MenuIcon } from 'react-simple-sidenav';
import { Meteor } from 'meteor/meteor';
import { Line, Circle } from 'rc-progress';
import Showdown from 'showdown';
import parse from 'html-react-parser';
import Collapsible from 'react-collapsible';
// import Popup from 'reactjs-popup';
import { button } from 'reactstrap';
import { Carousel } from 'react-responsive-carousel';
import ReactMde from 'react-mde';

const ReactMarkdown = require('react-markdown');

class Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleId: props.moduleId,
      subjectName: props.subjectName,
      moduleName: '',
      chapters: [],
      showNav: false,
      showMD: false,
      card: '',
      buttonCount: new Map(),
      progressTracker: new Map(),
      totalCount: '',
      currentCard: 1,
      percentage: 0,
      chapterName: '',
      cardId: props.cardId,
      progress: 1,
      superSubjects: [],
      role: false,
      grade: '',
      conf: '',
      haveSubjects: [],
      sponsorMapper: [],
      everyN: 2,
      isSponsor: false,

    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
    });

    this.chapterHandler = this.chapterHandler.bind(this);
    this.handleChapterName = this.handleChapterName.bind(this);
    this.addCard = this.addCard.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderbutton = this.renderbutton.bind(this);
    this.addSubject = this.addSubject.bind(this);
    this.gradeHandler = this.gradeHandler.bind(this);
    this.confHandler = this.confHandler.bind(this);
    this.addHandler = this.addHandler.bind(this);
  }

  renderContent() {
    Meteor.call('loadCards', this.state.cardId, (err, card) => {
      if (err) {
        console.log(err);
      } else {
        if (card.length === 0) {
          console.log('yashik');
          Meteor.call('getSponsorCard', this.state.cardId, (err, add) => {
            if (err) console.log(err);
            else {
              this.setState({
                card: add[0].content[this.getRandomInt(add[0].content.length)],
                showNav: false,
                showMD: true,
                isSponsor: true,
              });
            }
          });
        } else {
          this.state.card = card[0].content;
          this.setState({
            moduleId: this.state.moduleId,
            subjectName: this.state.subjectName,
            moduleName: this.state.moduleName,
            chapters: this.state.chapters,
            showNav: false,
            showMD: true,
            cards: this.state.cards,
            buttonCount: this.state.buttonCount,
            totalCount: this.state.totalCount,
            currentChapter: this.state.currentChapter,
            percentage: this.state.percentage,
            chapterName: this.state.chapterName,

          });
        }
        // this.setState({percentage: ((this.state.buttonCount.get(this.state.currentChapter)) * 1.0 / (this.state.totalCount)) * 100});
      }
    });
  }

  chapterHandler(event) {
    const chapterId = this.state.buttonCount.get(event.target.id);
    const newProgress = this.state.progressTracker.get(chapterId);
    this.setState({ progress: newProgress });

    const uri = `/explore/chapters/module/${this.state.moduleId}/${this.state.subjectName}/${event.target.id}`;
    const obj = {
      userId: Meteor.userId(),
      subject: {
        id: this.state.subjectName,
        position: uri,
        progress: this.state.progress,
        moduleName: this.state.moduleName,
      },
    };

    Meteor.call('addLastPosition', obj, (err, res) => {
      if (err) {
        console.log(err);
        FlowRouter.go(uri);
        window.location.reload();
      } else {
        FlowRouter.go(uri);
        window.location.reload();
      }
    });
  }

  addHandler(event) {
    const uri = `/explore/chapters/module/${this.state.moduleId}/${this.state.subjectName}/${event.target.id}`;
    FlowRouter.go(uri);
    window.location.reload();
  }

  addCard(event) {
    FlowRouter.go(`/explore/chapters/editor/${this.state.moduleId}/${this.state.subjectName}/${event.target.id}/${1}`);
  }

  componentDidMount() {
    Meteor.call('getAllSponsorCards', {}, (err, res) => {
      if (err) console.log(err);
      if (res) {
        let mapVal = 0;
        this.shuffle(res).forEach((record) => {
          if (record.subjects.includes(this.state.subjectName)) {
            this.state.sponsorMapper.push(
              <button
                className="nest"
                style={{
                  paddingTop: '1%',
                  paddingLeft: '1%',
                  color: 'white',
                  fontSize: 'large',
                  background: 'transparent',
                  border: 'none',
                  display: 'block',
                }}
                id={record.sponsor}
                onClick={this.addHandler}
              >
Sponsor Content
              </button>,
            );
            mapVal++;
          }
        });
      }
      Meteor.call('loadModules', { _id: this.state.moduleId }, (err, zModule) => {
        if (err) console.log(err);
        else {
          this.state.moduleName = zModule[0].name;
          Meteor.call('loadChapters', { _id: { $in: zModule[0].chapters.map((chapter) => chapter._id) } }, (err, chapters) => {
            if (err) console.log(err);
            else if (Meteor.userId()) {
              Meteor.call('findUserRole', Meteor.userId(), (err, role) => {
                if (err) console.log(err);
                else {
                  if (role[0].role === 'team') {
                    this.setState({ role: true });
                  }
                  Meteor.call('findUserSubjects', Meteor.userId(), (err, res) => {
                    if (err) console.log(err);
                    else {
                      this.setState({ superSubjects: res[0].sucjects.map((x) => x.value) });
                      this.state.totalCount = chapters.length;

                      let counter = 0;
                      chapters.forEach((chapter) => {
                        counter++;
                        this.state.progressTracker.set(chapter._id, counter);
                        if (this.state.role || this.state.superSubjects.includes(this.state.subjectName)) {
                          this.state.chapters.push(
                            <li className="btn-group" id={chapter._id}>
                              <ul>
                                <Collapsible trigger={<p style={{ fontSize: 'large' }}><b>{chapter.name}</b></p>}>
                                  {this.insertTokenEveryN(chapter.cards.sort((a, b) => {
                                    console.log('cit', a.sortKey);
                                    return a.sortKey - b.sortKey;
                                  }).map((card) => {
                                    this.state.buttonCount.set(String(card._id), chapter._id);
                                    return (
                                      <button
                                        className="nest"
                                        style={{
                                          paddingTop: '1%',
                                          paddingLeft: '1%',
                                          color: 'white',
                                          fontSize: 'large',
                                          background: 'transparent',
                                          border: 'none',
                                          display: 'block',
                                        }}
                                        id={card._id}
                                        onClick={this.chapterHandler}
                                      >
                                        {card.title}
                                      </button>
                                    );
                                  }), this.state.sponsorMapper, this.state.everyN, false)}
                                  <br />
                                  <button
                                    className="baton baton1"
                                    id={chapter._id}
                                    onClick={this.addCard}
                                    variant="outline-primary"
                                  >
Add
                                                                                Card
                                  </button>
                                </Collapsible>
                              </ul>
                            </li>,
                          );
                        } else {
                          this.state.chapters.push(
                            <li className="btn-group" id={chapter._id}>
                              <ul>
                                <Collapsible trigger={<p style={{ fontSize: 'large' }}><b>{chapter.name}</b></p>}>
                                  {
                                                                                this.insertTokenEveryN(chapter.cards.map((card) => {
                                                                                  this.state.buttonCount.set(String(card._id), chapter._id);
                                                                                  return (
                                                                                    <button
                                                                                      className="nest"
                                                                                      style={{
                                                                                        paddingTop: '1%',
                                                                                        paddingLeft: '1%',
                                                                                        color: 'white',
                                                                                        fontSize: 'large',
                                                                                        background: 'transparent',
                                                                                        border: 'none',
                                                                                        display: 'block',

                                                                                      }}
                                                                                      id={card._id}
                                                                                      onClick={this.chapterHandler}
                                                                                    >
                                                                                      {card.title}
                                                                                    </button>
                                                                                  );
                                                                                }), this.state.sponsorMapper, this.state.everyN, false)
                                                                            }
                                </Collapsible>
                              </ul>
                            </li>,
                          );
                        }
                        const currChapter = this.state.progressTracker.get(this.state.buttonCount.get(this.state.cardId));
                        const total = this.state.progressTracker.size;
                        this.setState({ progress: (currChapter / total) * 100 });
                        this.forceUpdate();
                      });

                      if (this.state.role || this.state.superSubjects.includes(this.state.subjectName)) {
                        this.state.chapters.push(
                          <div>
                            {this.renderAddBoardPopUp()}
                          </div>,
                        );
                      }

                      this.state.chapters.push(
                        <div>
                          {this.renderAddSubjectPopUp()}
                        </div>,
                      );
                      this.forceUpdate();

                      if (this.state.cardId != 1) this.renderContent();
                    }
                  });
                }
              });
            } else {
              let counter = 0;
              chapters.forEach((chapter) => {
                counter++;
                this.state.progressTracker.set(chapter._id, counter);
                this.state.chapters.push(
                  // onClick={this.chapterHandler}
                  <li className="btn-group" id={chapter._id}>
                    <ul>
                      <Collapsible trigger={<p style={{ fontSize: 'large' }}><b>{chapter.name}</b></p>}>
                        {
                                                            this.insertTokenEveryN(chapter.cards.map((card) => {
                                                              this.state.buttonCount.set(String(card._id), chapter._id);
                                                              return (
                                                                <button
                                                                  className="nest"
                                                                  style={{
                                                                    paddingTop: '1%',
                                                                    paddingLeft: '1%',
                                                                    color: 'white',
                                                                    fontSize: 'large',
                                                                    background: 'transparent',
                                                                    border: 'none',
                                                                    display: 'block',

                                                                  }}
                                                                  id={card._id}
                                                                  onClick={this.chapterHandler}
                                                                >
                                                                  {card.title}
                                                                </button>
                                                              );
                                                            }), this.state.sponsorMapper, this.state.everyN, false)

                                                        }
                      </Collapsible>
                    </ul>
                  </li>,
                );
              });
              const currChapter = this.state.progressTracker.get(this.state.buttonCount.get(this.state.cardId));
              const total = this.state.progressTracker.size;
              this.setState({ progress: (currChapter / total) * 100 });
              this.forceUpdate();

              // this.state.chapters.push(
              //     <Line percent={this.state.progress} strokeWidth="4"
              //           strokeColor="#66ff33"/>
              // );

              if (Meteor.user()) {
                this.state.chapters.push(
                  <div>
                    {this.renderAddBoardPopUp()}
                  </div>,
                );
              }
              if (this.state.cardId != 1) this.renderContent();
            }
            this.setState({ showNav: true });
          });
        }
      });
    });
  }

  renderBody() {
    return (
      <div>
        <MenuIcon className="mnu" onClick={() => this.setState({ showNav: true })} />
        <SideNav
          titleStyle={{ backgroundColor: '#383838' }}
          itemStyle={{ backgroundColor: '#282828', color: 'white', font: 'bold' }}
          itemHoverStyle={{ backgroundColor: '#383838', color: 'white', font: 'bold' }}
          navStyle={{ backgroundColor: '#282828' }}
          showNav={this.state.showNav}
          onHideNav={() => this.setState({ showNav: false })}
          title={(
            <div>
              <h1>{this.state.moduleName}</h1>
              <Line
                percent={this.state.progress}
                strokeWidth="4"
                strokeColor="#66ff33"
              />
            </div>
                      )}
          items={
                        this.state.chapters
                    }
        />
      </div>
    );
  }

  renderAddBoardPopUp() {
    return null; // (
    // <Popup className="dibil" trigger={this.renderbutton} modal>
    //   {(close) => (
    //     <div className="modal">
    //       <a className="close" onClick={close}>
    //                       &times;
    //       </a>
    //       {this.renderEdit()}
    //     </div>
    //   )}

    // </Popup>
    // );
  }

  renderAddSubjectPopUp() {
    return null;
    //  (
    //   <Popup trigger={this.renderAddSubjectbutton} modal>
    //     {(close) => (
    //       <div className="modal">
    //         <a className="close" onClick={close}>
    //                         &times;
    //         </a>
    //         {this.renderSubjectEdit()}
    //       </div>
    //     )}

    //   </Popup>
    // );
  }

  renderEdit() {
    return (
      <div className="container">
        <form className="login">
          <label htmlFor="name"><b>New Chapter Name</b></label>
          <input type="text" placeholder="Enter the Name" name="name" onChange={this.handleChapterName} />
        </form>
        <button onClick={this.handleSubmit} className="registerbtn">Add</button>
      </div>
    );
  }

  gradeHandler(event) {
    this.setState({ grade: event.target.value });
  }

  confHandler(event) {
    this.setState({ conf: event.target.value });
  }

  renderSubjectEdit() {
    return (
      <div className="container">
        <form className="login">
          <label htmlFor="name"><b>Add to My Subjects</b></label>
          <input type="text" placeholder="What is your target grade?" name="grade" onChange={this.gradeHandler} />
          <input type="text" placeholder="How confident are you about it (1-5)?" name="confidence" onChange={this.confHandler} />
        </form>
        <button onClick={this.addSubject} className="registerbtn">Add</button>
      </div>
    );
  }

  handleChapterName(event) {
    this.state.chapterName = event.target.value;
  }

  handleSubmit() {
    const chapter = {
      name: this.state.chapterName,
      created: new Date(),
      cards: [],
    };
    Meteor.call('addChapter', chapter, (err, id) => {
      if (err) console.log(err);
      else {
        const chapterMod = {
          name: chapter.name,
          created: chapter.created,
          cards: chapter.cards,
          _id: id,
        };
        Meteor.call('updateChapter', { moduleId: this.state.moduleId, chapter: chapterMod }, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            FlowRouter.go(`/explore/chapters/module/${this.state.moduleId}/${this.state.subjectName}/${1}`);
            window.location.reload();
          }
        });
      }
    });
  }

  renderbutton() {
    return (<button className="baton baton1">Add Chapter</button>);
  }

  renderAddSubjectbutton() {
    return (<button className="baton baton1">Add to My Subjects</button>);
  }

  editHandler() {
    const chapterId = this.state.buttonCount.get(this.state.cardId);
    FlowRouter.go(`/explore/chapters/editor/${this.state.moduleId}/${this.state.subjectName}/${chapterId}/${this.state.cardId}`);
  }

  deleteHandler() {
    console.log('bbbb', this.state.cardId);
    Meteor.call('deleteCard', this.state.cardId, (err, res) => {
      if (err) console.log(err);
      else {
        Meteor.call('removeCardRef', {
          chapterId: this.state.buttonCount.get(this.state.cardId),
          cardId: this.state.cardId,
        }, (err, res) => {
          if (err) console.log(err);
          else {
            FlowRouter.go(`/explore/chapters/module/${this.state.moduleId}/${this.state.subjectName}/${1}`);
            window.location.reload();
          }
        });
      }
    });
  }

  addSubject() {
    const userId = Meteor.userId();
    const dbObject = {
      userId,
      subject: {
        id: this.state.subjectName,
        targetGrade: this.state.grade,
        confidence: this.state.conf,
      },

    };
    console.log('ppppp', dbObject);
    Meteor.call('addSubjectToUser', dbObject, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        window.location.reload();
      }
    });
  }

  render() {
    if (this.state.showMD) {
      if (this.state.role || this.state.superSubjects.includes(this.state.subjectName)) {
        return (
          <div className="home-page1 -padding-20">
            {this.renderBody()}
            <div className="chapterContainer">
              {/* {parse(this.converter.makeHtml(this.state.card))} */}
              <ReactMde
                className="mdegago"
                value={this.state.card}
                generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
                selectedTab="preview"
              />
              <ul style={{ display: 'inline-table', visibility: this.state.isSponsor ? 'hidden' : 'visible' }} className="cardEditor">
                <li>
                  <button className="baton baton1" onClick={this.editHandler}>Edit</button>
                </li>
                <li>
                  <button className="baton baton1" onClick={this.deleteHandler}>Delete</button>
                </li>
              </ul>
            </div>

          </div>
        );
      }
      return (
        <div className="home-page1 -padding-20">
          {this.renderBody()}
          <div className="chapterContainer">
            {/* {parse(this.converter.makeHtml(this.state.card))} */}
            <ReactMde
              className="mdegago"
              value={this.state.card}
              generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
              selectedTab="preview"
            />
          </div>
        </div>
      );
    }
    return (
      <div className="home-page1 -padding-20">
        {this.renderBody()}
        <div style={{ height: '500px' }} />
      </div>
    );
  }

  shuffle(a) {
    let j; let x; let
      i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

    insertTokenEveryN = (arr, token, n, fromEnd) => {
      const a = arr.slice(0);
      let idx = fromEnd ? a.length - n : n;

      while ((fromEnd ? idx >= 1 : idx <= a.length)) {
        a.splice(idx, 0, token.pop());
        idx = (fromEnd ? idx - n : idx + n + 1);
      }

      return a;
    };

    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
}

export default Subject;
