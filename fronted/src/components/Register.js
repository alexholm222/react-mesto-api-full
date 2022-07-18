import React from "react";
import { useHistory, Link } from "react-router-dom";
import FormAuth from "./FormAuth";
import InfoTooltip from "./InfoTooltip";
import ImageSuccses from "../images/register.svg"
import ImageError from "../images/Inform.svg"
import * as Auth from "../utils/Auth"
function Register({isOpen, setIsOpen, onClose, overlayClose}) {
  const [title, setTitle] = React.useState("")
  const [image, setImage] = React.useState("")
  const hist =useHistory();
  function handleRegisterUser({email, password}) {
    Auth.register(email, password).then(res => {
      if(res) {
        setIsOpen(true);
        setTitle("Вы успешно зарегистрировались!");
        setImage(ImageSuccses)
        setTimeout(()=>{
            hist.push("/sign-in");
            setIsOpen(false);
          }, 2000)
      } else {
        setIsOpen(true)
        setTitle("Что-то пошло не так! Попробуйте ещё раз.")
        setImage(ImageError)
      }
    })
    .catch(err => console.log(err))
    }
  
  
    return (
      <>
      <FormAuth title='Регистрация' button="Зарегистрироваться" name="register" authData={handleRegisterUser}/>
      <p className="auth__text">Уже зарегистрированы? <Link className="auth__link link-effect" to={"/sign-in"}>Войти</Link></p>
      <InfoTooltip isOpen={isOpen} title={title} image={image} onClose={onClose} overlayClose={overlayClose}/>
      </>
    )
}

export default Register