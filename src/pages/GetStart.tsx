import logo from '../assets/images/lolcf_logo.svg'
import cardImage from '../assets/images/cards.webp'
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';

const GetStart = () => {
    const navigate = useNavigate();

    const onGetStartClick = () => {
        // TODO: call the OTP api
        navigate('/form')
    }

    return (
        <div className="bg-card-pattern flex justify-center items-center min-h-screen">
            <div className='backdrop-blur-sm p-8 w-full animate-fade-up animate-duration-[1000ms] animate-once flex flex-col justify-between items-center h-screen pb-20'>
                <img className="w-36 sm:w-52 animate-fade-up animate-duration-[500ms] animate-once" src={logo} />
                <div className="text-3xl sm:text-5xl mb-2 text-primary-900 animate-fade-up animate-duration-[2000ms] animate-once text-center sm:text-left">LOLC FINANCE CREDIT CARDS</div>
                <img src={cardImage} className='animate-fade-up animate-duration-[3000ms] animate-once w-full sm:w-1/2' />
                <div className="text-3xl sm:text-5xl font-extrabold mb-2 text-primary-900 animate-fade-up animate-duration-[2000ms] animate-once text-center sm:text-left">Fuel the Goodness in You.</div>
                <Button variant={'primary'} className={'w-full m-1 sm:w-44'} onClick={onGetStartClick}>Get Start</Button>
            </div>
        </div>
    )
}

export default GetStart