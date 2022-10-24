import React, { useEffect, useState } from 'react'
import '../Login/Login.css'
import { useNavigate } from 'react-router-dom';
import FormLogin from './FormLogin'
// import Logo from '../../assets/image/Logo.png'
import axios from '../../api/axios'
import { LOGIN_API } from '../../api/endpoint';
import appConstants from '../../constants/appConstants';
import { getAuthenticate } from '../../redux/action/TokenAuth';
import { useDispatch } from 'react-redux';
import { IUserForm } from '../../interfaces/userType'
import { AppDispatch } from '../../redux/store';



const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState(false);


  const dispath = useDispatch <AppDispatch>();
  useEffect(() => {
  
  
    const token = localStorage.getItem(appConstants.USER_TOKEN)
    if (token) {
      navigate('/Task')
    }
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (userName.trim() === "" && password.trim() === "") {
      return
    }
    dispath(
      getAuthenticate({
        userNameOrEmailAddress: "admin",
        password: "123qwe",
        rememberClient: true
      }))



  }

  return (
    <div className='Login'>
      <form onSubmit={handleSubmit}>
        <div className='title'>

          <img src={require("../../assets/image/logo.png")} />
        </div>
        <FormLogin
          userName={userName}
          password={password}
          setUserName={setUserName}
          setPassword={setPassword}
        />

        <div className={error ? 'Error2' : 'Error'}>
          <p>Account or password is not precision !</p>

        </div>
        {/* <p>{error2}</p> */}

        <button className='btnLogin' type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login