import React, {Component} from 'react';
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";
import Header from '../Header.jsx';


class Editor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            value: "**Hello world!!!**",
            tab: "write",
            moduleId: props.moduleId,
            subjectName: props.subjectName
        };
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        });
    }


    handleValueChange = (value: string) => {
        this.setState({value});
    };

    handleTabChange = (tab: "write" | "preview") => {
        this.setState({tab});
    };

    handleMDSave = () => {
        let card = {
            title: 'Some chapter',
            content: this.state.value,
            data_created: new Date(),
            data_updated: '',
            author: ''
        };
        let cardsPopulated = [];
        cardsPopulated.push(card);
        let chapter = {
            name: 'Some name',
            cards: cardsPopulated
        };
        Meteor.call('addChapter', chapter, (err, res) => {
            if (err)
                console.log(err);
            else {
                Meteor.call('updateChapter', {moduleId: this.state.moduleId, chapterId: res}, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        alert('Successfully added new chapter');
                        FlowRouter.go('/explore/chapters/module/' + this.state.moduleId + '/' + this.state.subjectName);
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
                <div className="container">
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
                    {this.renderButton()}
                </div>


            </div>

        );
    }

}


export default Editor;
