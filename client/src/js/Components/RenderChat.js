import React from 'react';
import Reply from './Reply';
import Recieved from './Recieved';
import { Scrollbars } from 'react-custom-scrollbars';

const RenderChat = ({ messages, currentUserUid }) => {
  console.log(messages, "In Render Chat");
  return (


    <Scrollbars style={{ width: "100%", height: "85%" }}>
      {
        (messages == null) ? (
          <p style={{ color: "black", padding: '20px' }}>No chat history, Start a conversation now !</p>
        ) : (
            Object.keys(messages).map((item, i) => (
              (messages[item].sender === currentUserUid) ? (
                <Reply message={messages[item].message} />
              ) : (
                  <Recieved message={messages[item].message} />
                )
            ))
          )
      }
    </Scrollbars>
  )
}

export default RenderChat;