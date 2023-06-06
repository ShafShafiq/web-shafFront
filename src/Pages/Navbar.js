import React from 'react';
import { NavLink } from 'react-router-dom';
import TranslatorPage from './TranslatorPage';

const handleLogout = () => {
  localStorage.removeItem('C_token');
  window.location.href = '/';
};

function Navbar() {
  const isLoggedIn = localStorage.getItem('C_token') !== null;
  //states of translator
  const [showTranslator, setShowTranslator] = React.useState(false);

  //to toggle translator

  const handleTranslatorClick = () => {
    setShowTranslator(!showTranslator);
  };

//   return (
//     <nav>
//       <ul className="navbar">
//         <li>
//           <NavLink exact to="/" activeClassName="active">
//             Home
//           </NavLink>
//         </li>
//         {isLoggedIn && (
//           <>
//             <li>
//               <NavLink to="/dashboard" activeClassName="active">
//                 Dashboard
//               </NavLink>
//             </li>
//             <li>
//               <button  id='logout-button' onClick={handleLogout}>
//                 Logout
//               </button>
//             </li>
//           </>
//         )}
//         {!isLoggedIn && (
//           <>
//             <li>
//               <NavLink to="/login" activeClassName="active">
//                 Login
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/register" activeClassName="active">
//                 Register
//               </NavLink>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
return (
    <nav>
      <ul className="navbar">
        <li>
          <NavLink exact to="/" activeClassName="active">
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <NavLink to="/dashboard" activeClassName="active">
                Dashboard
              </NavLink>
            </li>
            <li>
              <button id='logout-button' onClick={handleLogout}>
                Logout
              </button>
            </li>
            <li>
              <button onClick={handleTranslatorClick}>Translator</button>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <NavLink to="/login" activeClassName="active">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" activeClassName="active">
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
      {/* //conditional rendering of translator */}
      {showTranslator && <TranslatorPage />}
    </nav>
  );
  
}

export default Navbar;
