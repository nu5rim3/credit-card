import logo from '../assets/images/lolcf_logo.svg'

const Completed = () => {
    return (
        <>
            <div className="bg-card-pattern flex justify-center items-center min-h-screen">
                <div className='backdrop-blur-sm p-8 w-full flex flex-col justify-center items-center h-screen pb-20'>
                    <div className="bg-primary-50 p-8 rounded-lg shadow-md w-full my-2 max-w-md animate-fade-up animate-duration-[3000ms] animate-once">
                        <img className="w-32 mb-3 animate-fade-up animate-duration-[1200ms] animate-once" src={logo} />
                        <p className='my-4 text-2xl font-semibold text-primary-950'>Thank You!</p>
                        <div className='bg-white px-2 py-4 rounded-lg text-primary-950'>
                            <p className='mb-2'>Thank you for choosing LOLC credit card service. Your details have been successfully saved. </p>
                            <p>We will review your information and get back to you within 3 business days.</p>
                        </div>
                        <p className='mt-4 text-primary-950'>FOR INQUIRIES <a href="tel:+9411571888">+94 (11) 571 8888</a></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Completed