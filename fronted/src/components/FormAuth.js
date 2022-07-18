import React from "react";

function FormAuth({title, button, name, authData}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }
  function handleChangePassword(e) {
    setPassword(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    authData({
      email,
      password
    })
    setEmail('');
    setPassword('')
  }

    return(
      <section className="auth">    
        <h2 className="auth__title">{title}</h2>
        <form noValidate onSubmit={handleSubmit} name= {`${name}`} className={`auth__form`}>
          <input value={email || ''} onChange ={handleChangeEmail} type="email" id="input-email" name="inputEmail" required placeholder="Email" className="auth__input"/>
          <span className="auth__error"></span>
          <input value={password || ''} onChange ={handleChangePassword} type="password" id="input-password" minLength="7" maxLength="20" name="inputPassword" required placeholder="Пароль" className="auth__input"/>
          <span className="auth__error"></span>
          <button type="submit" className="auth__button">{button}</button>
        </form>
      </section>
    )
}

export default FormAuth