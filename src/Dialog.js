import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import axios from "axios";
import key from "./key";

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
}))(MuiDialogActions);

class CustomizedDialogDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.data ? true : false,
      data: this.props.data,
      data2: this.props.disease,
      disease: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/issues/${15}/info?token=${key}&format=json&language=en-gb`
      )
      .then(res => this.setState({ data: res.data }));
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    
    if (this.state.data) {
      return (
        <div>
          <Dialog
            onClose={this.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.state.open}>
            <DialogTitle
              id="customized-dialog-title"
              onClose={this.handleClose}>
              {this.state.data.Name}
            </DialogTitle>
            <DialogContent>
              <Typography gutterBottom>
                <h3>Description </h3>
                {this.state.data.Description}
              </Typography>

              <Typography gutterBottom>
                <h3>Medical Condition</h3>
                {this.state.data.MedicalCondition}
              </Typography>
              <Typography gutterBottom>
                <h3>Possible Symptoms </h3>
                {this.state.data.PossibleSymptoms}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Exit
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
    return <div>Loading</div>;
  }
}

export default CustomizedDialogDemo;
