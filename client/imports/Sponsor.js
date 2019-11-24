import React, { Component } from 'react';
import ReactMde from 'react-mde';
import Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import '../styles/editor.css';
import Select from 'react-dropdown-select';

import { Meteor } from 'meteor/meteor';
import Header from './Header';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '**Hello world!!!**',
      tab: 'write',
      id: props.id || undefined,
      logo: '',
      subjects: '',
      subjectPermissions: [],
      isNew: false,
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
    });
  }

  componentDidMount() {
    if (this.state.id && parseInt(this.state.id) !== 1) {
      console.log('valod', this.state.id);
      Meteor.call('getSponsorCard', this.state.id, (err, res) => {
        if (err) { console.log(err); } else {
          const record = res[0];
          this.setState({ logo: record.logo });
          this.setState({ subjectPermissions: record.subjects });
        }
      });
    }

    Meteor.call('getAllSubjects', {}, (err, res) => {
      if (err) { console.log(err); } else {
        this.setState({
          subjects: res.map((subject) => ({
            label: subject.name,
            value: subject._id,
          })),
        });
      }
    });
  }

    checkBoxHandler = (event) => {
      this.setState({
        isNew: !this.state.isNew,
      });
    };

    handleChangeId = (event) => {
      this.setState({
        id: event.target.value,
      });
    };

    handleChangeLogo = (event) => {
      this.setState({
        logo: event.target.value,
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
        title: 'Sponsor Content',
        sponsor: this.state.id,
        logo: this.state.logo,
        content: [this.state.value],
        created: new Date(),
        subjects: this.state.subjectPermissions.filter((x) => x !== undefined),
        isNew: this.state.isNew,
      };

      Meteor.call('addSponsorContent', card, (err, res) => {
        if (err) { console.log(err); } else {
          alert('Success!');
        }
      });
    };

    render() {
      return (
        <div className="home-page1 -padding-20">

          <Header />

          <div style={{ visibility: this.state.isNew ? 'visible' : 'hidden' }} className="customContainer">
            <ReactMde
              onChange={this.handleValueChange}
              onTabChange={this.handleTabChange}
              value={this.state.value}
              generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
              selectedTab={this.state.tab}
            />

          </div>
          <div className="customContainer -full-width -outer-center">
            <form>
              <label htmlFor="name"><b>New Card</b></label>
              <br />
              <input onChange={this.checkBoxHandler} type="checkbox" name="vehicle1" value="true" />
              <br />
              <br />
              <br />

              <label htmlFor="name"><b>Sponsor Identifier</b></label>
              <input
                style={{ backgroundColor: 'white' }}
                type="text"
                placeholder={this.state.id || 'id (input unique identifier for the sponsor)'}
                name="name"
                onChange={this.handleChangeId}
              />

              <label htmlFor="key"><b>Logo URL</b></label>
              <input
                style={{ backgroundColor: 'white' }}
                type="text"
                placeholder={this.state.logo || 'url'}
                name="name"
                onChange={this.handleChangeLogo}
              />

              <label htmlFor="key"><b>Visible In</b></label>
              <Select
                multi
                options={
                            this.state.subjects
                        }
                onChange={(values) => {
                  this.state.subjectPermissions.push(values[0].value);
                  console.log('perm', this.state.subjectPermissions);
                }}
              />
            </form>
            <button className="baton baton1 -center" onClick={this.handleMDSave} variant="outline-primary">Save</button>
          </div>

        </div>

      );
    }
}

export default Editor;
