import './Login.css';
import {useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SnackbarProvider,enqueueSnackbar } from 'notistack';


function Login() {
  const [name,setName]=useState("")
  const [password,setPass]=useState("")
  const Navigate=useNavigate();
  const videoSrc = "/1234.mp4"; // No import needed
  const videoSrc2 = "/ad1.mp4";

  const submit=(e)=>{
    e.preventDefault();
    axios.get(`https://bk-u031.onrender.com/api/login/${name}/${password}`)
    .then((res)=>{
      if(res.data.message!="Not Found"){
      Navigate(`/Home/${res.data.message}`)
      enqueueSnackbar(res.data.message,{variant:"success"})}
      else{
        enqueueSnackbar(res.data.message,{variant:"warning"})
      }

    })
    .catch((error)=>{enqueueSnackbar("User Not found",{variant:"warning"})})
  }
  return (
    <SnackbarProvider maxSnack={3}>
    <div className="start-pages">
      <video autoPlay muted loop className="background-video">
        <source src="1234.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1 className="h1">WELCOME TO WATER TRACKER</h1>
      <hr></hr>
      <div className="div1">
      <h2>LOGIN</h2>
        <form onSubmit={submit} className="form">
            <label htmlFor="username" className="label">Username:</label>
            <input className="input" value={name} type="text" id="username" name="username" onChange={(e)=>setName(e.target.value)}></input>
            <label htmlFor="password" className="label">Password:</label>
            <input className="input" value={password} type="text" id="password" name="password" onChange={(e)=>setPass(e.target.value)}></input>
            <button className="buttons" type="submit" value="submit">LOGIN</button>
            <Link to='/Create'><button type='button' className="outerbutton">CREATE</button></Link>
        </form>
      </div>
    </div></SnackbarProvider>
  );
}

export default Login;