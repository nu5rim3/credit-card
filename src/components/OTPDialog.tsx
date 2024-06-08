import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import Button from './Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { maskPhoneNumber } from '../utils/textConvertor';


interface OTPDialogProps {
    mobile: string;
    isOpen: boolean | undefined;
    setIsOpen: (isOpen: boolean) => void;
}

const OTPDialog: React.FC<OTPDialogProps> = ({ mobile, isOpen, setIsOpen }) => {

    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    const [key, setKey] = useState(0);

    const handleVerify = () => {
        setIsOpen(false)
        // TODO: call the API
        navigate('/personal-detail')
    }

    const handleResend = () => {
        // TODO: call the OTP api again
        setIsDisabled(true)
        setKey(prevKey => prevKey + 1)
    }

    return (
        <Dialog
            static
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
        >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-primary/50 backdrop-blur-lg">
                <DialogPanel className="max-w-lg space-y-4 border bg-primary-50 p-5 rounded-lg shadow-lg text-center text-primary">
                    <DialogTitle className="font-semibold text-xl">OTP Verification</DialogTitle>
                    <Description className="text-gray-500">
                        Please Check the mobile and enter the verification code<br />
                        ({maskPhoneNumber(mobile)})
                    </Description>
                    <div className='flex justify-center'>
                        <CountdownCircleTimer
                            key={key}
                            size={100}
                            isPlaying
                            duration={60}
                            colors={['#1e3a8a', '#1e40af', '#1d4ed8', '#be123c']}
                            colorsTime={[60, 40, 10, 0]}
                            onComplete={() => {
                                setIsDisabled(false);
                            }}
                        >
                            {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer>
                    </div>
                    <div className='bg-gray-100 flex flex-row gap-1 p-5 rounded-lg'>
                        <input type="number" className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        <input type="number" className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        <input type="number" className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        <input type="number" className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        <input type="number" className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                        <input type="number" className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </div>
                    <div className="flex justify-center sm:justify-end gap-4">
                        <Button onClick={handleResend} variant={'secondary'} disabled={isDisabled}>Resend</Button>
                        <Button onClick={handleVerify} variant={'primary'} disabled={!isDisabled}>Verify</Button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default OTPDialog