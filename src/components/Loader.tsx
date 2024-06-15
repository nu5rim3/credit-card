import logo from '../assets/images/lolcf_logo.svg'

const Loader = () => {
    return (
        <div className='w-screen h-screen backdrop-blur-sm bg-primary-50/70  flex justify-center items-center'>
            <img className="w-20 mb-10 animate-ping" src={logo} />
        </div>
    )
}

export default Loader