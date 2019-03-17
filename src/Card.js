import React from 'react'
import axios from 'axios'
import key from './key';
import Dialog from './Dialog'

import Loader from './Loader'

class Card extends React.Component{
    state={
        data:''
    }

    componentDidMount(){
        axios.get(`https://sandbox-healthservice.priaid.ch/issues/${this.props.data.ID}/info?token=${key}&format=json&language=en-gb`)
            .then(res=>this.setState({data:res.data}))
    }

    render(){
        if(this.state.data)
        return <Dialog data={this.state.data}  />
        return <Loader />
    }
}

export default Card;