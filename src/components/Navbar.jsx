import React, { use } from 'react';
import { NavLink } from 'react-router';
import {AuthContext} from "../provider/AuthProvider";
import Logo from '../assets/Logo.png';

const Navbar = () => {

    const{user, logOut}  = use(AuthContext);
  const handleLogOut = ()=> {
    logOut().then(()=>{
      alert("Logged Out!")
    })
    .catch(()=>{
      
    })
  };


    return (
        
            <>
            <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        
        <NavLink to="/">
        <li><a>Home</a></li>
        </NavLink>
        <NavLink to="/">
        <li><a>Tuitions</a></li>
        </NavLink>
        <NavLink to="/">
        <li><a>Tutors</a></li>
        </NavLink>
        <NavLink to="/">
        <li><a>About</a></li>
        </NavLink>
        <NavLink to="/">
        <li><a>Contact</a></li>
        </NavLink>
      </ul>
    </div>
    <NavLink to="/">
        <img src={Logo} alt="Logo"  className='max-h-30 max-w-30'/>
    </NavLink>
    
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <NavLink to="/" >
        <li><a>Home</a></li>
        </NavLink>
        <NavLink to="/" >
        <li><a>Tuitions</a></li>
        </NavLink>
        <NavLink to="/" >
        <li><a>Tutors</a></li>
        </NavLink>
        <NavLink to="/" >
        <li><a>About</a></li>
        </NavLink>
        <NavLink to="/" >
        <li><a>Contact</a></li>
        </NavLink>
    </ul>
  </div>
  {/* login logout toggle */}

          <div className='flex gap-2 items-center navbar-end'>
          {user ? (
            <div className="flex gap-2 items-center">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1">
                  <span className="text-sm font-semibold">{user.displayName}</span>
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <NavLink to='/dashboard'>Dashboard</NavLink>
                  </li>
                  <li>
                    <a onClick={handleLogOut}>Logout</a>
                  </li>
                </ul>
              </div>
              <img src={user.photoURL} alt="profile photo" className='h-10 w-10 rounded-full'/>
            </div>
          ) : 
          <div className='flex gap-3'>
            <NavLink to='/login'>
              <button className='btn btn-info text-white'>LogIn</button>
            </NavLink>
            <NavLink to='/register'>
              <button className='btn btn-info text-white'>Register</button>
            </NavLink>
          </div>
          }
     </div>
</div>

            </>
        
    );
};

export default Navbar;