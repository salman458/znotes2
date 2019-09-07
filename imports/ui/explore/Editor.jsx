import React, {Component} from 'react';
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import "../../../client/styles/editor.css";
import {Button} from "react-bootstrap";

import Header from '../Header.jsx';


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
            cardName: ''
        };
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        });
    }

    componentDidMount() {
        if (this.state.cardId != 1) {
            Meteor.call('loadCards', this.state.cardId, (err, res) => {
                if (err)
                    console.log(err);
                else {
                    this.setState({value: res[0].content});
                    this.setState({cardName: res[0].title});
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
            cardName: event.target.value
        }
    };
    handleValueChange = (value: string) => {
        this.setState({value});
    };

    handleTabChange = (tab: "write" | "preview") => {
        this.setState({tab});
    };

    handleMDSave = () => {
        let card = {
            title: this.state.cardName,
            content: this.state.value,
            data_created: new Date(),
            data_updated: '',
            author: ''
        };

        Meteor.call('addCard', card, (err, cardId) => {
            if (err)
                console.log(err);
            else {
                Meteor.call('loadCards', cardId, (err, cards) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let obj = {chapterId: this.state.chapterId, cards: cards[0]};
                        console.log(obj);
                        alert("something");
                        Meteor.call('updateChapterWithCard', obj, (err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                FlowRouter.go('/explore/chapters/module/' + this.state.moduleId + '/' + this.state.subjectName + '/' + cardId);
                            }
                        });
                    }

                });
            }
        })
    };

    renderButton() {
        return (<div onClick={this.handleMDSave} className="button">
            <span>Save</span>
            <svg>
                <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
            </svg>
        </div>);

    }


    render() {
        return (
            <div className="home-page -padding-20">

                <Header/>
                <div className="customContainer">
                    <ReactMde
                        onChange={this.handleValueChange}
                        onTabChange={this.handleTabChange}
                        value={this.state.value}
                        generateMarkdownPreview={markdown => {
                            return Promise.resolve(this.converter.makeHtml(markdown))
                        }

                        }
                        selectedTab={this.state.tab}
                    />

                </div>
                <div className="customContainer -full-width -outer-center">
                    <form>
                        <label htmlFor="name"><b>Card Title</b></label>
                        <input type="text" placeholder={this.state.cardName || 'title'} name="name" onChange={this.handleChangeName}/>
                    </form>
                    <Button onClick={this.handleMDSave} variant="outline-primary">Save</Button>
                </div>


            </div>

        );
    }

}


export default Editor;
