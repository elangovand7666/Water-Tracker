import { useEffect, useState } from "react";
import {useParams,Link} from 'react-router-dom';
import axios from "axios";
import './Home.css'
import { enqueueSnackbar, SnackbarProvider } from "notistack";

export default function About(){
    const videoSrc = "/1234.mp4"; // No import needed
    const videoSrc2 = "/ad1.mp4";
    const {id}=useParams();
    const [user,setUser]=useState({})

    console.log(id)
    useEffect(()=>{
        axios.get(`https://bk-u031.onrender.com/api/check/${id}`)
        .then((res)=>{
            setUser(res.data.message)
            console.log(user)
        })
        .catch((error)=>{
            console.error(error)
        })
    },[id])

    const submit=(e)=>{
        e.preventDefault();
        axios.put(`https://bk-u031.onrender.com/api/update/${id}`,user)
        .then((res)=>{
            setUser(res.data.message)
            enqueueSnackbar(`${user.name} Your Details updated succesfully`,{variant:"success"})
        })
        .catch((error)=>{
            console.error(error)
        })
    }

    return(
        <SnackbarProvider maxSnack={1}>
        <video autoPlay muted loop className="background-video">
            <source src="/1234.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>

                    <div className="top">
                        <h2>ES 💧Tracker</h2>
                        <div className="topls">
                        <Link to={`/Home/${id}`}>
                            <button className="topbutton">Home</button>
                            </Link>
                                <button className="topbuttons">About</button>
                            <Link to='/'>
                                <button className="topbutton">Logout</button>
                            </Link>
                        </div>
                    </div>
            <h1 class="hello">Welcome {user.name} Know Yourself</h1>

            <div class="box">
                <h1>Update Your Profile</h1>
                <form onSubmit={submit} class="form-container">
                    <label for="name">NAME</label>
                    <input value={user.name} onChange={(e)=>setUser({ ...user, name: e.target.value })}></input>
                    <label for="age">AGE</label>
                    <input value={user.age} onChange={(e)=>setUser({ ...user, age: e.target.value })}></input>
                    <label for="height">HEIGHT</label>
                    <input value={user.height} onChange={(e)=>setUser({ ...user, height: e.target.value })}></input>
                    <label for="weight">WEIGHT</label>
                    <input value={user.weight} onChange={(e)=>setUser({ ...user, weight: e.target.value })}></input>
                    <label for="count">DAILY WATER COUNT</label>
                    <input value={user.count} onChange={(e)=>setUser({ ...user, count: e.target.value })}></input>
                    <button type="submit" class="topbuttons">UPDATE</button>
                </form>
            </div>
        </SnackbarProvider>
    )
}