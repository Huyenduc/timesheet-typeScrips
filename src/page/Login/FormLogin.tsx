import React from 'react';

interface AccountProp {
  userName: string;
  password: string;
  setUserName: (params: string) => void;
  setPassword: (params: string) => void
}

const FormLogin = ({ userName, password, setUserName, setPassword }: AccountProp) => {
  return (
    <div className='formInput'>
      <label>UserName</label>
      <input placeholder="Username..." value={userName} type="text" onChange={e => setUserName(e.target.value)} />
      <label>Password</label>
      <input placeholder="Password...  " value={password} type="password" onChange={e => setPassword(e.target.value)} />

    </div>
  )
}

export default FormLogin
