import React from "react";
import key from "./key";
import axios from "axios";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Typist from "react-typist";
import Loader from './Loader'

class Diagnosis extends React.Component {
  state = {
    datas: ""
  };
  componentDidMount() {
    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/symptoms/${
          this.props.match.params.id
        }/0?token=${key}&format=json&language=en-gb`
      )
      .then(res => this.setState({ datas: res.data }));
  }
  render() {
    if (this.state.datas.length > 2) {
      const app = this.state.datas;

      return (
        <div>
          <Typography
            style={{
              textAlign: "center",
              margin: "20px",
              textWeight: "900"
            }}
            variant="title">
            <Typist>
              <span> Select Your Symptoms</span>
              <Typist.Backspace count={21} delay={2000} />
              <span> Then Click to Diagnosis </span>
            </Typist>
          </Typography>

          <List style={{ margin: "auto", width: "95%" }}>
            {app.map((datas, i) => {
              return (
                <Link
                  key={datas.ID}
                  to={`/disease/${datas.ID}`}
                  style={{ textDecoration: "none" }}>
                  <ListItem button>
                    <ListItemText primary={datas.Name} />
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </div>
      );
    }
    return <Loader />;
  }
}

export default Diagnosis;
