import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Switch from 'react-switch';

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      num: '',
      checked: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    Meteor.call('getTeam', {}, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          users: res.filter((user) => user.emails !== undefined),
        });
        this.setState({ num: res.length });
      }
    });
  }

  FormRow() {
    const gridlist = [];
    this.state.users.filter((user) => {
      if (this.state.checked) {
        if (user.subjects.length > 0) return user;
      } else if (user.role == 'team') return user;
    }).forEach((user) => {
      gridlist.push(
        <Grid item xs={4}>
          <div className="container69">
            <p className="subject">{user.username}</p>
          </div>
        </Grid>,
      );
    });
    return (
      <>
        {gridlist}
      </>
    );
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  renderBody() {
    return (
      <div className="something">
        <p style={{ color: 'white' }} className="sv">
          <b>Management </b>
          <label style={{ position: 'relative', top: '10px' }}>
            <Switch
              onChange={this.handleChange}
              checked={this.state.checked}
            />
          </label>
          {' '}
Contributors
        </p>

        <Grid container spacing={1}>
          <Grid container item xs={12} spacing={3}>
            {this.FormRow()}
          </Grid>
        </Grid>
      </div>
    );
  }

  render() {
    return (
      <div className="home-page -padding-20">
        {this.renderBody()}
      </div>
    );
  }
}

export default Team;
