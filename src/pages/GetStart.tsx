import logo from '../assets/images/lolcf_logo.svg'
import cardImage from '../assets/images/cards.webp'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components';

const GetStart = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ved = searchParams.get('ved');
    const emp = searchParams.get('emp');
    const shp = searchParams.get('shp');
    const navigate = useNavigate();

    const onGetStartClick = () => {
        navigate(`/form/?ved=${ved}&emp=${emp}&shp=${shp}`)
    }

    return (
        <div className="bg-card-pattern flex justify-center items-center min-h-screen">
            <div className='backdrop-blur-sm p-8 w-full animate-fade-up animate-duration-[1000ms] animate-once flex flex-col justify-between items-center h-screen pb-20'>
                <img className="w-36 sm:w-52 animate-fade-up animate-duration-[500ms] animate-once" src={logo} />
                <div className="text-3xl sm:text-5xl mb-2 text-primary-900 animate-fade-up animate-duration-[2000ms] animate-once text-center sm:text-left">LOLC FINANCE CREDIT CARDS</div>
                <img src={cardImage} className='animate-fade-up animate-duration-[3000ms] animate-once w-full sm:w-1/2' />
                <div className="text-3xl sm:text-5xl font-extrabold mb-2 text-primary-900 animate-fade-up animate-duration-[2000ms] animate-once text-center sm:text-left">Fuel the Goodness in You.</div>
                <Button variant={'primary'} className={'w-full m-1 sm:w-44'} onClick={onGetStartClick}>Get Started</Button>
            </div>
        </div>
    )
}

export default GetStart