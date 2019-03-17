import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/KeyboardArrowRight";

import axios from "axios";
import key from "./key";
import Loader from "./Loader";
import { Link } from "react-router-dom";

class Issue extends React.Component {
  state = {
    issue: ""
  };
  componentDidMount() {
    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/symptoms?token=${key}&format=json&language=en-gb`
      )
      .then(res => this.setState({ issue: res.data }));
  }
  render() {
    if (this.state.issue)
      return (
        <List>
          {this.state.issue.map(issue => {
            return (
              <Link
                to={`/disease/${issue.ID}`}
                key={issue.ID}
                style={{ textDecoration: "none" }}>
                <ListItem key={issue.ID} divider button>
                  <ListItemText>{issue.Name}</ListItemText>
                  <ExpandMore />
                </ListItem>
              </Link>
            );
          })}
        </List>
      );
    return <Loader />;
  }
}

export default Issue;
