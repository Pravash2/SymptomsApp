import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { List, ListItem, ListItemText } from "@material-ui/core";

import Divider from "@material-ui/core/Divider";
import TypistLoop from "react-typist-loop";
import Typist from "react-typist";
import axios from "axios";
import keys from "./key";
import { Link } from "react-router-dom";

import Loader from './Loader'

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
    body: "",
    body1: "",
    body2: "",
    body3: "",
    body4: "",
    body5: "",
    body6: "",
    datas: ""
  };

  componentDidMount() {
    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/body/locations?token=${keys}&format=json&language=en-gb`
      )
      .then(res => this.setState({ body: res.data }));

    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/body/locations/16?token=${keys}&format=json&language=en-gb`
      )
      .then(res => this.setState({ body1: res.data }));
    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/body/locations/7?token=${keys}&format=json&language=en-gb`
      )
      .then(res => this.setState({ body2: res.data }));
    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/body/locations/15?token=${keys}&format=json&language=en-gb`
      )
      .then(res => this.setState({ body3: res.data }));
    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/body/locations/6?token=${keys}&format=json&language=en-gb`
      )
      .then(res => this.setState({ body4: res.data }));
    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/body/locations/10?token=${keys}&format=json&language=en-gb`
      )
      .then(res => this.setState({ body5: res.data }));
    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/body/locations/17?token=${keys}&format=json&language=en-gb`
      )
      .then(res => this.setState({ body6: res.data }));
  }

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    const box = [
      this.state.body1,
      this.state.body2,
      this.state.body3,
      this.state.body4,
      this.state.body5,
      this.state.body6
    ];

    if (this.state.body && box[5].length > 1) {
      console.log(box);
      return (
        <div className={classes.root}>
          <Typography
            style={{
              textAlign: "center",
              marginBottom: "20px",
              textWeight: "900"
            }}
            variant="title">
            <Typist>
              <span> Select The Body Part </span>
              <Typist.Backspace count={21} delay={2000} />
              <span> Then Pick Specific Oragan </span>
            </Typist>
          </Typography>
          {this.state.body.map((body, i) => {
            return (
              <ExpansionPanel
                expanded={expanded === `panel${i + 1}`}
                onChange={this.handleChange(`panel${i + 1}`)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    style={{ fontWeight: "900" }}
                    className={classes.secondaryHeading}>
                    {body.Name}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <List style={{ width: "100%" }}>
                    {box[i].map((item, i) => {
                      return (
                        <Link to={`/bodyLocation/${item.ID}`} style={{textDecoration:'none'}}>
                          <ListItem button divider>
                            <ListItemText primary={item.Name} />
                          </ListItem>
                        </Link>
                      );
                    })}
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </div>
      );
    }
    return <Loader />;
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledExpansionPanels);
