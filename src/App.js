import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import DashboardPage from './Pages/DashboardPage';
import LoginPage from './Pages/LoginPage';
import IndexPage from './Pages/IndexPage';
import ChatroomPage from './Pages/ChatroomPage';
import Navbar from './Pages/Navbar';
import makeToast from './Toaster';
import io from "socket.io-client";
import TranslatorPage from './Pages/TranslatorPage';
// import IndexPage from './Pages/IndexPage';

function App() {
  const [socket , setSocket] = React.useState(null)
  // const [] = React.useState(null)
  // const setupSocket = () => {
  //   const token = localStorage.getItem('C_token')
  //   if(token && !socket){
  //     const newsocket = require("socket.io-client")("http://localhost:4000", {
       
  //       query: {
  //           token: localStorage.getItem('C_token')
  //               },
  //       });
      

  //     newsocket.on("disconnect", () => {
  //       setSocket(null);
  //       setTimeout(setupSocket, 3000);
  //       makeToast("error", "Socket Disconnected!");
  //     });

  //     newsocket.on("connect", () => {
  //       makeToast("success", "Socket Connected!");
       
  //     });
  //     setSocket(newsocket);
  //   }
  // };

  const setupSocket = () => {
    const token = localStorage.getItem("C_token");
    if (token && !socket) {
      const newSocket = io("http://localhost:4000", {
        query: {
          token: localStorage.getItem("C_token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        makeToast("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };

  React.useEffect(() => {
    setupSocket();
  }, []);
  console.log("socket ===== "+socket)

  return (
    <BrowserRouter>
       <Navbar />
      <Routes>
      <Route path="/" element={<IndexPage/>} />
      <Route path="/chatroom/:id" element={<ChatroomPage socket={socket}/>} />
      <Route path="/login" element={<LoginPage setupSocket={setupSocket} />} />
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/dashboard" element={<DashboardPage socket={socket}/>}/>
      <Route path="/translator" element={<TranslatorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
