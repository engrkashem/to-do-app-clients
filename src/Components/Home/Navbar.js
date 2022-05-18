import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = () => {
    const [user, loading] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
    };

    if (loading) {
        return <div className=' flex justify-center items-center'>
            <button className="btn btn-primary loading">loading</button>
        </div>;
    }
    const links = <>
        <li className=' font-semibold'><NavLink to={'/'}>HOME</NavLink></li>
        {
            user ?
                <li onClick={logout} className=' font-semibold'><NavLink to={'/login'}>SIGN OUT</NavLink></li> :
                <li className=' font-semibold'><NavLink to={'/login'}>LOGIN</NavLink></li>
        }
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <NavLink to={'/'} className="btn btn-ghost normal-case text-xl text-primary font-bold ">TO DO APP</NavLink>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {links}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;