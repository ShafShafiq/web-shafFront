// import React from 'react'
// import axios from 'axios'
// import { useState } from 'react'
// // import { useHistory } from "react-router-dom"
// import { useNavigate } from 'react-router-dom';


// import makeToast from '../Toaster'
// export default function RegisterPage(props) {
//   //  const nameref = React.createRef();
//   //  const emailref = React.createRef();
//   //   const passwordref = React.createRef();
//     const [name , setName] = useState('');
//     const [email , setEmail] = useState('');
//     const [password , setPassword] = useState('');
//     // const history = useHistory()
//     const navigate = useNavigate();
//  //handle the name change
//     const handleNameChange = (e) => {
//       setName(e.target.value);
//     }
//     //handle the email change
//     const handleEmailChange = (e) => {
//       setEmail(e.target.value);
//     }
//     //handle the password change
//     const handlePasswordChange = (e) => {
//       setPassword(e.target.value);
//     }
//     const register = () => {
        
//           // const   name = nameref.current.value
//           // // const name  = nameO
//           // const  email = emailref.current.value
//           // const  password = passwordref.current.value
   
//         // const name = nameO
//         // const email =  emailO
//         // const password  = this.password
    
//         axios.post('http://localhost:4000/users/signup', {
//           name,
//           email,
//           password
//         })
//         // fetch('http://localhost:4000/users/signup', {
//         //   method: 'POST',
//         //   mode: 'no-cors',
//         //   headers: {
//         //     'Content-Type': 'application/json'
//         //   },
//         //   body: JSON.stringify({
//         //     nameO,
//         //     emailO,
//         //     password
//         //   })
//         // })
//         .then(res => {
//            makeToast('success', res.data);
          
//           navigate('/login');
//         })
//         .catch(err => {
//           console.log(err);
//           // props.history.push("/login");
//           // this.history.push("/login");
//           //  navigate('/login');
//              makeToast('error', err.message);
//         })
//     }

//   return (
//     <div className = "card"> 
//         <div className="cardHeader">Register</div>
        
//         <div className="cardBody">

//           <div className="inputGroup">
//                 <label htmlFor="name">Name</label>
//                 <input type="text" name="name" onChange={handleNameChange} id="name" placeholder=""  />
//           </div>
//             <div className="inputGroup">
//                 <label htmlFor="email">Email</label>
//                 <input type="email" onChange={handleEmailChange} name="email" id="email" placeholder=""  />

//           </div>
//           <div className="inputGroup">
//                 <label htmlFor="password">Pasword</label>
//                 <input type="password" onChange={handlePasswordChange} name="password" id="password" placeholder=""  />
//            </div>
//     </div>
//     <button onClick={register}>Register</button>
//     </div>
//   )
// }
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import makeToast from '../Toaster';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Designation, setDesignation] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };

  const validateInputs = () => {
    if (!name || !email || !password) {
      makeToast('error', 'Please fill in all fields');
      return false;
    }

    if (!isValidEmail(email)) {
      makeToast('error', 'Please enter a valid email address');
      return false;
    }

    if (password.length < 6) {
      makeToast('error', 'Password should be at least 6 characters long');
      return false;
    }

    return true;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@(gmail|yahoo)\.com$/;
    return emailRegex.test(email);
  };

  const register = () => {
    if (!validateInputs()) {
      return;
    }

    axios
      .post('http://localhost:4000/users/signup', {
        name,
        email,
        password,
        Designation,
      })
      .then((res) => {
        makeToast('success', res.data);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        makeToast('error', err.message);
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Register</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" onChange={handleNameChange} id="name" placeholder="" />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={handleEmailChange} name="email" id="email" placeholder="" />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input type="password" onChange={handlePasswordChange} name="password" id="password" placeholder="" />
        </div>
        <div className="inputGroup">
          <label htmlFor="Designation">Designation</label>
          <input type="Text" onChange={handleDesignationChange} name="Designation" id="Designation" placeholder="enter Designation" />
        </div>
      </div>
      <button onClick={register}>{Designation}</button>
    </div>
  );
}
