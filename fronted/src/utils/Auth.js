export const BASE_URL = 'https://api.alexholm222.students.nomoredomains.xyz';
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        password: password,
        email: email
    })
  })
  .then((response) => {
    if(response.ok) {
      return response.json()
    } else {
      return Promise.reject(`Ошибка: ${response.status}`)
    }
  })
  .then((res) =>{
    return res
  })
  .catch((err) =>{console.log(err)})
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email, 
          password
        })
    })
    .then((response => response.json()))
    .then((data) => {
      if (data.token){
        localStorage.setItem('token', data.token);
        return data;
      }
    })
    .catch(err => console.log(err))
  }; 

  export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))
  } 