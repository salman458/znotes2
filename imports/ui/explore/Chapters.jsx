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
            haveSubjects: []

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
        this.editHandler = this.editHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.addSubject = this.addSubject.bind(this);
        this.gradeHandler = this.gradeHandler.bind(this);
        this.confHandler = this.confHandler.bind(this);


    }

    renderContent() {
        Meteor.call('loadCards', this.state.cardId, (err, card) => {
            if (err) {
                console.log(err)
            } else {
                this.state.card = card[0].content;
                console.log(this.state);
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

            }
        });
    }


    chapterHandler(event) {
        let chapterId = this.state.buttonCount.get(event.target.id);
        let newProgress = this.state.progressTracker.get(chapterId);
        this.setState({progress: newProgress});
        let uri = '/explore/chapters/module/' + this.state.moduleId + '/' + this.state.subjectName + '/' + event.target.id;
        let obj = {
            userId: Meteor.userId(), subject: {
                id: this.state.subjectName,
                position: uri
            }
        };
        console.log("asfasdasas",obj);
        Meteor.call('addLastPosition', obj,(err,res)=>{
            if(err) {
                console.log(err);
                // FlowRouter.go(uri);
                // window.location.reload();
            }else {
                console.log("aaaaaaaaaaaaaa");
                FlowRouter.go(uri);
                window.location.reload();
            }
        })
    }

    renderCollapseButton() {
        return (
            <span> <Button variant="outline-primary">Cards</Button></span>

        )
    }

    addCard(event) {
        FlowRouter.go('/explore/chapters/editor/' + this.state.moduleId + '/' + this.state.subjectName + '/' + event.target.id + '/' + 1);
    }

    componentDidMount() {
        Meteor.call('loadModules', {_id: this.state.moduleId}, (err, zModule) => {
            if (err)
                console.log(err);
            else {
                this.state.moduleName = zModule[0].name;
                Meteor.call('loadChapters', {_id: {$in: zModule[0].chapters.map(chapter => chapter._id)}}, (err, chapters) => {
                    if (err)
                        console.log(err);
                    else {
                        if (Meteor.userId()) {
                            Meteor.call('findUserRole', Meteor.userId(), (err, role) => {
                                if (err)
                                    console.log(err);
                                else {
                                    if (role[0].role === 'team') {
                                        this.setState({role: true});
                                    }

                                    Meteor.call('findUserSubjects', Meteor.userId(), (err, res) => {
                                        if (err)
                                            console.log(err);
                                        else {
                                            this.setState({superSubjects: res[0].sucjects.map(x => x.value)});

                                            this.state.totalCount = chapters.length;
                                            this.state.chapters.push(
                                                <Line percent={66.6} strokeWidth="4"
                                                      strokeColor="#66ff33"/>
                                            );
                                            let counter = 0;
                                            chapters.forEach(chapter => {
                                                    counter++;
                                                    this.state.progressTracker.set(chapter._id, counter);
                                                    if (Meteor.user()) {
                                                        this.state.chapters.push(
                                                            // onClick={this.chapterHandler}
                                                            <li className='btn-group' id={chapter._id}>
                                                                <ul>
                                                                    {chapter.name}
                                                                    <Collapsible trigger={this.renderCollapseButton()}>
                                                                        <Button id={chapter._id} onClick={this.addCard} variant="outline-primary">Add
                                                                            Card</Button>

                                                                        {chapter.cards.map(card => {
                                                                            this.state.buttonCount.set(card._id, chapter._id);
                                                                            return <Button id={card._id}
                                                                                           onClick={this.chapterHandler}>{card.title}</Button>;
                                                                        })}
                                                                    </Collapsible>
                                                                </ul>
                                                            </li>
                                                        );
                                                        this.forceUpdate();
                                                    } else {
                                                        this.state.chapters.push(
                                                            // onClick={this.chapterHandler}
                                                            <li className='btn-group' id={chapter._id}>
                                                                <ul>
                                                                    {chapter.name}
                                                                    <Collapsible trigger={this.renderCollapseButton()}>
                                                                        {chapter.cards.map(card => {
                                                                            this.state.buttonCount.set(card._id, chapter._id);
                                                                            return <Button id={card._id}
                                                                                           onClick={this.chapterHandler}>{card.title}</Button>;
                                                                        })}
                                                                    </Collapsible>
                                                                </ul>
                                                            </li>
                                                        );
                                                    }
                                                }
                                            );
                                            if (this.state.role) {
                                                this.state.chapters.push(
                                                    <div>
                                                        {this.renderAddBoardPopUp()}
                                                    </div>
                                                );
                                                this.forceUpdate();
                                            }
                                            if (this.state.cardId != 1)
                                                this.renderContent();
                                            if (Meteor.user()) {
                                                Meteor.call("getUserSubjects", Meteor.userId(), (err, res) => {
                                                    if (err)
                                                        console.log(err);
                                                    else {
                                                        if (!res[0].subjects.map(x => x.id).includes(this.state.subjectName)) {
                                                            this.state.chapters.push(
                                                                <div>
                                                                    {this.renderAddSubjectPopUp()}
                                                                </div>
                                                            );
                                                            this.forceUpdate();
                                                        }

                                                    }
                                                });

                                            }


                                        }
                                    });
                                }
                            });
                        } else {
                            let counter = 0;
                            chapters.forEach(chapter => {

                                    counter++;
                                    this.state.progressTracker.set(chapter._id, counter);
                                    this.state.chapters.push(
                                        // onClick={this.chapterHandler}
                                        <li className='btn-group' id={chapter._id}>
                                            <ul>
                                                {chapter.name}
                                                <Collapsible trigger={this.renderCollapseButton()}>
                                                    {chapter.cards.map(card => {
                                                        this.state.buttonCount.set(card._id, chapter._id);
                                                        return <Button id={card._id}
                                                                       onClick={this.chapterHandler}>{card.title}</Button>;
                                                    })}
                                                </Collapsible>
                                            </ul>
                                        </li>
                                    );

                                }
                            );
                            if (Meteor.user()) {
                                this.state.chapters.push(
                                    <div>
                                        {this.renderAddBoardPopUp()}
                                    </div>
                                );
                            }
                            if (this.state.cardId != 1)
                                this.renderContent();


                        }


                    }
                    this.setState({showNav: true});
                });
                console.log('state', this.state);
            }
        });
    }


    renderBody() {
        return (
            <div>
                <MenuIcon onClick={() => this.setState({showNav: true})}/>
                <SideNav
                    titleStyle={{backgroundColor: '#383838'}}
                    itemStyle={{backgroundColor: '#282828', color: 'white', font: 'bold'}}
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

    renderAddSubjectPopUp() {
        return (
            <Popup trigger={this.renderAddSubjectButton} modal>
                {close => (
                    <div className="modal">
                        <a className="close" onClick={close}>
                            &times;
                        </a>
                        {this.renderSubjectEdit()}
                    </div>
                )}


            </Popup>
        );
    }

    renderEdit() {
        return (
            <div className="container">
                <form className="login">
                    <label htmlFor="name"><b>New Chapter Name</b></label>
                    <input type="text" placeholder="Enter the Name" name="name" onChange={this.handleChapterName}/>
                </form>
                <Button onClick={this.handleSubmit} className="registerbtn">Add</Button>
            </div>
        );
    }

    gradeHandler(event) {
        this.setState({grade: event.target.value})
    }

    confHandler(event) {
        this.setState({conf: event.target.value})
    }

    renderSubjectEdit() {
        return (
            <div className="container">
                <form className="login">
                    <label htmlFor="name"><b>Add to My Subjects</b></label>
                    <input type="text" placeholder="What is your target grade?" name="grade" onChange={this.gradeHandler}/>
                    <input type="text" placeholder="How confident are you about it (1-5)?" name="confidence" onChange={this.confHandler}/>
                </form>
                <Button onClick={this.addSubject} className="registerbtn">Add</Button>
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
        Meteor.call('addChapter', chapter, (err, id) => {
            if (err)
                console.log(err);
            else {
                let chapterMod = {
                    name: chapter.name,
                    created: chapter.created,
                    cards: chapter.cards,
                    _id: id
                };
                Meteor.call('updateChapter', {moduleId: this.state.moduleId, chapter: chapterMod}, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        FlowRouter.go('/explore/chapters/module/' + this.state.moduleId + '/' + this.state.subjectName + '/' + 1);
                        window.location.reload();
                    }
                });

            }
        });
    }


    renderButton() {
        return (<Button>Add Chapter</Button>);

    }

    renderAddSubjectButton() {
        return (<Button>Add to My Subjects</Button>);
    }

    editHandler() {
        let chapterId = this.state.buttonCount.get(this.state.cardId);
        FlowRouter.go('/explore/chapters/editor/' + this.state.moduleId + '/' + this.state.subjectName + '/' + chapterId + '/' + this.state.cardId);
    }

    deleteHandler() {
        console.log('bbbb', this.state.cardId);
        Meteor.call('deleteCard', this.state.cardId, (err, res) => {
            if (err)
                console.log(err);
            else {
                Meteor.call('removeCardRef', {
                    chapterId: this.state.buttonCount.get(this.state.cardId),
                    cardId: this.state.cardId
                }, (err, res) => {
                    if (err)
                        console.log(err);
                    else {
                        FlowRouter.go('/explore/chapters/module/' + this.state.moduleId + '/' + this.state.subjectName + '/' + 1);
                        window.location.reload();
                    }
                });
            }
        });
    }

    addSubject() {
        let userId = Meteor.userId();
        let dbObject = {
            userId: userId,
            subject: {
                id: this.state.subjectName,
                targetGrade: this.state.grade,
                confidence: this.state.conf
            }

        };
        console.log("ppppp", dbObject);
        Meteor.call('addSubjectToUser', dbObject, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    window.location.reload();
                }
            }
        );
    }

    render() {
        if (this.state.showMD) {
            if (Meteor.user()) {
                return (
                    <div className="home-page -padding-20">
                        <Header/>
                        {this.renderBody()}
                        <div className="chapterContainer">
                            <div>
                                <ul className="cardEditor">
                                    <li><Button onClick={this.editHandler}>Edit</Button></li>
                                    <li><Button onClick={this.deleteHandler}>Delete</Button></li>
                                </ul>
                                {parse(this.converter.makeHtml(this.state.card))}
                            </div>
                        </div>
                        )
                        )}

                    </div>
                )
            } else {
                return (
                    <div className="home-page -padding-20">
                        <Header/>
                        {this.renderBody()}
                        <div className="chapterContainer">
                            <div>
                                {parse(this.converter.makeHtml(this.state.card))}
                            </div>
                        </div>
                        )
                        )}

                    </div>
                )
            }

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
