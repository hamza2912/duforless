import React from "react";
import { useHistory } from 'react-router-dom';


function Footer() {


    return (

        <footer id='contact' className="bg-green grid lg:grid-cols-3 grid-cols-1 gap-4 px-5 py-8">
            <div className="logo pl-8">
                <img className='w-64' src="images/logo/Duforless_Logo_white.png" alt="Duforless_Logo" />
            </div>
            <div class="flex flex-col mt-8 lg:mt-0">
                <h2 class="text-white font-semibold">Menu</h2>
                <div class="w-full h-auto flex flex-col mt-4 text-white">
                    <a class="text-sm hover:text-gray-600" href="#services">Services</a>
                    <a class="text-sm hover:text-gray-600 mt-2" href="#whyus">Why Us</a>
                    <a class="text-sm hover:text-gray-600 mt-2" href="#">Insurance and license</a>
                    <a class="text-sm hover:text-gray-600 mt-2" href="#whoweare">Who we are</a>
                    <a class="text-sm hover:text-gray-600 mt-2" href="#contact">Contact</a>
                </div>
                <a href="#" class="text-white font-semibold hover:text-gray-600 mt-4">Terms & Conditions</a>
                <a href="#" class="text-white font-semibold hover:text-gray-600 mt-4">Privacy & Policy</a>
            </div> 
            <div className="mt-8 lg:mt-0">  
                <div class="flex flex-col">
                    <p class="mt-4 text-white"><i class="fa-solid fa-location-dot mr-2"></i>
                        ABC Road, Washington NW10 6PH</p>
                    <p class="mt-4 text-white"><i class="fa-solid fa-envelope mr-2"></i>
                        info@duforless.com</p>
                    <p class="mt-4 text-white"><i class="fa-solid fa-phone mr-2"></i>
                        00000000000</p>
                </div>
                <div className="w-1/2 flex justify-between mt-8">
                    <a class="text-white hover:text-gray-600" href="#"><i class="fa-brands fa-twitter"></i></a>
                    <a class="text-white hover:text-gray-600" href="#"><i class="fa-brands fa-facebook-f"></i></a>
                    <a class="text-white hover:text-gray-600" href="#"><i class="fa-brands fa-instagram"></i></a>
                    <a class="text-white hover:text-gray-600" href="#"><i class="fa-brands fa-pinterest-p"></i></a>
                </div>
            </div>
            
        </footer>       

    );
}

export default Footer;