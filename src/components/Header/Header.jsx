import { NavLink } from 'react-router-dom'
import blankImage from "../../assets/images/samurai.png"
import s from './Header.module.css'

const Header = (props) => {
  // console.log('avaPath', props.avaPath)
  const image = window.location.origin + '/' + props.avaPath
    return (
      <header className={s.header}>Header jsx
        <div className={s.loginBlock}>
        <img className={s.logo}
          src="https://www.logodesign.net/logo/abstract-cuboid-building-4519ld.png"
          alt="logo"
        />
          {props.isAuth 
          ?
          <div> 
            <div>
              <img className={s.ava} src={image ? image : blankImage} alt="ava"/>
            </div>
            <div>{props.login} - <button onClick={props.logoutUser}>Log out</button></div>
          </div>
            :<NavLink to={'/login'}>Login</NavLink>}
          </div>
        {!props.isAuth&&<div className={s.registration}>
          <NavLink to={'/registration'}>Registration</NavLink>
        </div>}
    </header>
    );  
  };

  export default Header

