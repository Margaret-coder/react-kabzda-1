import { NavLink } from 'react-router-dom'
import s from './Header.module.css'
const Header = (props) => {
    return (
      <header className={s.header}>Header jsx
        <div className={s.loginBlock}>
        <img className={s.ava}
          src="https://www.logodesign.net/logo/abstract-cuboid-building-4519ld.png"
          alt="logo"
        />
          {props.isAuth 
          ? 
          <div>{props.login} - <button onClick={props.logoutUser}>Log out</button></div>
            :<NavLink to={'/login'}>Login</NavLink>}
          </div>
        {!props.isAuth&&<div className={s.registration}>
          <NavLink to={'/registration'}>Registration</NavLink>
        </div>}
    </header>
    );  
  };

  export default Header

