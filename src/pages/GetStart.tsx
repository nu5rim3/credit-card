import { useNavigate } from 'react-router-dom';
import cardImage from '../assets/images/card2.svg'
import logo from '../assets/images/lolcf_logo.svg'
import Button from '../components/Button';

const GetStart = () => {

    const navigate = useNavigate();

    const onGetStartClick = () => {
        navigate('/form')
    }

    return (
        <div className='flex flex-col'>
            <div className='flex flex-col sm:flex-row'>
                <div className='flex w-full sm:h-[85vh] text-black'>
                    <div className="bg-[url('/img/hero-pattern.svg')] flex w-full animate-duration-[2000ms] animate-once flex-col sm:flex-row">
                        <div className="w-full sm:w-1/2 h-full flex items-center justify-center">
                            <img src={cardImage} className='animate-fade-up animate-duration-[3000ms] animate-once h-80 sm:h-full' />
                        </div>
                        <div className="w-full sm:w-1/2 bg-primary-50 h-full p-10 sm:px-20 flex flex-col items-center sm:items-start justify-center">
                            <img className="w-52 animate-fade-up animate-duration-[500ms] animate-once" src={logo} />
                            <div className="text-md mb-10 text-primary-900 animate-fade-up animate-duration-[1000ms] animate-once text-center sm:text-left">FOR INQUIRIES<br className='block sm:hidden' /> +94 (11) 571 8888</div>

                            <div className="text-3xl sm:text-5xl font-extrabold mb-2 text-primary-900 animate-fade-up animate-duration-[2000ms] animate-once text-center sm:text-left">Fuel the Goodness in You.</div>
                            <div className="w-full sm:w-1/2 text-base mb-10 text-gray-400 animate-fade-up animate-duration-[3000ms] animate-once text-center sm:text-left">The best solution for all your payments. with LOLC finance credit card all kinds of payments are made easy and also many bonuses you can get.</div>
                            <div className='flex flex-col sm:flex-row sm:space-x-5 animate-fade-up animate-duration-[4000ms] animate-once'>
                                <Button variant={'primary'} className={'w-full m-1 sm:w-44'} onClick={onGetStartClick}>Get Start</Button>
                                <Button variant={'outline'} className={'w-full m-1 sm:w-48'}>What's Required?</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sm:h-[10vh] bg-gray-700 text-white animate-fade-up animate-duration-[5000ms] animate-once sm:pt-5">
                <div className='container w-full flex flex-row mx-auto justify-around'>
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-5xl font-bold">10K+</h2>
                        <p className='text-xs sm:text-base'>Active users</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-5xl font-bold">10Y</h2>
                        <p className='text-xs sm:text-base'>Experience</p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-5xl font-bold">5+</h2>
                        <p className='text-xs sm:text-base'>Card variations</p>
                    </div>
                </div>
            </div>

            <div className="h-[5vh] bg-gray-900 text-white flex items-center justify-center animate-fade-up animate-duration-[5000ms] animate-once">
                <div className="container flex flex-col sm:flex-row justify-between mx-auto p-1 sm:px-10">
                    <div className="text-center sm:text-right text-sm">
                        Copyright © 2024 LOLC Finance Plc
                    </div>
                    <div className="text-center text-xs">
                        Version 1.3.5
                    </div>
                    <div className="text-center sm:text-left text-sm">
                        Powered By LOLC Technology Services Ltd
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetStart;