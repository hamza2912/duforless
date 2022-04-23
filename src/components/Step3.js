import React from 'react';
import Header from "./Header";

const Step3 = ({handleStage, enquiry, quotation, setquotation}) => {

    const [showModal, setshowModal] = React.useState(false);
    const [mobile, setmobile] = React.useState('');
    const [showOTP, setshowOTP] = React.useState(false);
    const [OTP, setOTP] = React.useState('');

    React.useEffect(() => {
    
        setquotation({
            booking_station: "Mumbai Station",
            delivery_station: "Maharashtra Station",
            delivery_date: "1/16/2022",
            estimated_budget: "15000",
        });
    
      }, []);

  return (
  <>
    <section className='w-full h-screen bg-blue-50 section3 flex items-center justify-center'>
        <div className='grid lg:grid-cols-2 grid-cols-1 lg:w-3/5 w-4/5 lg:-mt-24 fade-in-slow'>
            {/* First Card */}
            <div className='lg:py-8 py-6 rounded shadow-xl bg-white'>
                <div className='lg:px-12 px-6'>
                    <h1 className='text-blue text-2xl font-bold'>Product Details</h1>
                    <div className='flex flex-row justify-between lg:mt-5 mt-2'>
                        <div>
                            <h3 className='text-xs text-gray-400 '>From</h3>
                            <h1 className='text-sm text-gray-400'>{enquiry.pickUpCity}</h1>
                        </div>
                        <div>
                            <i className='fas fa-angle-right text-gray-400 text-xs'></i>
                        </div>
                        <div>
                            <h3 className='text-xs text-gray-400 '>To</h3>
                            <h1 className='text-sm text-gray-400'>{enquiry.deliveryCity}</h1>
                        </div>
                    </div>
                    <div className='grid lg:grid-cols-1 grid-cols-2'>
                        <div>
                            <button className='w-full shadow-lg rounded-md bg-blue-50 py-3 mt-4 text-gray-400 text-xs font-semibold'>{enquiry.productName}</button>
                        </div>
                        <div>
                            <button className='w-full shadow-lg rounded-md bg-blue-50 py-3 mt-4 text-gray-400 text-xs font-semibold'>{enquiry.pickUpDate}</button>
                        </div>
                        <div className='lg:block hidden'>
                            <button className='w-full shadow-lg rounded-md bg-blue-50 py-3 mt-4 text-gray-400 text-xs font-semibold'>{enquiry.weight + " " + enquiry.weightType}</button>
                        </div>
                    </div>
                    <div className='flex flex-row gap-4 lg:mt-12 mt-4 lg:mb-4 justify-center'>
                        <div>
                            <button onClick={()=>handleStage(2)} className='text-xs font-semibold border-2 border-blue mt-2 px-4 py-2 rounded-md text-blue font-medium'>Back</button>
                        </div>
                        <div>
                            <button onClick={()=>setshowModal(true)} className='text-xs border-2 border-blue mt-2 px-5 py-2 rounded-md text-white bg-blue-dark font-medium'>Call Now</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Card */}
            <div className='lg:py-8 py-6 rounded shadow-xl bg-gradient-to-r from-blue-400 to-blue-300'>
               <div className='lg:px-20 px-6'>
                    <div className='flex justify-center'>
                        <button className='w-full text-white text-xs font-semibold border-2 border-white rounded-md py-2 shadow-lg'>Quotation</button>
                    </div>
                    <div className='w-full flex flex-row justify-between text-white lg:my-5 my-3'>
                        <div>
                            <ul className='text-xs font-semibold'>
                                <li>Booking Station</li>
                                <li>Delivery Station</li>
                                <li>Delivery Type</li>
                                <li>Delivery Date</li>
                                <li>Weight</li>
                            </ul>
                        </div>
                        <div>
                            <ul className='text-xs'>
                                <li>{quotation.booking_station}</li>
                                <li>{quotation.delivery_station}</li>
                                <li>{enquiry.deliveryType}</li>
                                <li>{quotation.delivery_date}</li>
                                <li>{enquiry.weight + " " + enquiry.weightType}</li>
                            </ul>
                        </div>
                        
                    </div>
                    <div className='relative'>
                       <img className='lg:w-full w-4/5 lg:-ml-10 -ml-4' src="./images/handcard.svg" alt="" />
                       <h1 className='font-bold text-sm lg:text-base text-blue absolute top-1/2 lg:-mt-4 -mt-3 left-1/2 lg:-ml-8 -ml-10'>INR {quotation.estimated_budget}<span className='text-xs text-mini'>(approx)</span></h1>
                    </div>
                    <div className='flex justify-center lg:mt-12 mt-4 lg:mb-5'>
                        <button onClick={()=>handleStage(4)} className='w-full text-white text-xs font-semibold rounded-md bg-gradient-to-r from-blue-700 to-blue-500 py-2 shadow-lg'>Book Now</button>
                    </div>
               </div>
            </div>
            
        </div>
        {
            showModal ?    
                <div>
                    <div className='dimmer'></div>
                    <div className='messageBox lg:w-1/3 w-4/5 bg-white h-auto z-10 fade-in rounded-md'>
                        <div className='w-full h-2 hero-text'></div>
                        <div className='lg:w-3/4 w-4/5 flex flex-col items-center mx-auto pt-8 pb-10'>
                            <p className='text-2xl font-semibold text-blue'>Lets get connected!</p>
                            <p className='text-center lg:text-sm text-xs mt-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            { !showOTP ?
                            <input value={mobile} onChange={(event) => setmobile(event.target.val)} className='lg:w-3/4 w-4/5 mt-4 bg-gray-200 px-4 py-2 rounded-md input-border focus:outline-none' placeholder='Enter Mobile Number' type="text" /> : null }
                            { showOTP ?
                            <> 
                            <input value={OTP} onChange={(event) => setOTP(event.target.val)} className='lg:w-3/4 w-4/5 mt-4 bg-gray-200 px-4 py-2 rounded-md input-border focus:outline-none' placeholder='Enter OTP' type="text" />
                            <p className='text-blue text-xs font-bold mt-2 cursor-pointer'>Resend?</p>
                            </>
                             : null
                            }
                        </div>
                        <div className='flex flex-row gap-4 lg:mb-8 justify-center'>
                            <div>
                                <button onClick={()=>{setshowModal(false);setshowOTP(false);}} className='text-xs font-semibold border-2 border-blue mt-2 px-4 py-2 rounded-md text-blue font-medium'>Back</button>
                            </div>
                            { !showOTP ?
                            <div>
                                <button onClick={()=>setshowOTP(true)} className='text-xs border-2 border-blue mt-2 px-5 py-2 rounded-md text-white bg-blue-dark font-medium'>Send OTP</button>
                            </div> :
                            <div>
                                <button onClick={()=>{setshowModal(false);setshowOTP(false);}} className='text-xs border-2 border-blue mt-2 px-5 py-2 rounded-md text-white bg-blue-dark font-medium'>Submit</button>
                            </div>
                            }
                        </div>
                    </div> 
                </div>
                : null
          }
    </section>
  </>
  );
};

export default Step3;
