import React from "react"
import { useLocation,  Link } from "react-router-dom"

function Header({userEmail, signOut}) {
  let link = "";
  let linkText = "";
  let email ="";
  let button =""
  const location = useLocation();
  if (location.pathname === "/sign-in") {
    link = "sign-up";
    linkText = "Регистрация"
  } else if (location.pathname ==="/sign-up") {
    link = "sign-in";
    linkText = "Войти"
  } else if(location.pathname ==="/") {
    email = userEmail;
    button = "Выйти";
  }
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__container">
        <h2 className="header__email">{email}</h2>
        <Link to={link} className="header__button link-effect">{linkText}</Link>
        <button onClick={signOut} className="header__button link-effect">{button}</button>
      </div>
    </header>
    )
}

export default Header