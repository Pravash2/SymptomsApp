import React from "react";
import "./styles.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Typist from 'react-typist'

const sectionStyle = {
  width: `${window.innerWidth}px`,
  height: `${window.innerHeight}px`,
  display: "flex",
  flex: 1,
  zIndex: 0,
  postion: "relative",
  backgroundImage: `url('https://uploads.codesandbox.io/uploads/user/6f8b104e-6915-422e-95e8-f395886bcc19/ECSq-care-check-up-checking-1516648.jpg')`
};

class App extends React.Component {
  render() {
    return (
      <div>
        <section className="back-img" style={sectionStyle}>
          
          <div>
            <Link style={{ textDecoration: "none" }} to="/main">

              <Button
                style={{
                  postion: "absolute",
                  top: `${window.innerHeight / 2 - 10}px`,
                  left: `${window.innerWidth / 2 -100}px`
                }}
                variant="contained"
                color="secondary">
               <Typist>Welcome to HealthEasy</Typist>
              </Button>
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
