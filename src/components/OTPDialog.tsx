import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import Button from './Button';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { maskPhoneNumber } from '../utils/textConvertor';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { requestOTP } from '../store/actions/requestActions';
import { validateOTP } from '../store/actions/validateActions';
// import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input';

interface OTPDialogProps {
    mobile: string;
    referenceId: string;
    isOpen: boolean | undefined;
    setIsOpen: (isOpen: boolean) => void;
}

const OTPDialog: React.FC<OTPDialogProps> = ({ mobile, referenceId, isOpen, setIsOpen }) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    const [key, setKey] = useState(0);
    const dispatch: AppDispatch = useDispatch();
    const [otp, setOtp] = useState('');

    const handleVerify = () => {
        if (referenceId !== '' && otp !== '') {
            dispatch(validateOTP(navigate, referenceId, otp))
        }
    };

    const handleResend = () => {
        setIsDisabled(true);
        setOtp('');
        dispatch(requestOTP(referenceId))
        setKey((prevKey) => prevKey + 1);
    };

    useEffect(() => {
        if (otp.length === 6) {
            handleVerify()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otp])

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
        >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-primary/50 backdrop-blur-lg">
                <DialogPanel className="max-w-lg space-y-4 border bg-primary-50 p-5 rounded-lg shadow-lg text-center text-primary">
                    <DialogTitle className="font-semibold text-xl">
                        OTP Verification
                    </DialogTitle>
                    <Description className="text-gray-500">
                        Please Check the mobile and enter the verification code
                        <br />({maskPhoneNumber(mobile)})
                    </Description>
                    <div className="flex justify-center">
                        <CountdownCircleTimer
                            key={key}
                            size={100}
                            isPlaying
                            duration={60}
                            colors={["#1e3a8a", "#1e40af", "#1d4ed8", "#be123c"]}
                            colorsTime={[60, 40, 10, 0]}
                            onComplete={() => {
                                setIsDisabled(false);
                            }}
                        >
                            {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer>
                    </div>
                    <div className="bg-gray-100 p-5 rounded-lg">
                        <OtpInput
                            containerStyle="grid grid-cols-6 gap-2 justify-center"
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />}
                            inputStyle={{ width: '2.5rem', height: '2.5rem', fontSize: '1.5rem', borderRadius: '0.5rem', border: '1px solid #1c34c6' }}
                        />
                    </div>
                    <div className="flex justify-center sm:justify-end gap-4">
                        <Button
                            onClick={() => handleResend()}
                            variant={"secondary"}
                            disabled={isDisabled}
                        >
                            Resend
                        </Button>
                        <Button
                            onClick={() => handleVerify()}
                            variant={"primary"}
                            disabled={!isDisabled || otp.length !== 6}
                        >
                            Verify
                        </Button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default OTPDialog