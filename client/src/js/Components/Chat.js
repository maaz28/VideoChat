import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Input from './Input'

class Chat extends Component {
    constructor(){
        super();
        this.state={
            text:''
        }
    }

    handleChange = (e) => {
        let msg = e.target.value;
        this.setState({text:msg})
    }

    

    render() {
        let chatWindow = {
            height: '74vh',
            width: '100%', 
            marginBottom: '1vh'
        }
        let chatInput = {
            width:'calc(100% - 50px)',
            display:'inline-block',
            backgroundColor:'white',
            paddingTop:'13px'
        }
        let buttonStyle = { 
            width: '50px', 
            padding: '12px 0px', 
            border: 'none', 
            position: 'relative', 
            top: '-5px', 
            left: '-4px', 
            backgroundColor: '#1a7bf7', 
            color: 'white' 
        }


        return (
            <div style={{backgroundColor:'white',width:'100%'}} >
                <div style={chatWindow} >

                </div>
                <div style={chatInput} >
                    <Input value={this.state.text} onChange={this.handleChange} placeholder='Type Message...' />
                </div>
                <button type='submit' onClick={() => this.props.sendMesg(this.state.text)} style={buttonStyle} >
                    <FontAwesomeIcon icon={ faPaperPlane }/>
                </button>
            </div>
        );
    }
}

export default Chat;