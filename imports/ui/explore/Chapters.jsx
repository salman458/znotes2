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
import Collapsible from 'react-collapsible';
import Popup from "reactjs-popup";
import {Button} from 'reactstrap';

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
            percentage: 0,
            chapterName: ''
        };
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        });

        this.chapterHandler = this.chapterHandler.bind(this);
        this.handleChapterName = this.handleChapterName.bind(this);
        this.addCard = this.addCard.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }


    chapterHandler(event) {
        this.setState({currentChapter: event.target.id});

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
                    currentChapter: this.state.currentChapter,
                    percentage: this.state.percentage,
                    chapterName: this.state.chapterName

                });
                this.setState({percentage: ((this.state.buttonCount.get(this.state.currentChapter)) * 1.0 / (this.state.totalCount)) * 100});


                console.log(this.state);
            }
        })
    }

    renderCollapseButton() {
        return (
            <span> <Button variant="outline-primary">Cards</Button></span>

        )
    }

    addCard(event) {
        FlowRouter.go('/explore/chapters/editor/' + this.state.moduleId + '/' + this.state.subjectName + '/' + event.target.id);
    }

    componentDidMount() {
        Meteor.call('loadModules', {_id: this.state.moduleId}, (err, zModule) => {
            if (err)
                console.log(err);
            else {
                this.state.moduleName = zModule[0].name;
                console.log(zModule[0]);
                Meteor.call('loadChapters', {_id: {$in: zModule[0].chapters}}, (err, res) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(res);
                            let count = 0;
                            res.forEach(chapter => {
                                    console.log(chapter.cards);
                                    count++;
                                    this.state.buttonCount.set(chapter._id, count);
                                    this.state.chapters.push(
                                        <li className='btn-group' id={chapter._id} onClick={this.chapterHandler}>
                                            {chapter.name}
                                            {chapter.cards.map(card=>{
                                                return <li key={card.name}>{card.name}</li>;
                                            })}
                                            <Collapsible trigger={this.renderCollapseButton()}>
                                                <Button id={chapter._id} onClick={this.addCard} variant="outline-primary">Add Card</Button>
                                            </Collapsible>
                                        </li>
                                    );
                                }
                            );
                            this.state.totalCount = count;

                            this.state.chapters.push(
                                <Line percent={66.6} strokeWidth="4"
                                      strokeColor="rgb(218, 29, 86)"/>
                            );

                            this.state.chapters.push(
                                <div>
                                    {this.renderAddBoardPopUp()}
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

    renderAddBoardPopUp() {
        return (
            <Popup trigger={this.renderButton} modal>
                {close => (
                    <div className="modal">
                        <a className="close" onClick={close}>
                            &times;
                        </a>
                        {this.renderEdit()}
                    </div>
                )}


            </Popup>
        );
    }

    renderEdit() {
        return (
            <div className="container">
                <form className="login" onSubmit={this.handleSubmit}>
                    <label htmlFor="name"><b>New Chapter Name</b></label>
                    <input type="text" placeholder="Enter the Name" name="name" onChange={this.handleChapterName}/>
                    <button type="submit" className="registerbtn">Add</button>

                </form>
            </div>
        );
    }

    handleChapterName(event) {
        this.state.chapterName = event.target.value;
    }

    handleSubmit() {
        let chapter = {
            name: this.state.chapterName,
            created: new Date(),
            cards: []
        };
        console.log(chapter);
        Meteor.call('addChapter', chapter, (err, id) => {
            if (err)
                console.log(err);
            else {
                Meteor.call('updateChapter', {moduleId: this.state.moduleId, chapterId: id}, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        FlowRouter.go('/explore/chapters/module/' + this.state.moduleId + '/' + this.state.subjectName);
                    }
                });

            }
        });
    }


    renderButton() {
        return (<div className="button">
            <span>Add Chapter</span>
            <svg>
                <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
            </svg>
        </div>);

    }


    // renderButton() {
    //     return (<a href={"/explore/chapters/editor/" + this.state.moduleId + "/" + this.state.subjectName} className="button">
    //         <span>Add Chapter</span>
    //         <svg>
    //             <polyline className="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
    //             <polyline className="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
    //         </svg>
    //     </a>);
    //
    // }

    render() {
        if (this.state.showMD) {
            return (
                <div className="home-page -padding-20">
                    <Header/>
                    {this.renderBody()}
                    {this.state.cards.map(card => {
                        return (
                            <div className="chapterContainer">
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
