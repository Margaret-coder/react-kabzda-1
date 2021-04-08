import { NavLink } from 'react-router-dom'
import s from './Header.module.css'
const Header = (props) => {
    return (
      <header className={s.header}>Header jsx
      <img
        src="https://www.logodesign.net/logo/abstract-cuboid-building-4519ld.png"
        alt="logo"
      />
      <div className={s.loginBlock}>
        {props.isAuth 
        ? <div>{props.login} - 
        <button onClick={props.logoutUser}>Log out</button></div>  
          :<NavLink to={'/login'}>Login</NavLink>}
      </div>
    </header>
    );  
  };

  export default Header

