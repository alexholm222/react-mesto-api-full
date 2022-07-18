import { useLocation } from "react-router-dom";
function Footer() {
  let height =""
  let coopyrigth ="block"
  const location= useLocation()
  if(location.pathname === "/sign-in") {
    coopyrigth="none";
    height=120
  } else if(location.pathname === "/sign-up") {
    coopyrigth="none";
    height=80
  }
    return (
      <footer className="footer" style={{height: height}}>
        <p className="footer__copyright" style={{display: coopyrigth}}>&#169; 2022 Mesto Russia</p>
      </footer>  
    )
}

export default Footer;