import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Dialogs from "./Dialog";

import axios from "axios";
import key from "./key";

class Issue extends React.Component {
  state = {
    issue: "",
    open: true,
    disease: "",
    data:''
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/issues?token=${key}&format=json&language=en-gb`
      )
      .then(res => this.setState({ issue: res.data }));
  }

  handelClick(issue) {
    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/issues/${
          issue.ID
        }/info?token=${key}&format=json&language=en-gb`
      )
      .then(res => this.setState({ disease: res.data }));

    this.setState({ open: false});
    this.setState({data:issue})
  }
  

  render() {
    if (this.state.issue && (this.state.open || this.state.disease)) {
      if(!this.state.open && this.state.disease){
          console.log(this.state.data)
      return (
        <div>
          <List>
            {this.state.issue.map(issue => {
              return (
                <ListItem
                  onClick={() => this.handelClick(issue)}
                  key={issue.ID}
                  divider
                  button>
                  <ListItemText>{issue.Name}</ListItemText>

                  <ExpandMore />
                </ListItem>
              );
            })}
          </List>
          <Dialogs handelClose={this.handelClose} data={this.state.disease} disease={this.state.data} />
        </div>
      );
    }
     return (
        <div>
          <List>
            {this.state.issue.map(issue => {
              return (
                <ListItem
                  onClick={() => this.handelClick(issue)}
                  key={issue.ID}
                  divider
                  button>
                  <ListItemText>{issue.Name}</ListItemText>

                  <ExpandMore />
                </ListItem>
              );
            })}
          </List>
          <Dialogs open={!this.state.open} />
        </div>
      );
    }
    return <div>Loading</div>;
  }
}

export default Issue;
