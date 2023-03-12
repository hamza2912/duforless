import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';


function Home() {

  const baseurl= "https://dufferless-storage.s3.us-west-1.amazonaws.com/";

  const [showModal, setshowModal] = React.useState(false);
  const [quiz, setQuiz] = React.useState([]);
  const [bannerImages, setbannerImages] = React.useState("");
  const [gallery, setgallery] = React.useState([]);
  const [quizCount, setQuizCount] = React.useState(0);
  const [Fname, setFname] = React.useState('');
  const [Lname, setLname] = React.useState('');
  const [email, setemail] = React.useState('');
  const [phone, setphone] = React.useState('');
  const [otp, setotp] = React.useState('');
  const [leadData, setleadData] = React.useState([]);
  const [showOTP, setshowOTP] = React.useState(false);
  const [showCost, setshowCost] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [startPosition, setstartPosition] = React.useState(0);
  function updateCarouselPosition(object){ 
    if(object.item.index != startPosition){ 
      setstartPosition(object.item.index); 
    } 
  } 

  React.useEffect(() => {

    // localStorage.removeItem('userotp');
    // localStorage.removeItem('userphone');
    
    axios.get('http://3.101.23.165:9000/quiz?status=true', {headers: {'access-control-allow-origin': '*'}})
      .then(res => {
        console.log(res.data);
        setQuiz(res.data);
        setQuizCount(res.data.length)
    })

    axios.get('http://3.101.23.165:9000/fileUpload?fileType=BANNER&status=true', {headers: {'access-control-allow-origin': '*'}})
      .then(res => {
        console.log(res.data);
        setbannerImages(res.data)
    })

    axios.get('http://3.101.23.165:9000/fileUpload?fileType=GALLERY&status=true', {headers: {'access-control-allow-origin': '*'}})
      .then(res => {
        console.log(res.data);
        setgallery(res.data);
    })

  }, []);

  function handleOptions(quizID, optionValue){
    console.log(quizID);
    var leads = leadData;
    var newLead = false;
    if(leads.length == 0){
      leads.push({
        quizId: quizID,
        answer: optionValue
      })
    } else{
      leads.forEach(lead=>{
        if(lead.quizId == quizID){
          leads = leads.filter(x=> x.quizId != lead.quizId)
          leads.push({
            quizId: quizID,
            answer: optionValue
          })
          newLead = true;
        }
      })
      if(!newLead){
        leads.push({
          quizId: quizID,
          answer: optionValue
        })
      }
    }
    console.log(leads);
    localStorage.setItem('LeadsData',JSON.stringify(leads));
    }

  function handleFormOptions(value, field){
    var firstname = Fname;
    var lastname = Lname;
    var userphone = phone;
    var useremail = email;
    var userotp = otp;
    
    if(field == 'firstname'){
      firstname = value;
      localStorage.setItem('firstname',firstname);
    }
    if(field == 'lastname'){
      lastname = value;
      localStorage.setItem('lastname',lastname);
    }
    if(field == 'phone'){
      userphone = value;
      localStorage.setItem('userphone',userphone);
    }
    if(field == 'email'){
      useremail = value;
      localStorage.setItem('useremail',useremail);
    }
    if(field == 'otp'){
      userotp = value;
      localStorage.setItem('userotp',userotp);
    }
  }

  function sendOTP(phone){
    axios.post('http://3.101.23.165:9000/lead/otp', {name: localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname'), phone: localStorage.getItem('userphone')}, {headers: {'access-control-allow-origin': '*'}})
        .then((res) => {
          console.log(res);
          if(res.status == 201){
            setshowOTP(true);
          }
      }).catch(err=>{
        alert(err.response.data.message)
      }
    );
  }

  function submitQuiz(){
    setshowOTP(false);
    setloading(true);
    setTimeout(() => {
      setloading(false); 
      setshowCost(true); 
    }, 3000);
    // if(localStorage.getItem('userotp') != '' && localStorage.getItem('userotp') != null){
    //   var lead = {
    //     name:localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname'),
    //     phone:localStorage.getItem('userphone'),
    //     email:localStorage.getItem('useremail'),
    //     price:'100',
    //     otp: parseInt(localStorage.getItem('userotp')),
    //     leadData: JSON.parse(localStorage.getItem('LeadsData'))
    //   }
    //   console.log(JSON.stringify(lead));
    //   axios.post('http://3.101.23.165:9000/lead', lead, {headers: {'access-control-allow-origin': '*'}})
    //     .then((res) => {
    //       console.log(res);
    //       if(res.data?.messege == 'success'){
    //         setshowModal(false);
    //       }
    //   }).catch(err=>{
    //     alert(err.response.data.message)
    //   }

    //   )
    //   setshowOTP(false);
    // } else{
    //   alert('Please enter OTP');
    // }
      
  }

  return (
    <>  
    <section className='bg-cover h-screen flex justify-center items-center' style={{backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.654), rgba(15, 10, 10, 0.419)), url(${baseurl+bannerImages[0]?.url})`}}>
      <div className='w-1/2 flex flex-col gap-6 text-white'>
        <h1 className='text-8xl font-bold'>THE REAL PRICE <br />NOT BULLSH**T</h1>
        <p className='text-lg font-medium'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        <div className='flex justify-center'>
          <button onClick={()=>setshowModal(true)} className='mt-5 w-60 m-auto bg-orange text-white font-semibold py-3 rounded-lg border border-orange hover:bg-white  focus:outline-none transition-all'>REQUEST A FREE QUOTE</button>
        </div>
      </div>
    </section>
    <section className='bg-cover h-screen flex justify-center items-center' style={{backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.654), rgba(15, 10, 10, 0.419)), url(${baseurl+bannerImages[1]?.url})`}}>
      <div className='w-1/2 flex flex-col gap-6 text-white'>
        <h1 className='text-6xl font-bold'>WE CA HELP YOU SAVE 45% ON YOUR BUSINESS BY USING SIMPLE TOOL <br /><span className='text-7xl'>TRANSPARENCY</span></h1>
        <p className='text-lg font-medium'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        <div className='flex justify-center'>
          <button onClick={()=>setshowModal(true)} className='mt-5 w-60 m-auto bg-orange text-white font-semibold py-3 rounded-lg border border-orange hover:bg-white  focus:outline-none transition-all'>REQUEST A FREE QUOTE</button>
        </div>
      </div>
    </section>
    <section className='w-full bg-gray-50'>
      <div id='services' className='container mx-auto px-5 text-center pt-16 pb-8'>
        <h1 className='text-black font-bold text-4xl uppercase'>Choose your project</h1>
        <div className='grid lg:grid-cols-4 grid-cols-1 mt-16'>
          <div className='flex w-full justify-center items-center lg:h-48 h-24 border border-gray-400'>
            <div className='flex gap-4 items-center text-2xl'>
              <i class="fa-solid fa-border-all"></i>
              <p>Retaining wall</p>
            </div>
          </div>
          <div className='flex w-full justify-center items-center lg:h-48 h-24 border border-gray-400'>
            <div className='flex gap-4 items-center text-2xl'>
              <i class="fa-solid fa-signs-post"></i>
              <p>Patios and driveway</p>
            </div>
          </div>
          <div className='flex w-full justify-center items-center lg:h-48 h-24 border border-gray-400'>
            <div className='flex gap-4 items-center text-2xl'>
              <i class="fa-solid fa-sink  "></i>
              <p>Outdoor kitchen</p>
            </div>
          </div>
          <div className='flex w-full justify-center items-center lg:h-48 h-24 border border-gray-400'>
            <div className='flex gap-4 items-center text-2xl'>
              <i class="fa-solid fa-mountain"></i>
              <p>Landscaping</p>
            </div>
          </div>
          <div className='flex w-full justify-center items-center lg:h-48 h-24 border border-gray-400'>
            <div className='flex gap-4 items-center text-2xl'>
              <i class="fa-solid fa-person-swimming"></i>
              <p>Pool decking</p>
            </div>
          </div>
          <div className='flex w-full justify-center items-center lg:h-48 h-24 border border-gray-400'>
            <div className='flex gap-4 items-center text-2xl'>
              <i class="fa-brands fa-confluence"></i>
              <p>Pergolas and fence</p>
            </div>
          </div>
          <div className='flex w-full justify-center items-center lg:h-48 h-24 border border-gray-400'>
            <div className='flex gap-4 items-center text-2xl'>
              <i class="fa-solid fa-sign-hanging"></i>
              <p>Demolition</p>
            </div>
          </div>
          <div className='flex w-full justify-center items-center lg:h-48 h-24 border border-gray-400'>
            <div className='flex gap-4 items-center text-2xl'>
              <i class="fa-solid fa-border-all"></i>
              <p>Retaining wall</p>
            </div>
          </div>
        </div>


      </div>
    </section>
    <section className='flex justify-center py-20 bg-orange'>
      <div className='flex flex-col w-2/3 text-center'>
        <h1 className='text-6xl font-bold text-white'>YES, WE CAN MAKE IT CHEAPER, BETTER AND FASTER</h1>
        <h1 className='text-7xl font-bold text-black'>SAVE 45% NOW</h1>
      </div>
    </section>
    <section className='w-full container mx-auto bg-white relative grid grid-cols-2 px-5 py-20 items-center'>
        <div className='flex flex-col gap-5'>
          <h1 className='text-4xl text-black font-semibold'>Transform Your Outdoor <br />
          Space with Durable and <br />
          Stylish Pavers</h1>
          <p>From driveways to patios, enhance your property with a variety of colors and designs</p>
          <div className='flex gap-4'>
            <button onClick={()=>setshowModal(true)} className='w-60 bg-orange text-white font-semibold py-3 rounded-lg border border-orange hover:bg-white  focus:outline-none transition-all'>REQUEST A FREE QUOTE</button>
            <button className='w-60 bg-gray-50 text-black font-semibold py-3 rounded-lg border border-gray-50 hover:bg-black hover:text-white focus:outline-none transition-all'>Explore More</button>
          </div>
        </div>
        <div className='flex pl-10'>
          <img className='w-96 h-96 clip-path' src={baseurl+bannerImages[2]?.url} alt="" />
          <img className='w-96 h-96 clip-path -ml-56' src={baseurl+bannerImages[3]?.url} alt="" />
        </div>
    </section>
    <section className='bg-gray-50 h-screen hidden'>
      <div className='container mx-auto px-5 grid grid-cols-2'>
        <div></div>
        <div className='flex flex-col'>
          <h1>Transform Your Outdoor Space</h1>
          <div className='grid grid-cols-3'>
            <div className='flex items-center gap-2'>
              <i className='fa-solid fa-dollar'></i>
              <p>Browse our services.</p>
            </div>
            <div className='flex items-center gap-2'>
              <i className='fa-solid fa-money-bill'></i>
              <p>Get a Free Consult.</p>
            </div>
            <div className='flex items-center gap-2'>
              <i className='fa-solid fa-money'></i>
              <p>Save serious cash.</p>
            </div>
          </div>
        </div>
      </div>
    </section>  
    <section id='whyus' className='w-full bg-gray-50 py-16 px-5'>
      <div className='container mx-auto'>
      <h1 className='text-black font-bold text-4xl text-center'>Why Us?</h1>
        <div className='grid lg:grid-cols-2 grid-cols-1 items-center my-16'>
          <img src="images/walls.jpg" alt="" />
          <div className='flex flex-col lg:pl-8 mt-8 lg:mt-0 gap-8'>
            <p className='text-lg'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            <button onClick={()=>setshowModal(true)} className='w-60 bg-orange text-white font-semibold py-3 rounded-lg border border-orange hover:bg-white  focus:outline-none transition-all'>REQUEST A FREE QUOTE</button>
          </div>
        </div>
      </div>
    </section> 
    <section className='w-full bg-white py-16 px-5'>
      <div className='container mx-auto'>
        <h1 className='text-black font-bold text-4xl text-center'>Bring your Outdoor Vision to Life</h1>
        <div className='flex flex-row flex-wrap mt-16 mb-0'>
          {/* {gallery.map((image, index) => {
            return (
              <img className='w-2/3 h-auto' src={baseurl + image.url} alt="Gallery Image" />
            )
          })} */}
          <img className='w-2/3 h-auto' src={baseurl + gallery[0]?.url} alt="Gallery Image" />
          <img className='w-1/3 h-auto' src={baseurl + gallery[1]?.url} alt="Gallery Image" />
          <img className='w-1/3 h-auto' src={baseurl + gallery[2]?.url} alt="Gallery Image" />
          <img className='w-1/3 h-auto' src={baseurl + gallery[3]?.url} alt="Gallery Image" />
          <img className='w-1/3 h-auto' src={baseurl + gallery[5]?.url} alt="Gallery Image" />
          <div className='w-full h-screen bg-cover bg-no-repeat flex items-center justify-center' style={{backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(15, 10, 10, 0.7)), url(${baseurl+gallery[4]?.url})`}}>
            <div className='flex flex-col w-1/2 items-center gap-10 text-center'>
              <img className='w-56' src="images/logo/Duforless_Logo_green.png" alt="Duforless_Logo" />
              <p className='text-white'>From driveways to patios, enhance your property with a variety of colors and designs</p>
              <h1 className='text-3xl font-bold text-white mt-10'>YES, WE CAN MAKE IT CHEAPER, BETTER AND FASTER</h1>
              <button onClick={()=>setshowModal(true)} className='w-60 bg-orange text-white font-semibold py-3 rounded-lg border border-orange hover:bg-white  focus:outline-none transition-all'>REQUEST A FREE QUOTE</button>
            </div>
          </div>
        </div>     
      </div>
    </section> 
    <section className='w-full bg-gray-50 py-16 px-5'>
      <div className='container mx-auto'>
        <h1 className='text-black font-bold text-4xl text-center'>Our Partners and Suppliers</h1>
        <div className='grid lg:grid-cols-3 grid-cols-2 gap-4 my-16'>
          <div className='bg-gray-100 h-64 border border-gray-400'></div>
          <div className='bg-gray-100 h-64 border border-gray-400'></div>
          <div className='bg-gray-100 h-64 border border-gray-400'></div>
          <div className='bg-gray-100 h-64 border border-gray-400'></div>
          <div className='bg-gray-100 h-64 border border-gray-400'></div>
          <div className='bg-gray-100 h-64 border border-gray-400'></div>
        </div>
        <div className='flex justify-center'>
          <button onClick={()=>setshowModal(true)} className='w-60 bg-orange text-white font-semibold py-3 rounded-lg border border-orange hover:bg-white  focus:outline-none transition-all'>REQUEST A FREE QUOTE</button>
        </div>      
      </div>
    </section>  
    { showModal ? 
    <div>
        <div className='dimmer'></div>
        <div className='w-11/12 bg-white h-fit z-10 fade-in fixed left-0 right-0 m-auto top-0 bottom-0 shadow-xl'>
          <i onClick={()=>setshowModal(false)} className="fas fa-close absolute top-5 right-5 cursor-pointer z-10"></i>
          <OwlCarousel className='owl-theme' margin={10} items={1} nav={true} dots={false}
            startPosition={startPosition}
            onDragged={(object) => updateCarouselPosition(object)}
          >
          {quiz.map((question, index) => {
            return (
              <div className='item grid grid-cols-2' key={index}>
                <div className='px-10 py-20 flex flex-col gap-3 text-white justify-end h-quiz bg-no-repeat bg-cover' style={{backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(15, 10, 10, 0.419)), url(${baseurl+bannerImages[3]?.url})`}}>
                  <h1 className='text-4xl font-bold text-white'>DID YOU KNOW?</h1>
                  <p className='font-medium'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div className='p-6 flex flex-col items-center'>
                  <img className='quiz-logo mt-6' src="images/logo/Duforless_Logo_green.png" alt="Duforless_Logo" />
                  <h1 className='text-2xl mt-6 text-center'>{index+1}. {question?.question}</h1>
                  <p className='text-center text-xs mt-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                  <div className={`grid ${question?.quizOption.length > 5 ? 'grid-cols-3': 'grid-cols-2'} gap-4 mt-8`}>
                    {question?.quizOption.map((option, index)=>{
                      return (
                        <div key={index} className='flex flex-col'>
                          {/* <div className='w-full h-40 bg-gray-50 rounded-lg'>
                            <img className='w-full h-full' src={baseurl+option.imageUrl} alt="" />
                          </div> */}
                          <div className='flex items-center mt-4 gap-2 border border-black px-4 py-1'>
                            <input className='cursor-pointer' onChange={(event) => handleOptions(question.id, option.value)} name={`${question.id}`} value={option.value} type="radio" />
                            <label>{option.value}</label>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {/* <p className='text-center text-orange mt-20'>Question {index+1} out of {quizCount+1}</p> */}
                </div>
              </div>
            )
          })}
          <div className='item grid grid-cols-2'>
                <div className='px-10 py-20 flex flex-col gap-3 text-white justify-end h-quiz bg-no-repeat bg-cover' style={{backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(15, 10, 10, 0.419)), url(${baseurl+bannerImages[3]?.url})`}}>
                  <h1 className='text-4xl font-bold text-white'>DID YOU KNOW?</h1>
                  <p className='font-medium'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <div className='p-6 flex flex-col items-center'>
                  <img className='quiz-logo mt-6' src="images/logo/Duforless_Logo_green.png" alt="Duforless_Logo" />
                  <h1 className='text-2xl text-center mt-5'>{quizCount+1}. Please provide your details so we can approach you back!</h1>
                  <p className='text-center text-xs mt-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                  <div className='grid grid-cols-2 gap-4 mt-8'>
                    <input onChange={(event)=>handleFormOptions(event.target.value, 'firstname')} className='bg-gray-50 p-3 rounded-lg' type="text" placeholder='First Name' />
                    <input onChange={(event)=>handleFormOptions(event.target.value, 'lastname')} className='bg-gray-50 p-3 rounded-lg' type="text" placeholder='Last Name' />
                    <input onChange={(event)=>handleFormOptions(event.target.value, 'phone')} className='bg-gray-50 p-3 rounded-lg' type="text" placeholder='Phone' />
                    <input onChange={(event)=>handleFormOptions(event.target.value, 'email')} className='bg-gray-50 p-3 rounded-lg' type="email" placeholder='Email' />
                    <input onChange={(event)=>handleFormOptions(event.target.value, 'address')} className='bg-gray-50 p-3 rounded-lg col-span-2' type="text" placeholder='Complete Address' />
                  </div>
                  <div>
                    <button onClick={sendOTP} className='w-40 mt-4 bg-orange text-white font-semibold py-2 border border-orange hover:bg-white  focus:outline-none transition-all'>Finish</button>
                  </div>
                  {/* <p className='text-center text-orange mt-10'>Question {quizCount+1} out of {quizCount+1}</p> */}
                </div>
          </div>
          </OwlCarousel>
        </div> 
    </div>: null}
    { showOTP ? 
    <div>
        <div className='dimmer'></div>
        <div className='w-64 bg-white h-40 z-10 fade-in fixed left-0 right-0 m-auto top-0 bottom-0 rounded-xl flex flex-col p-5 gap-4'>
            <input onChange={(event)=>handleFormOptions(event.target.value, 'otp')} className='bg-gray-50 p-3 rounded-lg' type="text" placeholder='Enter 6 Digit OTP' />
            <button onClick={submitQuiz} className='w-full bg-orange text-white font-semibold py-3 rounded-lg border border-orange hover:bg-white  focus:outline-none transition-all'>Submit</button>
            <i onClick={()=>setshowOTP(false)} className='fa-solid fa-times absolute top-2 right-2 cursor-pointer'></i>
        </div>
    </div> : null} 
    { loading ? 
    <div>
        <div className='dimmer'></div>
        <div className='w-11/12 bg-green h-quiz z-10 fade-in fixed left-0 right-0 m-auto top-0 bottom-0 flex justify-center items-center'>
          <div className='flex flex-col items-center gap-3'>
            <img className='w-56' src="images/logo/Duforless_Logo_white.png" alt="Duforless_Logo" />
            <p className='text-white'>Calculating job cost....</p>
          </div>
        </div>
    </div> : null} 
    { showCost ? 
    <div>
        <div className='dimmer'></div>
        <div className='w-11/12 bg-white h-quiz z-10 fade-in fixed left-0 right-0 m-auto top-0 bottom-0 p-10 flex justify-center items-center'>
          <div className='flex flex-col items-center gap-3'>
            <img className='w-56' src="images/logo/Duforless_Logo_green.png" alt="Duforless_Logo" />
            <h1 className='text-xl font-semibold text-center mt-10'>Black Diamond Price: $35000</h1>
            <h1 className='text-xl font-semibold text-center'>System Pavers Price: $25000</h1>
            <h1 className='text-xl font-semibold text-center'>Mr. Pavers Price: $19000</h1>
            <h1 className='text-3xl text-green font-semibold text-center'>Dufforless Price: $9000 Only</h1>
            <p className='mt-10'>Thank you for your interest. Our visitor will contact you soon!</p>
          </div>
          <i onClick={()=>{setshowCost(false); setshowModal(false)}} className='fa-solid fa-times absolute top-2 right-2 cursor-pointer'></i>
        </div>
    </div> : null} 
    </>

  );

}
  
export default Home;