import React, { useState } from 'react';
import {isMobile} from 'react-device-detect';
import { useHistory } from 'react-router-dom';
const VisitorAPI = require("visitorapi");


function Header() {

    const [showNav, setshowNav] = useState(false);
    const [showdropdown, setshowdropdown] = useState(false);
    
    const [visitorData, setVisitorData] = useState({}); // store the whole json
    const [countryCode, setCountryCode] = useState("");
    const [countryName, setCountryName] = useState("");
    const [city, setCity] = useState("");
    const [headercolor, setheadercolor] = useState("bg-transparent");

    const listenScrollEvent = (event) => {
        if (window.scrollY > 0) {
          return setheadercolor("bg-stone")
        } else {
          return setheadercolor("bg-transparent")
        } 
    }

    let history = useHistory();

    React.useEffect(() => {

        // VisitorAPI("6BfjTMbQLanRqHjg6qIE").then(data => {
        // setVisitorData(data);
        // setCountryName(data.countryName);
        // setCountryCode(data.countryCode);
        // setCity(data.city);
        // console.log(data);
        // }).catch(error => {
        //     console.log(error)
        // });
          

        if(!isMobile){
            setshowNav(true);
        }

        window.addEventListener('scroll', listenScrollEvent);

        return () => window.removeEventListener('scroll', listenScrollEvent);

    }, []);
    
    return (
        <>
        <header className={headercolor + " fixed top-0 left-0 w-full z-10"}>
            <div className="w-full flex justify-end bg-transparent">
                <div className="w-fit py-2 lg:px-16 px-6 flex gap-8">
                    <p className="font-semibold text-white text-sm">CALL NOW (510) 000 000</p>
                    <div className="flex flex-row gap-1 items-center text-white">
                        <i className="fa-solid fa-map-pin text-xs"></i>
                        <p className='text-sm'>{city}, {countryCode}</p>
                    </div>
                </div>
            </div>
            <nav className='pb-6 pt-2 lg:px-16 px-6 flex flex-row justify-between items-center'>
                <div class="w-2/5 flex justify-start">
                    <div class="logo">
                        <a onClick={()=>history.push('/')}>
                            <img className='w-56 -mt-2' src="images/logo/Duforless_Logo_green.png" alt="Duforless_Logo" />
                        </a>
                    </div>
                </div>
                {!showNav ? 
                    <i className="fa-bars fa-solid text-lg text-purple-900 lg:hidden z-50" onClick={()=>setshowNav(!showNav)}></i> :
                    <i className="fa-times fa-solid text-lg lg:hidden z-50" onClick={()=>setshowNav(!showNav)}></i>}
                {showNav ?
                    <div class="lg:w-3/5 w-full lg:relative absolute bg-transparent flex lg:flex-row flex-col justify-between items-center lg:h-auto h-screen font-semibold lg:text-white text-black top-0 left-0 py-32 lg:py-0 fade-in z-10">
                        <a onClick={()=>{if(isMobile){setshowNav(!showNav)}}} className="font-semibold" href="#services">Services</a>
                        <a onClick={()=>{if(isMobile){setshowNav(!showNav)}}} className="font-semibold" href="#whyus">Why Us</a>
                        <a onClick={()=>{if(isMobile){setshowNav(!showNav)}}} className="font-semibold" href="#">Insurance and license</a>
                        <a onClick={()=>{history.push('/about');if(isMobile){setshowNav(!showNav)}}} className="font-semibold">Who we are</a>
                        <a onClick={()=>{if(isMobile){setshowNav(!showNav)}}} className="font-semibold" href="#contact">Contact</a>
                        {/* {isMobile ?
                            <>
                            <a href="/cars">Insurance and license</a>
                            <a href="/cabs">Why Us</a>
                            <a href="/mini_cabs">Contac</a>
                            </>
                        : <div class="relative cursor-pointer">
                            <a onClick={()=>setshowdropdown(!showdropdown)} >CARS FLEET</a>
                            {showdropdown ? 
                            <div class='absolute w-24 flex flex-col py-4 px-2 top-5 left-0 shadow-lg fade-in'>
                                <a href="/cars">CARS</a>
                                <a href="/cabs">CABS</a>
                                <a href="/mini_cabs">MINI CABS</a>
                            </div>: null}
                        </div>} */}
                    </div> : null}
            </nav>
        </header>
        </>

    );
}

export default Header;
