import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import makeToast from '../Toaster';
import { useNavigate } from 'react-router-dom';


 function LoginPage(props) {
  const navigate = useNavigate();
  const [password , setPassword] = useState('');
  const [email , setEmail] = useState('');
  const emailref = React.createRef();
  const passwordref = React.createRef();
  
  //handle the email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  //handle the password change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  //LGIN 
  const login = () => {
        

    // const  email = this.emailO
    // const  password = this.Password

    // const  email =     emailref.current.value
    // const  password =   passwordref.current.value

  // const name = this.nameO
  // const email =  this.emailO
  // const password  = this.password

  axios.post('http://localhost:4000/users/login', {
    
    email,
    password
  })
  .then(res => {
    
    // //geting the data
    // const data = res.data;
    // //console log the data
    // console.log(data);
    //set the data to the toast
     makeToast('success', res.data.message);
     console.log(res.data.token)
     localStorage.setItem('C_token' , res.data.token)
      
     console.log(res.data.message)
    //send to login page
    // history.push("/login")
     navigate('/dashboard');
    //  props.setupSocket();
    const {setupSocket} = props;
    setupSocket();
  })
  .catch(err => {
    console.log(err);
    // props.history.push("/login");
    // this.history.push("/login");
    //  navigate('/login');
       makeToast('error', err.message);
      //  navigate('/dashboard');
  })
}








  return (

    <div className = "card"> 
        <div className="cardHeader">Login</div>
        <div className="cardBody">
            <div className="inputGroup">
                <label htmlFor="email">Email</label>
                <input type="email" onChange={handleEmailChange} name="email" id="email" placeholder="" />

        </div>
        <div className="inputGroup">
                <label htmlFor="password">Pasword</label>
                <input type="password" onChange={handlePasswordChange}  name="password" id="password" placeholder="" />

        </div>
    </div>
    <button onClick={login}>Login</button>
    </div>
  )
}

export default LoginPage

// import React, { useState } from 'react';
// import axios from 'axios';
// import makeToast from '../Toaster';
// import { useNavigate } from 'react-router-dom';

// function LoginPage() {
//   const navigate = useNavigate();
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const validateInputs = () => {
//     if (!email || !password) {
//       makeToast('error', 'Please fill in all fields');
//       return false;
//     }

//     if (!isValidEmail(email)) {
//       makeToast('error', 'Please enter a valid email address');
//       return false;
//     }

//     return true;
//   };

//   const isValidEmail = (email) => {
//     const emailRegex = /^[A-Za-z0-9._%+-]+@(gmail|yahoo)\.com$/;
//     return emailRegex.test(email);
//   };

//   const login = () => {
//     if (!validateInputs()) {
//       return;
//     }

//     axios
//       .post('http://localhost:4000/users/login', {
//         email,
//         password
//       })
//       .then((res) => {
//         makeToast('success', res.data.message);
//         localStorage.setItem('C_token', res.data.token);
//         navigate('/dashboard');
//       })
//       .catch((err) => {
//         console.log(err);
//         makeToast('error', err.message);
//       });
//   };

//   return (
//     <div className="card">
//       <div className="cardHeader">Login</div>
//       <div className="cardBody">
//         <div className="inputGroup">
//           <label htmlFor="email">Email</label>
//           <input type="email" onChange={handleEmailChange} name="email" id="email" placeholder="" />
//         </div>
//         <div className="inputGroup">
//           <label htmlFor="password">Password</label>
//           <input type="password" onChange={handlePasswordChange} name="password" id="password" placeholder="" />
//         </div>
//       </div>
//       <button onClick={login}>Login</button>
//     </div>
//   );
// }

// export default LoginPage;

