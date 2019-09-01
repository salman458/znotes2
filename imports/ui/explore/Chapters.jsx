import React, {Component} from 'react';
import Header from '../Header.jsx';
import "../../../client/styles/cover.scss";
import "../../../client/styles/scroller.css";
import "../../../client/styles/boards.css";
import "../../../client/styles/chapter.css"
import SideNav, {MenuIcon} from 'react-simple-sidenav';
import {Meteor} from "meteor/meteor";
import {Line, Circle} from 'rc-progress';
import Showdown from "showdown";
import parse from 'html-react-parser';


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
            cards: [],
            buttonCount: new Map(),
            totalCount: '',
            currentChapter: 1,
            percentage: 0
        };
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        });

        this.chapterHandler = this.chapterHandler.bind(this);

    }


    chapterHandler(event) {
        this.setState({percentage: ((this.state.buttonCount.get(event.target.id)) / (this.state.totalCount)) * 100});
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
                    cards: this.state.cards,
                    buttonCount: this.state.buttonCount,
                    totalCount: this.state.totalCount,
                    currentChapter: this.state.currentChapter
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
                            let count = 0;
                            res.forEach(chapter => {
                                    count++;
                                    this.state.buttonCount.set(chapter._id, count);
                                    this.state.chapters.push(<li className='btn-group' id={chapter._id} onClick={this.chapterHandler}> {chapter.name}</li>);
                                }
                            );
                            this.state.totalCount = count;

                            this.state.chapters.push(
                                <div>
                                    <Line percent={this.state.percentage} strokeWidth="4"
                                          strokeColor="rgb(218, 29, 86)"/>
                                </div>
                            );

                            this.state.chapters.push(
                                <div>
                                    {this.renderButton()}
                                </div>
                            );

                            console.log(this.state);
                        }
                        this.setState({showNav: true});
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
                    titleStyle={{backgroundColor: '#383838'}}
                    itemStyle={{backgroundColor: '#282828'}}
                    navStyle={{backgroundColor: '#282828'}}
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
                                <div>
                                    {parse(this.converter.makeHtml(card))}
                                </div>
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
