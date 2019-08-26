import React, {Component} from 'react';
import Header from '../Header.jsx';
import "../../../client/styles/cover.scss";
import "../../../client/styles/scroller.css";
import "../../../client/styles/boards.css";
import SideNav, {MenuIcon} from 'react-simple-sidenav';
import {Meteor} from "meteor/meteor";
import ReactMarkdown from "react-markdown/with-html";

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
            cards: []
        };


        this.chapterHandler = this.chapterHandler.bind(this);

    }


    chapterHandler(event) {
        Meteor.call('loadChapters', {_id: event.target.id}, (err, chapter) => {
            if (err)
                console.log(err);
            else {
                chapter[0].cards.forEach(card => {
                    this.state.cards.push(card.content);
                });
                this.setState({
                    moduleId: this.state.moduleId,
                    subjectName: this.state.subjectName,
                    moduleName: this.state.moduleName,
                    chapters: this.state.chapters,
                    showNav: false,
                    showMD: true,
                    cards: this.state.cards
                });

                console.log(this.state);
            }
        })
    }

    componentDidMount() {
        Meteor.call('loadModules', {_id: this.state.moduleId}, (err, zModule) => {
            if (err)
                console.log(err);
            else {
                this.state.moduleName = zModule[0].name;
                Meteor.call('loadChapters', {_id: {$in: zModule[0].chapters}}, (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(res);
                            this.state.chapters = res.map(chapter => {
                                    return <button id={chapter._id} onClick={this.chapterHandler}> {chapter.name}</button>
                                }
                            );
                            this.state.chapters.push(
                                <div>
                                    {this.renderButton()}
                                </div>
                            )
                        }
                    }
                );
            }
        })


    }


    renderBody() {
        return (
            <div>
                <MenuIcon onClick={() => this.setState({showNav: true})}/>
                <SideNav
                    showNav={this.state.showNav}
                    onHideNav={() => this.setState({showNav: false})}
                    title={this.state.moduleName}
                    items={
                        this.state.chapters
                    }


                />
            </div>
        )
    }


    renderButton() {
        return (<a href={"/explore/chapters/editor/" + this.state.moduleId + "/" + this.state.subjectName} className="button">
            <span>Add Chapter</span>
            <svg>
                <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
            </svg>
        </a>);

    }

    render() {
        if (this.state.showMD) {
            return (
                <div className="home-page -padding-20">
                    <Header/>
                    {this.renderBody()}
                    {this.state.cards.map(card => {
                        return (
                            <div className="container">
                            <ReactMarkdown source={card} escapeHtml={false}/>
                            </div>
                            )
                    })}

                </div>
            )
        } else {
            return (
                <div className="home-page -padding-20">
                    <Header/>
                    {this.renderBody()}
                </div>
            )
        }

    }

}


export default Subject;
