import React from 'react'
import Reply from './Reply';
import Recieved from './Recieved';

const RenderChat = ({ messages, currentUserUid }) => {
  console.log(messages, "In Render Chat");
  return (
    <div>
      {
        (messages == null) ? (
          <p style={{ color: 'black' }}>No Messages to display</p>
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

    </div>
  )
}

export default RenderChat;