import React, { Component } from "react";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import "../../styles/editor.css";
import { Button } from "react-bootstrap";
import { Loading, ConfirmationDialog } from "/client/components/molecules";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "**Hello world!!!**",
      tab: "write",
      moduleId: props.moduleId,
      chapterId: props.chapterId,
      subjectName: props.subjectName,
      cardId: props.cardId,
      cardName: "",
      sortKey: "",
      moduleSlugName: props.module,
      subjectSlugName: props.subject,
      boardSlugName: props.board,
      levelSlugName: props.level,
      showConfirmDialog: false
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  async componentDidMount() {
    if (this.state.cardId != 1) {
      Meteor.call("loadCards", this.state.cardId, (err, res) => {
        if (err) console.log(err);
        else {
          this.setState({ value: res[0].content });
          this.setState({ cardName: res[0].title });
          this.setState({ sortKey: res[0].sortKey });
        }
      });
    }

    if (this.state.moduleSlugName) {
      Meteor.call(
        "getModuleIdBySlug",
        this.state.moduleSlugName,
        (err, res) => {
          if (err) console.log(err);
          else {
            this.setState({
              moduleId: res
            });
          }
        }
      );
    }
    if (this.state.subjectSlugName) {
      Meteor.call(
        "getSubjectNameBySlug",
        this.state.subjectSlugName,
        (err, res) => {
          if (err) console.log(err);
          else {
            this.setState({
              subjectName: res
            });
          }
        }
      );
    }
  }

  handleChangeName = event => {
    this.setState({
      value: this.state.value,
      tab: this.state.tab,
      chapterId: this.state.chapterId,
      moduleId: this.state.moduleId,
      subjectName: this.state.subjectName,
      cardId: this.state.cardId,
      cardName: event.target.value
    });
  };

  handleChangeKey = event => {
    this.setState({
      value: this.state.value,
      tab: this.state.tab,
      chapterId: this.state.chapterId,
      moduleId: this.state.moduleId,
      subjectName: this.state.subjectName,
      cardName: this.state.cardName,
      cardId: this.state.cardId,
      sortKey: event.target.value
    });
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
      data_updated: "",
      author: Meteor.userId(),
      sortKey: this.state.sortKey
    };
    const {
      boardSlugName,
      levelSlugName,
      subjectSlugName,
      moduleSlugName,
      chapterId,
      cardId
    } = this.state;

    Meteor.call("loadCards", this.state.cardId, (err, res) => {
      if (err) {
        console.log(err);
      } else if (res.length > 0) {
        const cardFetched = res[0];
        card.cardId = cardFetched._id;
        Meteor.call("updateCard", card, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            alert("Successfully updated!");
            // FlowRouter.go(
            //   `/explore/chapters/module/${this.state.moduleId}/${this.state
            //     .subjectName}/${this.state.cardId}`,
            // );

            const url = `/editor/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}?chapterId=${chapterId}&cardId=${cardId}`;
            FlowRouter.go(url);
          }
        });
      } else {
        Meteor.call("addCard", card, (err, cardId) => {
          if (err) console.log(err);
          else {
            Meteor.call("loadCards", cardId, (err, cards) => {
              if (err) {
                console.log(err);
              } else {
                const obj = {
                  chapterId: this.state.chapterId,
                  cards: cards[0]
                };
                Meteor.call("updateChapterWithCard", obj, (err, res) => {
                  if (err) {
                    console.log(err);
                  } else {
                    const url = `/editor/${boardSlugName}/${levelSlugName}/${subjectSlugName}/${moduleSlugName}?chapterId=${chapterId}&cardId=${cardId}`;
                    FlowRouter.go(url);
                    // FlowRouter.go(
                    //   `/explore/chapters/module/${this.state.moduleId}/${this
                    //     .state.subjectName}/${cardId}`,
                    // );
                  }
                });
              }
            });
          }
        });
      }
    });
  };

  render() {
    console.log({
      props: this.props,
      state: this.state
    });
    return (
      <div className="home-page1 -padding-20">
        <ConfirmationDialog
          onClose={() => this.setState({ showConfirmDialog: false })}
          isShow={this.state.showConfirmDialog}
          onSubmit={this.handleMDSave}
          submitButtonText={this.props.cardId !== "1" ? "Update" : "Save"}
        />
        <div className="customContainer">
          <ReactMde
            onChange={this.handleValueChange}
            onTabChange={this.handleTabChange}
            value={this.state.value}
            generateMarkdownPreview={markdown =>
              Promise.resolve(this.converter.makeHtml(markdown))}
            selectedTab={this.state.tab}
          />
        </div>
        <div className="customContainer -full-width -outer-center">
          <form>
            <label htmlFor="name">
              <b>Card Title</b>
            </label>
            <input
              style={{ backgroundColor: "white" }}
              type="text"
              placeholder={this.state.cardName || "title"}
              name="name"
              onChange={this.handleChangeName}
            />
            <label htmlFor="key">
              <b>Sort Key</b>
            </label>
            <input
              style={{ backgroundColor: "white" }}
              type="text"
              placeholder={this.state.sortKey || "key"}
              name="name"
              onChange={this.handleChangeKey}
            />
          </form>
          <button
            className="baton baton1 -center"
            onClick={() => this.setState({ showConfirmDialog: true })}
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
