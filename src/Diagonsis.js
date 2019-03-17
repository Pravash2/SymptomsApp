import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core";
import Divider from '@material-ui/core/Divider';

import key from "./key";
import axios from "axios";

import Loader from './Loader'

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class NestedList extends React.Component {
  componentDidMount() {
    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/diagnosis?symptoms=[${
          this.props.match.params.id
        }]&gender=male&year_of_birth=1999&token=${key}&format=json&language=en-gb`
      )
      .then(res => this.setState({ disease: res.data }));
  }

  state = {
    open: false,
    disease: ""
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;
    console.log(this.state.disease);
    if (this.state.disease.length >= 1)
      return (
        <List
          component="nav"
          subheader={
            <ListSubheader component="div">
              Welcome to the Diagnosis page
            </ListSubheader>
          }
          className={classes.root}>
          {this.state.disease.map(dis => {
            return (
              <div>
                <ListItem key={dis.ID} button onClick={this.handleClick}>
                  <ListItemText
                    primary={`${dis.Issue.Ranking} ${dis.Issue.Name}`}
                    secondary={`Rank ${
                      dis.Issue.Ranking
                    } | Accurarcy ${dis.Issue.Accuracy}% | ${dis.Issue.IcdName}   `}
                  />
                  {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                  <List
                    component="div"
                    disablePadding
                    subheader={
                      <ListSubheader component="div">
                        Specialisation
                      </ListSubheader>
                    }>
                    {dis.Specialisation.map(sp => {
                      return (
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText inset primary={sp.Name} />
                        </ListItem>
                      );
                    })}
                       <Divider light />
                  </List>
                </Collapse>
              </div>
            );
          })}
        </List>
      );
    return <Loader />;
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NestedList);
