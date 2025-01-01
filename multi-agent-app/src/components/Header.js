   // src/components/Header.js
   import React from 'react';
   import icon from '../assets/logoblack.svg';

   const Header = () => {
       return (
           <div className="header">
               <img src={icon} alt="Icon" className="header-icon" />
           </div>
       );
   };

   export default Header;