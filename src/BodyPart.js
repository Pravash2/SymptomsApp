import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { List, ListItem, ListItemText } from "@material-ui/core";

import axios from "axios";
import keys from "./key";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null,
    body: ""
  };

  componentDidMount() {
    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/body/locations?token=${keys}&format=json&language=en-gb`
      )
      .then(res => this.setState({ body: res.data }));
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  renderList(id) {
    // this.state.body.map(body=>{
    //     axios.get(`https://sandbox-healthservice.priaid.ch/body/locations/${body.ID}?token=${keys}&format=json&language=en-gb`)
    //       .then(res=>this.setState({}))
    // })
  }

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    console.log(this.state.body);
    if (this.state.body)
      return (
        <div className={classes.root}>
          {this.state.body.map((body, i) => {
            return (
              <ExpansionPanel
                expanded={expanded === `panel${i + 1}`}
                onChange={this.handleChange(`panel${i + 1}`)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>{`Body Part ${i +
                    1}`}</Typography>
                  <Typography className={classes.secondaryHeading}>
                    {body.Name}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {this.renderList(body.ID)}
                  <List>
                    <ListItem>
                      <ListItemText>Disease 1</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>Disease 2</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>Disease 3</ListItemText>
                    </ListItem>
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </div>
      );
    return <div>Loading</div>;
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledExpansionPanels);
