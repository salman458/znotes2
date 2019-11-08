import React, {Component} from 'react';
import Header from '../Header.jsx';
import "../../../client/styles/cover.scss";
import "../../../client/styles/scroller.css";
import "../../../client/styles/boards.css";
import "../../../client/styles/chapter.css"
import "../../../client/styles/community.css"
import SideNav, {MenuIcon} from 'react-simple-sidenav';
import {Meteor} from "meteor/meteor";
import {Line, Circle} from 'rc-progress';
import Showdown from "showdown";
import parse from 'html-react-parser';
import Collapsible from 'react-collapsible';
import Popup from "reactjs-popup";
import {button} from 'reactstrap';
import {Carousel} from 'react-responsive-carousel';

const ReactMarkdown = require('react-markdown');
import ReactMde from "react-mde";


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
            isSponsor: false

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
        this.renderbutton = this.renderbutton.bind(this);
        this.addSubject = this.addSubject.bind(this);
        this.gradeHandler = this.gradeHandler.bind(this);
        this.confHandler = this.confHandler.bind(this);
        this.addHandler = this.addHandler.bind(this);


    }

    renderContent() {
        Meteor.call('loadCards', this.state.cardId, (err, card) => {
            if (err) {
                console.log(err)
            } else {
                if (card.length === 0) {
                    console.log('yashik')
                    Meteor.call('getSponsorCard', this.state.cardId, (err, add) => {
                        if (err)
                            console.log(err);
                        else {
                            this.setState({
                                card: add[0].content[this.getRandomInt(add[0].content.length)],
                                showNav: false,
                                showMD: true,
                                isSponsor: true
                            })
                        }
                    })
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
                        chapterName: this.state.chapterName

                    });
                }
                // this.setState({percentage: ((this.state.buttonCount.get(this.state.currentChapter)) * 1.0 / (this.state.totalCount)) * 100});

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
                position: uri,
                progress: this.state.progress,
                moduleName: this.state.moduleName,
            }
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
        })
    }

    addHandler(event) {
        let uri = '/explore/chapters/module/' + this.state.moduleId + '/' + this.state.subjectName + '/' + event.target.id;
        FlowRouter.go(uri);
        window.location.reload();
    }

    addCard(event) {
        FlowRouter.go('/explore/chapters/editor/' + this.state.moduleId + '/' + this.state.subjectName + '/' + event.target.id + '/' + 1);
    }

    componentDidMount() {
        Meteor.call('getAllSponsorCards', {}, (err, res) => {
            if (err)
                console.log(err);
            if (res) {
                let mapVal = 0;
                this.shuffle(res).forEach(record => {
                    if (record.subjects.includes(this.state.subjectName)) {
                        this.state.sponsorMapper.push(
                            <button className="nest" style={{
                                paddingTop: "1%",
                                paddingLeft: "1%",
                                color: "white",
                                fontSize: "large",
                                background: "transparent",
                                border: "none",
                                display: "block"
                            }} id={record.sponsor}
                                    onClick={this.addHandler}>{'Sponsor Content'}</button>
                        );
                        mapVal++;
                    }
                });
                console.log('jorik', this.state.sponsorMapper);
            }
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

                                                let counter = 0;
                                                chapters.forEach(chapter => {
                                                        counter++;
                                                        this.state.progressTracker.set(chapter._id, counter);
                                                        if (this.state.role || this.state.superSubjects.includes(this.state.subjectName)) {

                                                            this.state.chapters.push(
                                                                <li className='btn-group' id={chapter._id}>
                                                                    <ul>
                                                                        <Collapsible trigger={<p style={{fontSize: "large"}}><b>{chapter.name}</b></p>}>
                                                                            {this.insertTokenEveryN(chapter.cards.sort((a, b) => {
                                                                                console.log("cit", a.sortKey);
                                                                                return a.sortKey - b.sortKey
                                                                            }).map(card => {
                                                                                this.state.buttonCount.set(String(card._id), chapter._id);
                                                                                return <button className="nest" style={{
                                                                                    paddingTop: "1%",
                                                                                    paddingLeft: "1%",
                                                                                    color: "white",
                                                                                    fontSize: "large",
                                                                                    background: "transparent",
                                                                                    border: "none",
                                                                                    display: "block"
                                                                                }} id={card._id}
                                                                                               onClick={this.chapterHandler}>{card.title}</button>;
                                                                            }), this.state.sponsorMapper, this.state.everyN, false)
                                                                            }
                                                                            <br/>
                                                                            <button className="baton baton1" id={chapter._id} onClick={this.addCard}
                                                                                    variant="outline-primary">Add
                                                                                Card
                                                                            </button>
                                                                        </Collapsible>
                                                                    </ul>
                                                                </li>
                                                            );
                                                        } else {
                                                            this.state.chapters.push(
                                                                <li className='btn-group' id={chapter._id}>
                                                                    <ul>
                                                                        <Collapsible trigger={<p style={{fontSize: "large"}}><b>{chapter.name}</b></p>}>
                                                                            {
                                                                                this.insertTokenEveryN(chapter.cards.map(card => {
                                                                                    this.state.buttonCount.set(String(card._id), chapter._id);
                                                                                    return <button className="nest" style={{
                                                                                        paddingTop: "1%",
                                                                                        paddingLeft: "1%",
                                                                                        color: "white",
                                                                                        fontSize: "large",
                                                                                        background: "transparent",
                                                                                        border: "none",
                                                                                        display: "block"

                                                                                    }} id={card._id}
                                                                                                   onClick={this.chapterHandler}>{card.title}</button>;
                                                                                }),this.state.sponsorMapper,this.state.everyN,false)
                                                                            }
                                                                        </Collapsible>
                                                                    </ul>
                                                                </li>
                                                            );
                                                        }
                                                        let currChapter = this.state.progressTracker.get(this.state.buttonCount.get(this.state.cardId));
                                                        let total = this.state.progressTracker.size;
                                                        this.setState({progress: (currChapter / total) * 100});
                                                        this.forceUpdate();
                                                    }
                                                );


                                                if (this.state.role || this.state.superSubjects.includes(this.state.subjectName)) {
                                                    this.state.chapters.push(
                                                        <div>
                                                            {this.renderAddBoardPopUp()}
                                                        </div>
                                                    );
                                                }

                                                this.state.chapters.push(
                                                    <div>
                                                        {this.renderAddSubjectPopUp()}
                                                    </div>
                                                );
                                                this.forceUpdate();

                                                if (this.state.cardId != 1)
                                                    this.renderContent();
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
                                                    <Collapsible trigger={<p style={{fontSize: "large"}}><b>{chapter.name}</b></p>}>
                                                        {
                                                            this.insertTokenEveryN(chapter.cards.map(card => {
                                                            this.state.buttonCount.set(String(card._id), chapter._id);
                                                            return <button className="nest" style={{
                                                                paddingTop: "1%",
                                                                paddingLeft: "1%",
                                                                color: "white",
                                                                fontSize: "large",
                                                                background: "transparent",
                                                                border: "none",
                                                                display: "block"

                                                            }} id={card._id}
                                                                           onClick={this.chapterHandler}>{card.title}</button>;
                                                        }),this.state.sponsorMapper,this.state.everyN,false)

                                                        }
                                                    </Collapsible>
                                                </ul>
                                            </li>
                                        );


                                    }
                                );
                                let currChapter = this.state.progressTracker.get(this.state.buttonCount.get(this.state.cardId));
                                let total = this.state.progressTracker.size;
                                this.setState({progress: (currChapter / total) * 100});
                                this.forceUpdate();

                                // this.state.chapters.push(
                                //     <Line percent={this.state.progress} strokeWidth="4"
                                //           strokeColor="#66ff33"/>
                                // );

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

                }

            });
        });

    }


    renderBody() {
        return (
            <div>
                <MenuIcon className="mnu" onClick={() => this.setState({showNav: true})}/>
                <SideNav
                    titleStyle={{backgroundColor: '#383838'}}
                    itemStyle={{backgroundColor: '#282828', color: 'white', font: 'bold'}}
                    itemHoverStyle={{backgroundColor: '#383838', color: 'white', font: 'bold'}}
                    navStyle={{backgroundColor: '#282828'}}
                    showNav={this.state.showNav}
                    onHideNav={() => this.setState({showNav: false})}
                    title={
                        <div>
                            <h1>{this.state.moduleName}</h1>
                            <Line percent={this.state.progress} strokeWidth="4"
                                  strokeColor="#66ff33"/>
                        </div>
                    }
                    items={
                        this.state.chapters
                    }


                />
            </div>
        )
    }

    renderAddBoardPopUp() {
        return (
            <Popup className="dibil" trigger={this.renderbutton} modal>
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
            <Popup trigger={this.renderAddSubjectbutton} modal>
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
                <button onClick={this.handleSubmit} className="registerbtn">Add</button>
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
                <button onClick={this.addSubject} className="registerbtn">Add</button>
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


    renderbutton() {
        return (<button className="baton baton1">Add Chapter</button>);

    }

    renderAddSubjectbutton() {
        return (<button className="baton baton1">Add to My Subjects</button>);
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
            if (this.state.role || this.state.superSubjects.includes(this.state.subjectName)) {
                return (
                    <div className="home-page1 -padding-20">
                        <Header/>
                        {this.renderBody()}
                        <div className="chapterContainer">
                            {/*{parse(this.converter.makeHtml(this.state.card))}*/}
                            <ReactMde
                                className='mdegago'
                                value={this.state.card}
                                generateMarkdownPreview={markdown => {

                                    return Promise.resolve(this.converter.makeHtml(markdown))
                                }

                                }
                                selectedTab={"preview"}
                            />
                            <ul style={{display: "inline-table", visibility: this.state.isSponsor?'hidden':'visible'}} className="cardEditor">
                                <li>
                                    <button className="baton baton1" onClick={this.editHandler}>Edit</button>
                                </li>
                                <li>
                                    <button className="baton baton1" onClick={this.deleteHandler}>Delete</button>
                                </li>
                            </ul>
                        </div>
                        {this.renderFooter()}

                    </div>
                )
            } else {
                return (
                    <div className="home-page1 -padding-20">
                        <Header/>
                        {this.renderBody()}
                        <div className="chapterContainer">
                            {/*{parse(this.converter.makeHtml(this.state.card))}*/}
                            <ReactMde
                                className="mdegago"
                                value={this.state.card}
                                generateMarkdownPreview={markdown => {

                                    return Promise.resolve(this.converter.makeHtml(markdown))
                                }

                                }
                                selectedTab={"preview"}
                            />
                        </div>
                        {this.renderFooter()}
                    </div>
                )
            }

        } else {
            return (
                <div className="home-page1 -padding-20">
                    <Header/>
                    {this.renderBody()}
                    <div style={{height: "500px"}}></div>
                </div>
            )
        }

    }

    renderFooter() {
        return (
            <div>

                <ul className="social">
                    <li className="team"><p>Made with love by ZNotes team</p></li>
                    <li>
                        <a href="https://www.facebook.com/" target="_blank">
                            <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="team-dark" transform="translate(-759.000000, -2361.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                        <g id="footer" transform="translate(71.000000, 2361.000000)">
                                            <g id="Group-3" transform="translate(688.000000, 0.000000)">
                                                <g id="socialmedia">
                                                    <g id="facebook" transform="translate(0.000000, 0.952381)">
                                                        <path
                                                            d="M33.7857402,0 L5.26178332,0 C2.35583847,0 0,2.35572566 0,5.26174471 L0,33.7856833 C0,36.6917023 2.35574295,39.047428 5.26178332,39.047428 L19.3296628,39.047428 L19.3536386,25.0939898 L15.7285149,25.0939898 C15.2574045,25.0939898 14.8750333,24.7130542 14.8732184,24.2419473 L14.8558335,19.7441752 C14.8540186,19.2704893 15.2375361,18.8855418 15.7112255,18.8855418 L19.3297583,18.8855418 L19.3297583,14.5395518 C19.3297583,9.49607131 22.4100293,6.749858 26.9091716,6.749858 L30.6010646,6.749858 C31.0734168,6.749858 31.4564566,7.13279954 31.4564566,7.60524375 L31.4564566,11.3977882 C31.4564566,11.8700414 31.0737033,12.2528874 30.6015422,12.253174 L28.3358757,12.2542247 C25.8891011,12.2542247 25.4153161,13.4168998 25.4153161,15.1231818 L25.4153161,18.8856373 L30.7917248,18.8856373 C31.3040048,18.8856373 31.7014684,19.3329596 31.641099,19.8417016 L31.1079954,24.3394737 C31.0569871,24.7698889 30.6920007,25.0941808 30.2586212,25.0941808 L25.4392919,25.0941808 L25.4153161,39.047619 L33.7859312,39.047619 C36.6918761,39.047619 39.047619,36.6918934 39.047619,33.7859699 L39.047619,5.26174471 C39.0475235,2.35572566 36.6917806,0 33.7857402,0 Z"
                                                            id="Path"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/" target="_blank">
                            <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="team-dark" transform="translate(-839.000000, -2361.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                        <g id="footer" transform="translate(71.000000, 2361.000000)">
                                            <g id="Group-3" transform="translate(688.000000, 0.000000)">
                                                <g id="socialmedia">
                                                    <g id="instagram" transform="translate(80.000000, 0.000000)">
                                                        <g id="Group-15">
                                                            <path
                                                                d="M28.0837843,0 L11.9162157,0 C5.34558666,0 0,5.34558666 0,11.9162157 L0,28.0837843 C0,34.6544133 5.34558666,40 11.9162157,40 L28.0837843,40 C34.6544133,40 40,34.6544133 40,28.0837843 L40,11.9162157 C39.9999274,5.34558666 34.6543407,0 28.0837843,0 Z M35.9760015,28.0837843 C35.9760015,32.442499 32.442499,35.9760015 28.0837843,35.9760015 L11.9162157,35.9760015 C7.55750099,35.9760015 4.02399852,32.442499 4.02399852,28.0837843 L4.02399852,11.9162157 C4.02399852,7.5574284 7.55750099,4.02399852 11.9162157,4.02399852 L28.0837843,4.02399852 C32.442499,4.02399852 35.9760015,7.5574284 35.9760015,11.9162157 L35.9760015,28.0837843 Z"
                                                                id="Shape"></path>
                                                            <path
                                                                d="M20,9.56521739 C14.2462516,9.56521739 9.56521739,14.2462681 9.56521739,19.9999634 C9.56521739,25.7536587 14.2462516,30.4347826 20,30.4347826 C25.7537484,30.4347826 30.4347826,25.7537319 30.4347826,19.9999634 C30.4347826,14.2461948 25.7537484,9.56521739 20,9.56521739 Z M20,26.3760855 C16.4785894,26.3760855 13.6239735,23.5214595 13.6239735,20.0000366 C13.6239735,16.4786137 16.4786627,13.6239877 20,13.6239877 C23.5214106,13.6239877 26.3760265,16.4786137 26.3760265,20.0000366 C26.3760265,23.5213863 23.5213373,26.3760855 20,26.3760855 Z"
                                                                id="Shape"></path>
                                                            <circle id="Oval" cx="30.4347826" cy="9.56521739" r="2.60869565"></circle>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="https://discordapp.com" target="_blank">
                            <svg width="56px" height="41px" viewBox="0 0 56 41" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="team-dark" transform="translate(-1106.000000, -2361.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                        <g id="footer" transform="translate(71.000000, 2361.000000)">
                                            <g id="Group-3" transform="translate(688.000000, 0.000000)">
                                                <g id="Discord" transform="translate(347.000000, 0.000000)">
                                                    <path
                                                        d="M48.3636364,5.125 C48.3636364,5.125 42.5269091,0.5253125 35.6363636,0 L35.0152727,1.25178125 C41.244,2.788 44.1025455,4.9840625 47.0909091,7.6875 C41.9401818,5.0404375 36.8581818,2.5625 28,2.5625 C19.1418182,2.5625 14.0598182,5.0404375 8.90909091,7.6875 C11.8974545,4.9840625 15.2981818,2.542 20.9847273,1.25178125 L20.3636364,0 C13.1345455,0.68546875 7.63636364,5.125 7.63636364,5.125 C7.63636364,5.125 1.11872727,14.6395625 0,33.3125 C6.56727273,40.9397813 16.5454545,41 16.5454545,41 L18.6327273,38.20175 C15.0894545,36.9615 11.0930909,34.7487813 7.63636364,30.75 C11.7574545,33.8890625 17.9772727,37.15625 28,37.15625 C38.0227273,37.15625 44.2425455,33.8890625 48.3636364,30.75 C44.9081818,34.7487813 40.9118182,36.9615 37.3672727,38.20175 L39.4545455,41 C39.4545455,41 49.4327273,40.9397813 56,33.3125 C54.8812727,14.6395625 48.3636364,5.125 48.3636364,5.125 Z M19.7272727,28.1875 C17.2658182,28.1875 15.2727273,25.8940625 15.2727273,23.0625 C15.2727273,20.2309375 17.2658182,17.9375 19.7272727,17.9375 C22.1887273,17.9375 24.1818182,20.2309375 24.1818182,23.0625 C24.1818182,25.8940625 22.1887273,28.1875 19.7272727,28.1875 Z M36.2727273,28.1875 C33.8112727,28.1875 31.8181818,25.8940625 31.8181818,23.0625 C31.8181818,20.2309375 33.8112727,17.9375 36.2727273,17.9375 C38.7341818,17.9375 40.7272727,20.2309375 40.7272727,23.0625 C40.7272727,25.8940625 38.7341818,28.1875 36.2727273,28.1875 Z"
                                                        id="surface1"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>

                    </li>
                    <li>
                        <a href="https://www.twitter.com/" target="_blank">
                            <svg width="47px" height="40px" viewBox="0 0 47 40" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="team-dark" transform="translate(-1018.000000, -2362.000000)" fill="#FFFFFF" fill-rule="nonzero">
                                        <g id="footer" transform="translate(71.000000, 2361.000000)">
                                            <g id="Group-3" transform="translate(688.000000, 0.000000)">
                                                <g id="socialmedia">
                                                    <g id="twitter" transform="translate(259.000000, 1.000000)">
                                                        <path
                                                            d="M42.7068181,5.63396897 C43.9237893,4.47068817 44.8387932,3.01567156 45.3550047,1.39161071 C45.5023474,0.927969374 45.0017235,0.527047233 44.585523,0.77529163 C43.0490628,1.6920448 41.3940458,2.37978135 39.6663245,2.81961686 C39.566086,2.84513945 39.4626616,2.85807242 39.3588959,2.85807242 C39.0441856,2.85807242 38.7382361,2.74053116 38.4975953,2.52719434 C36.6593954,0.897525386 34.2951992,0 31.840663,0 C30.7785439,0 29.7061848,0.166526325 28.6532818,0.49500093 C25.3910345,1.5128144 22.8739204,4.21969695 22.0841862,7.55937952 C21.7879079,8.81204662 21.7076943,10.0658582 21.8455935,11.2859068 C21.8614086,11.4261093 21.7955311,11.523965 21.7549123,11.5698599 C21.6835734,11.650319 21.5824246,11.6964428 21.4774073,11.6964428 C21.4656882,11.6964428 21.4536277,11.6958705 21.441681,11.694726 C14.3007365,11.0273618 7.861348,7.56670439 3.30965292,1.95036089 C3.07754548,1.66388983 2.63244534,1.69902631 2.44744206,2.01823038 C1.556104,3.55645293 1.08506243,5.31579496 1.08506243,7.10603879 C1.08506243,9.84966013 2.18085984,12.4352245 4.0842546,14.3201194 C3.28382528,14.129215 2.50910982,13.828552 1.78946299,13.4264853 C1.44130184,13.2319185 1.01292708,13.4819941 1.00803462,13.8825729 C0.958199792,17.9584048 3.33047432,21.5851307 6.88422121,23.2182332 C6.81265475,23.21995 6.74108829,23.2207512 6.66940805,23.2207512 C6.10609241,23.2207512 5.53572252,23.1660435 4.9743411,23.0581162 C4.58226158,22.9828074 4.25287382,23.3569479 4.37461645,23.739329 C5.52809938,27.3618202 8.62878166,30.031964 12.3393148,30.6382113 C9.2597953,32.717673 5.67362164,33.8145722 1.94112927,33.8145722 L0.777520082,33.8138855 C0.419005116,33.8138855 0.115786333,34.048968 0.0244224751,34.3982727 C-0.0655760454,34.7423127 0.100198726,35.1052371 0.405920628,35.2841241 C4.6118439,37.7463102 9.4092998,39.047619 14.2817355,39.047619 C18.5467096,39.047619 22.5362269,38.1962174 26.139581,36.5172201 C29.4429022,34.9779675 32.3619945,32.7776454 34.8157342,29.9773708 C37.1015373,27.3688017 38.8889922,24.3574793 40.1282638,21.0271817 C41.3096224,17.852652 41.9340369,14.4653578 41.9340369,11.231428 L41.9340369,11.0773769 C41.9339231,10.5581123 42.1673959,10.0695207 42.5747217,9.73692581 C44.1203979,8.47453038 45.4663935,6.98849753 46.5751616,5.3201441 C46.8679128,4.87962189 46.4062011,4.32750987 45.9244644,4.542449 C44.887604,5.00494582 43.8112627,5.36981587 42.7068181,5.63396897 Z"
                                                            id="Path"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/" target="_blank">
                            <svg width="59px" height="40px" viewBox="0 0 59 40" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                 xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="team-dark" transform="translate(-919.000000, -2361.000000)" fill="#DA1D56" fill-rule="nonzero">
                                        <g id="footer" transform="translate(71.000000, 2361.000000)">
                                            <g id="Group-3" transform="translate(688.000000, 0.000000)">
                                                <g id="socialmedia">
                                                    <g id="youtube" transform="translate(160.952381, 0.000000)">
                                                        <path
                                                            d="M45.275018,0 L11.8678391,0 C5.31340651,0 0,5.2561493 0,11.7399514 L0,28.2600486 C0,34.7438507 5.31340651,40 11.8678391,40 L45.275018,40 C51.8294506,40 57.1428571,34.7438507 57.1428571,28.2600486 L57.1428571,11.7399514 C57.1428571,5.2561493 51.8294506,0 45.275018,0 Z M37.2488811,20.8037619 L21.6232565,28.1759325 C21.2068954,28.3723668 20.7259544,28.0720749 20.7259544,27.6158128 L20.7259544,12.4106727 C20.7259544,11.9479118 21.2195387,11.6479878 21.6367674,11.8571744 L37.2623921,19.690144 C37.7269712,19.9229958 37.7189142,20.5820683 37.2488811,20.8037619 Z"
                                                            id="Shape"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </a>

                    </li>
                    <li className="term"><p><a>Terms of Use </a> Copyright @ 2019 ZNotes</p></li>
                </ul>
            </div>
        )
    }


    shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    insertTokenEveryN = (arr, token, n, fromEnd) => {
        let a = arr.slice(0);
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
