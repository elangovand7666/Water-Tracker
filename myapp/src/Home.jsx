import { Link,useParams } from 'react-router-dom';
import './Home.css';
import { useEffect, useRef,useState } from 'react';
import confetti from 'canvas-confetti';
import axios from 'axios'
import { SnackbarProvider,enqueueSnackbar } from 'notistack';

function Home() {
    const [user,setUser]=useState({});
    const {id}=useParams();
    const [pern,setPern]=useState()
    const watert=Math.floor((user.weight*0.033)*user.age*0.2);
    const [cal,setcal]=useState();
    const [temp,setTemp]=useState(37.0)
    const [con,setCon]=useState()
    const [st,setSt]=useState();
    const videos = "/1234.mp4"; // No import needed
    const videos2 = "/ad1.mp4";

    useEffect(()=>{
        axios.get(`https://bk-u031.onrender.com/api/check/${id}`)
        .then((res)=>{
            setUser(res.data.message)
            setPern(Math.floor((res.data.message.drink / Math.floor((res.data.message.weight*0.033)*res.data.message.age*0.2))*100));
            setcal(()=>{
                return (((res.data.message.drink*12)/Math.floor((res.data.message.weight*0.033)*res.data.message.age*0.2)*12)*100).toFixed(2);
            })
            setSt(Math.floor((10*res.data.message.weight+6.25*res.data.message.height-5*res.data.message.age+5)*1.375).toFixed(0))
            const bd = (res.data.message.weight / ((res.data.message.height / 100) * (res.data.message.height / 100)));
            if(bd<18.5)
            {
                setCon("Bad");
            }
            else if(bd>=18.5 && bd<24.9)
            {
                setCon("Normal")
            }
            else if(bd>=25.0 && bd <29.9)
            {
                setCon("Good")
            }
            else{
                setCon("Excellent")
            }
            console.log(user)
        })
        .catch((error)=>{
            console.error(error)
        })
    },[id])


    const videoRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }, 4200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const confettiButton = document.getElementsByClassName("confettibutton")[0];
        const handleConfetti = () => {
            confetti();
        };
        if (confettiButton) {
            confettiButton.addEventListener("click", handleConfetti);
        }
        return () => {
            if (confettiButton) {
                confettiButton.removeEventListener("click", handleConfetti);
            }
        };
    }, []);

    const Drinks=()=>{
        axios.put(`https://bk-u031.onrender.com/api/drink/${id}/${watert}`)
        .then((res)=>{
            if(res.data.message=="100%success"){
                setPern(100)
                setTimeout(()=>{
                    setPern(0)
                    setcal(0)
                    setTemp(37.0)
                },2000)
                enqueueSnackbar(`Welldone 👏 ${user.name} Successfully completed Today Task`,{variant:'success'})
            }
            else{
                setPern(Math.floor((res.data.message / watert) * 100));
                setcal(()=>{
                    return (((res.data.message*12)/watert*12)*100).toFixed(2);
                })
                setTemp((res.data.message>(watert/2)?temp-0.2:temp+0.2).toFixed(2))
                
            }
        })
    }
    const tempcolor = (temp) => {
        if (temp < 36.8) {
            return 'green'; 
        } else if (temp >= 36.8 && temp<=37.2) {
            return 'orange';
        } else {
            return 'red';
        }
    };
    const bdcolor=(con)=>{
        if(con=="Bad")
        {
            return "red";
        }
        else if(con=="Normal")
        {
            return "orange";
        }
        else if(con=="Good")
        {
            return "yellow";
        }
        else{
            return "green";
        }
    }

    return (
        <SnackbarProvider maxSnack={1}>
            <video autoPlay muted loop className="background-video">
                <source src={videos} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="top">
                <h2>ES 💧Tracker</h2>
                <div className="topls">
                    <button className="topbuttons">Home</button>
                    <Link to={`/About/${id}`}>
                        <button className="topbutton">About</button>
                    </Link>
                    <Link to='/'>
                        <button className="topbutton">Logout</button>
                    </Link>
                </div>
            </div>
            <h1 class="hello">Hello {user.name} You have to Drink {watert} Liter/day</h1>
            <div className="box">
            <h1 style={{color:'purple'}}>Water Level</h1>
            <hr style={{width:'240px',color:'black'}}></hr>
                <h1>💧 {pern}% Taken</h1>
                <video ref={videoRef} autoPlay muted className="display-video">
                    <source src={videos2} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <h2>You have to drink {Number.parseFloat(watert/user.count).toFixed(4)} L</h2>
                <button onClick={Drinks} class="confettibutton">Drink</button>
            </div>
            <div className='box'>
                <h1 style={{color:'purple'}}>Body Report</h1>
                <hr style={{width:'240px',color:'black'}}></hr>
                <h2>Calcories : {cal}🔥</h2>
                <h2>Temperatue 🌡️</h2>
                <h1 class="temp" style={{color:tempcolor(temp),fontSize:'70px'}}>{temp} °C</h1>
                <h2>Body Condition ❤️</h2>
                <h1 style={{color:bdcolor(con)}}>{con}</h1>
            </div>
            <div className='box'>
                <h1 style={{color:'purple'}}>Eat Food</h1>
                <hr style={{width:'180px',color:'black'}}></hr>
                <h2>BreakFast : {(st*28)/100} kcal</h2>
                <h2>Lunch : {(st*38)/100} kcal</h2>
                <h2>Dinner : {(st*29)/100} kcal</h2>
                <h2>Junk Food : {(st*9)/100} kcal</h2>
            </div>
        </SnackbarProvider>
    );
}

export default Home;