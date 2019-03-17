import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Card from "./Card";

import axios from "axios";
import key from "./key";

import Loader from './Loader'

class Issue extends React.Component {
  state = {
    issue: "",
    open: false,
    data:''
  };
  constructor(props) {
    super(props);
    this.renderCard=this.renderCard.bind(this)
  }
  componentDidMount() {
    axios
      .get(
        `https://sandbox-healthservice.priaid.ch/issues?token=${key}&format=json&language=en-gb`
      )
      .then(res => this.setState({ issue: res.data }));
  }

  handelClick(issue) {
    this.setState({ open:this.state.open?false:true});
    this.setState({data:issue})
  }

  renderCard(issue){
    if(this.state.open && issue.ID===this.state.data.ID)
      return <Card data={this.state.data} />
  }
  

  render() {
    if (this.state.issue) {
      if(this.state.data && this.state.open){
      console.log("1ST",this.state.open,this.state.data)
      return (
        <div>
          <List>
         
            {this.state.issue.map(issue => {
              return (
                <div>
                 
                <ListItem
                  onClick={() => this.handelClick(issue)}
                  key={issue.ID}
                  divider
                  button>
                  <ListItemText>{issue.Name}</ListItemText>

                  {this.state.open ? <ExpandLess /> : <ExpandMore />}
                
                </ListItem>
                {this.renderCard(issue)}
                </div>
              );
            })}
            
          </List>
          
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
        </div>
      );
    }
    return <Loader />;
  }
}

export default Issue;
