import './Login.css';
import { Link,useNavigate } from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios'
import {SnackbarProvider,enqueueSnackbar} from 'notistack';

function Create() {
  const [name,setName]=useState("")
  const [age,setAge]=useState("")
  const [weight,setWeight]=useState("")
  const [height,setHeight]=useState("")
  const [count,setCount]=useState("")
  const [password,setPassword]=useState("")
  const drink=0;
  const Navigate=useNavigate();
  const videoSrc = "/1234.mp4"; // No import needed
  const videoSrc2 = "/ad1.mp4";

  const sum=(e)=>{
    e.preventDefault();
    axios.post("https://bk-u031.onrender.com/api/create",{name,age,weight,height,drink,count,password})
    .then((res)=>{console.log(res.data)
      if(res.data.message=="success"){
        
        Navigate(`Home/${name}`);
        enqueueSnackbar('Created Successfully',{variant:'success'});
      }
      else{
        console.log("hai")
        enqueueSnackbar('User already exists!', { variant: 'warning' });
      }
    }).catch((error)=>{enqueueSnackbar("Invalid details", { variant: 'warning' });})
  }
  return (
    <SnackbarProvider maxSnack={3}>
    <div className="start-pages">
    <video autoPlay muted loop className="background-video">
      <source src="/1234.mp4" type="video/mp4" />
          Your browser does not support the video tag.
    </video>

        
      <h1 className="h1">WELCOME TO WATER TRACKER</h1>
      <div className="div1">
        <form className="form" onSubmit={sum}>
        <h2>CREATE</h2>
            <label htmlFor="username" className="label">Username:</label>
            <input className="input" value={name} onChange={(e)=>{setName(e.target.value)}} type="text" id="username" name="username"></input>
            <label htmlFor="age" className="label">Age:</label>
            <input className="input" value={age} onChange={(e)=>{setAge(e.target.value)}}type="text" id="age" name="age"></input>
            <label htmlFor="weight" className="label">Weight:</label>
            <input className="input" value={weight} onChange={(e)=>{setWeight(e.target.value)}}type="text" id="weight" name="weight"></input>
            <label htmlFor="height" className="label">Height:</label>
            <input className="input" value={height} onChange={(e)=>{setHeight(e.target.value)}}type="text" id="height" name="height"></input>
            <label htmlFor="count" className="label">Count:</label>
            <input className="input" value={count} onChange={(e)=>{setCount(e.target.value)}}type="text" id="count" name="count"></input>
            <label htmlFor="password" className="label">Password:</label>
            <input className="input" value={password} onChange={(e)=>{setPassword(e.target.value)}}type="text" id="password" name="password"></input>
            <button className="buttons" type="submit" value="submit">CREATE</button>
            <Link to='/Login'><button type='button' className="outerbutton">LOGIN</button></Link>
        </form>
      </div>
    </div>
    </SnackbarProvider>
  );
}

export default Create;