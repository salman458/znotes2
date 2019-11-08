import React, {Component} from 'react';
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import "../../client/styles/editor.css";
import {Button} from "react-bootstrap";
import Select from "react-dropdown-select";


import Header from './Header.jsx';
import {Meteor} from "meteor/meteor";


class Editor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            value: "**Hello world!!!**",
            tab: "write",
            moduleId: 1,
            chapterId: 1,
            subjectName: 1,
            cardId: 1,
            cardName: '',
            sortKey: '',
            subjects: '',
            subjectPermissions: ''
        };
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        });
    }

    componentDidMount() {
        Meteor.call('getAllSubjects', {}, (err, res) => {
            if (err)
                console.log(err);
            else {
                this.setState({
                    subjects: res.map(subject => {
                        return {
                            label: subject.name,
                            value: subject._id
                        }
                    })
                });
            }
        });
    }


    handleChangeName = (event) => {
        this.state = {
            value: this.state.value,
            tab: this.state.tab,
            chapterId: this.state.chapterId,
            moduleId: this.state.moduleId,
            subjectName: this.state.subjectName,
            cardId: this.state.cardId,
            cardName: event.target.value
        }
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
            sortKey: event.target.value
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
            author: Meteor.userId(),
            sortKey: this.state.sortKey
        };
        console.log('apush', this.state.cardId);
        Meteor.call('loadCards', this.state.cardId, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.log('valod', res);
                if (res.length > 0) {
                    console.log('shun', res);
                    let cardFetched = res[0];
                    card.cardId = cardFetched._id;
                    Meteor.call('updateCard', card, (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            alert('Successfully updated!');
                            FlowRouter.go('/explore/chapters/module/' + this.state.moduleId + '/' + this.state.subjectName + '/' + this.state.cardId);

                        }
                    });

                } else {
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
                }
            }
        });


    };


    render() {
        return (
            <div className="home-page1 -padding-20">

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
                        <label htmlFor="name"><b>Sponsor Identifier</b></label>
                        <input style={{backgroundColor: "white"}} type="text" placeholder={this.state.cardName || 'id'} name="name"
                               onChange={this.handleChangeName}/>

                        <label htmlFor="key"><b>Logo URL</b></label>
                        <input style={{backgroundColor: "white"}} type="text" placeholder={this.state.sortKey || 'url'} name="name"
                               onChange={this.handleChangeKey}/>

                        <label htmlFor="key"><b>Visible In</b></label>
                        <Select multi={true} options={
                            this.state.subjects
                        } onChange={(values) => {
                            this.state.subjectPermissions = values;
                        }}/>
                    </form>
                    <button className="baton baton1 -center" onClick={this.handleMDSave} variant="outline-primary">Save</button>
                </div>


            </div>

        );
    }

}


export default Editor;
