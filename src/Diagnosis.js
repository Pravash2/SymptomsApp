import React from 'react'
import key from './key'
import axios from 'axios'
import { List, ListItem, ListItemText } from "@material-ui/core";

class Diagnosis extends React.Component{
    state={
        datas:''
    }
    componentDidMount(){
        axios.get(`https://sandbox-healthservice.priaid.ch/symptoms/${this.props.match.params.id}/0?token=${key}&format=json&language=en-gb`)
            .then(res=>this.setState({datas:res.data}))
    }
    render(){
        if(this.state.datas.length>2){
        const app=this.state.datas;
        console.log(app)
        return(
            <div>
            {app.map(datas=>{
                return <List><ListItem><ListItemText primary={datas.Name} /></ListItem></List>
            })}
            </div>
        )
        }
        return <div>Loading</div>
    }
}

export default Diagnosis;