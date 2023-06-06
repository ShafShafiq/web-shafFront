import React from 'react'
import { useState , useEffect} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import makeToast from '../Toaster';

export default function DashboardPage(props) {
  const [chatroomname, setChatroomname] = useState('');
  const navigate = useNavigate();

  //handle chatroomname
  const handleinput = (e) => {
    setChatroomname(e.target.value)
  }
  //create chatroom
  // const createChatroom = () => {
  //   axios
  //   .post('http://localhost:4000/chatroom/make', {
  //     chatroomname,
  //   })
  //   .then((res) => {
  //     makeToast('success', res.data);
  //     navigate('/DashboardPage');
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     makeToast('error', err.message);
  //   });
  // }
  const createChatroom = () => {
    console.log("chatroomname ===== "+chatroomname)
    axios
      .post('http://localhost:4000/chatroom/make', {
        name: chatroomname,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('C_token')}`,
        },
      })
      .then((res) => {
        makeToast('success', res.data);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        makeToast('error', err.message);
      });
  };
  

const [chatrooms, setChatrooms] = useState([]);
// props.setupSocket();

const getAllChatrooms = () => {
  axios.get("http://localhost:4000/chatroom/all",{
    headers: {
      Authorization: "Bearer " + localStorage.getItem("C_token"),
    },
  
    
  }).then(res => {
    console.log(res.data);
    setChatrooms(res.data);
  })
  .catch(err => {
    console.log(err);
    setTimeout(getAllChatrooms, 3000);

  })
}
  useEffect(() => {
    getAllChatrooms();
  }, []);



  return (
    <div className = "card"> 
        <div className="cardHeader">Chatrooms</div>
        
        <div className="cardBody">

          <div className="inputGroup">
                <label htmlFor="chatroomname">Chatroom Name</label>
                <input onChange={handleinput} type="text" name="chatroomname" id="chatroomname" placeholder="" />
          </div>
           
          
    </div>
    <button onClick={createChatroom}>Create ChatRoom</button>

        <div className='chatrooms'>
         {chatrooms.map((chatroom ) => {
            return (

              
              <div key={chatroom._id} className='chatroom'>
              <div className='chatroomName'>
                {chatroom.name}
              </div>
             <Link to={"/chatroom/"+chatroom._id }>
              <div className='join'>
                  <button className='join'>Join</button>
              </div>
              </Link> 
               {/* <Link to={{ pathname: `/chatroom/${chatroom._id}`, state: { chatroomName: chatroom.name } }}>
               <div className='join'>
                  <button className='join'>Join</button>
              </div>
               </Link> */}
            </div>
            )
         }

         )} 
          {/* <div className='chatroom'>
            <div className='chatroomName'>
              Chatroom 1
            </div>
            <div className='join'>
                <button className='join'>Join</button>
            </div>
          </div> */}
    </div>
    </div>
  )
}

