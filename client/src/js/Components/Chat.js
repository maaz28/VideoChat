import React, { Component } from 'react';
import { Grid, Divider } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Input from './Input'
import RenderChat from './RenderChat';
import * as firebase from 'firebase'


class Chat extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            recipientUid: '',
            messages: null,
            userUid: sessionStorage.getItem('userUid')
        }
    }

    componentWillReceiveProps = (nextProps) => {
        console.log(nextProps, "componentWillReceiveProps");
        if (nextProps.recipient) {
            this.showUserMsgs(nextProps.recipient)
        }
    }

    showUserMsgs = (uid) => {
        const { userUid } = this.state
        firebase.database().ref('chats').child(userUid).child(uid)
            .on('value', data => {
                let userData = data.val();
                console.log(userData, "USER DATA");
                this.setState({
                    messages: userData
                })
            })
    }

    handleChange = (e) => {
        let msg = e.target.value;
        this.setState({ text: msg })
    }

    sndMesg = () => {
        this.props.sendMesg(this.state.text)
        this.setState({ text: '' })
    }

    render() {
        let chatWindow = {
            height: '74vh',
            width: '100%',
            marginBottom: '1vh'
        }
        let chatInput = {
            width: 'calc(100% - 50px)',
            display: 'inline-block',
            backgroundColor: 'white',
            paddingTop: '13px'
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
            <div style={{ backgroundColor: '#e8e8e8', width: '100%', borderRadius: '16px' }}>
                <div style={chatWindow} >
                    <div style={{ color: "black", padding: '20px' }}>{this.props.recipientName}</div>
                    <Divider />
                    <RenderChat
                        messages={this.state.messages}
                        currentUserUid={this.state.userUid}
                    />
                </div>
                <div style={chatInput} >
                    <Input value={this.state.text} onChange={this.handleChange} placeholder='Type Message...' />
                </div>
                <button type='submit' onClick={() => this.sndMesg()} style={buttonStyle} >
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
        );
    }
}

export default Chat;