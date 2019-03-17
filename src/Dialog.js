import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function SimpleCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;
  console.log(props.data);
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.data.Name}
        </Typography>
        <br />
        <Typography component="p">{props.data.Description}</Typography>

        <Typography className={classes.pos} color="textSecondary">
          <h4>MedicalCondition</h4>{" "}
          {props.data.MedicalCondition
            ? props.data.MedicalCondition.split(".").map(data => (
                <div style={{ margin: "5px" }}>{data}.</div>
              ))
            : ""}
        </Typography>

        <Typography className={classes.pos} color="textSecondary">
          <h3>PossibleSymptoms </h3>
          {props.data.PossibleSymptoms
            ? props.data.PossibleSymptoms.split(",").map(data => (
                <div style={{ marginLeft: "5px", fontWeight: "900" }}>
                  {data}
                </div>
              ))
            : ""}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
