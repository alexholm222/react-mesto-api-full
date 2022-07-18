import React from "react";
import FormAuth from "./FormAuth"
import InfoTooltip from "./InfoTooltip";
import Image from "../images/Inform.svg"
import * as Auth from "../utils/Auth"
import { useHistory } from "react-router-dom"
function Login({onClose, isOpen, overlayClose, handleLogin, setIsOpenError, userEmail}) {
  const hist =useHistory();
  function handleLoginUser({email, password}) {
    Auth.authorize(email, password).then(data => {
      if(data.token){
        handleLogin(true);
        userEmail(email)
        hist.push('/')
      } 
    })
    .catch(()=>{setIsOpenError(true)})
  }
  
    return (
      <>
      <FormAuth title='Вход' button="Войти" name="login"  authData={handleLoginUser}/>
      <InfoTooltip isOpen={isOpen} title="Что-то пошло не так!
Попробуйте ещё раз." image={Image} onClose={onClose} overlayClose={overlayClose}/>
      </>
    )
}

export default Login