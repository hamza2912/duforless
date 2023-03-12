import React from "react";
import axios from "axios";


function About() {

    const baseurl= "https://dufferless-storage.s3.us-west-1.amazonaws.com/";

    const [videoUrl, setvideoUrl] = React.useState([]);

    React.useEffect(() => {

             
        axios.get('http://3.101.23.165:9000/fileUpload?fileType=VIDEO&status=true')
          .then(res => {
            console.log(res.data);
            setvideoUrl(res.data[0]?.url);
        })

    
      }, []);

    return (

    <section id='whoweare' className='w-full bg-white px-5 pb-16 pt-32'>
      <div className='container mx-auto flex items-center jusitfy-center h-full'>
        <div className='lg:w-2/3 w-4/5 mx-auto flex flex-col items-center justify-center h-full gap-10'>
          <h1 className='text-purple-900 font-bold text-4xl'>Who we are</h1>
          <p>institutional text</p>
          <div className='w-full min-h-96 bg-purple-200'>
            <video className='w-full' controls>
              <source src={baseurl + videoUrl} type="video/mp4" />
            </video>  
          </div>
          <button className='w-60 bg-purple-800 text-white font-semibold py-3 rounded-lg border border-purple-800 hover:bg-white hover:text-purple-800 focus:outline-none transition-all'>REQUEST A FREE QUOTE</button>
        </div>
      </div>
    </section> 

    );
}

export default About;