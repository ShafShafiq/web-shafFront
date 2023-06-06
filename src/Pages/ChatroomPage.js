import React from 'react'
import {useParams} from 'react-router-dom'
import { useLocation } from 'react-router-dom';



export default function ChatroomPage(props) {
  // const [userId , setUserId] = React.useState('');

  // console.log("inside the Chatroom");
  // const location = useLocation();
  // const { chatroomName } = location.state;

  const socket = props.socket;
  if(socket === undefined) {
    console.log('socket is undefined')
  }
// const socket = io('http://localhost:4000/',{
//     query: {
//         token: localStorage.getItem('C_token')
//     },
// });
// const socket = require("socket.io-client")("http://localhost:4000/", {
//   rejectUnauthorized: false ,// WARN: please do not do this in production
//   query: {
//             token: localStorage.getItem('C_token')
//         },
// });

let  {id} = useParams();
const chatroomId = id;
const [messages , setMessages] = React.useState([]);
const [messageRef , setMessageRef] = React.useState('');
const [userId, setUserId] = React.useState("");

//handlemessage
const handleinput = (e) => {
  setMessageRef(e.target.value)
}
// //send message
// const sendMessage = () => {
//   if(socket){
//     socket.emit('chatroomMessage', {
//       chatroomId,
//       message: messageRef,
//     });
//     setMessageRef('')
//   }
// }


// React.useEffect(() => {
//   if(socket) {
//     socket.emit('joinRoom', {
//       chatroomId,
  
//     });
//     socket.on("newMessage",(message)=>{
//       setMessages([...messages , message])
//     })
//   }
 


 
//  return () => {
//     if(socket){
//       socket.emit('leaveRoom', {
//         chatroomId,
//       });
//     }
   
//   }

// }, [messages]);

// const atob = (base64) => {
//   const buffer = Buffer.from(base64, 'base64');
//   return buffer.toString('binary');
// };
// const atob = (base64) => {
//   return window.atob(base64);
// };


const sendMessage = () => {
  if (socket) {
    socket.emit("chatroomMessage", {
      chatroomId,
      message: messageRef
    });

    setMessageRef(' ');
  }
};

React.useEffect(() => {
  const token = localStorage.getItem("C_token");
  if (token) {
    const payload = JSON.parse(window.atob(token.split(".")[1]));
    // const payload = token.split(".")[1];
    setUserId(payload._id);
  }
  //debuggCode
//   const token = localStorage.getItem("C_token");
// console.log(token); // Debug statement

// if (token) {
//   const payload = JSON.parse(window.atob(token.split(".")[1]));
//   console.log(payload); // Debug statement

//   if (payload._id) {
//     setUserId(payload._id);
//   } else {
//     console.log("Payload does not contain the 'id' property");
//   }
// }
  if (socket) {
    socket.on("newMessage", (message) => {
      const newMessages = [...messages, message];
      setMessages(newMessages);
    });
  }
  //eslint-disable-next-line
}, [messages]);

React.useEffect(() => {
  if (socket) {
    socket.emit("joinRoom", {
      chatroomId,
    });
  }

  return () => {
    //Component Unmount
    if (socket) {
      socket.emit("leaveRoom", {
        chatroomId,
      });
    }
  };
  //eslint-disable-next-line
}, []);

let num = 0


  return (
    
    <div className='chatroomPage'>
      <div className='chatroomSection'>
        <div className='cardHeader'>Welcome</div>
          <div className='chatroomContent'>
            {messages.map((message , i) =>(
                                    <div key={i}className='message'>
                                        {console.log("inside the map "+ message.userId + " " + userId)}
                                    <span className={!(userId === message.userId )? "ownMessage":"otherMessage"}>{message.name}:</span> {message.message}
                                    </div>
            ))}
            {/* checking code  */}

                                    {/* <div className='message'>
                                    <span className='ownMessage'>Shaf:</span> hello...!
                                    </div>
                                    <div className='message'>
                                    <span className='otherMessage'>Shaheer:</span> hello Shaf.
                                    </div>
                                    <div className='message'>
                                    <span className='ownMessage'>Shaf:</span> how are you?
                                    </div> */}
              
          </div>
          <div className='chatroomActions'>
            <div>
              <input type='text' onChange={handleinput} name='message' placeholder='Say something!' />
            </div>
            <div>
              <button className='join' onClick={sendMessage}>Send</button>
            </div>
          </div> 

      </div>
    </div>
  )
}
