import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import Button from './Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { maskPhoneNumber, otpToString } from '../utils/textConvertor';
import { usePasscode } from "react-headless-passcode";


interface OTPDialogProps {
    mobile: string;
    isOpen: boolean | undefined;
    setIsOpen: (isOpen: boolean) => void;
}

const OTPDialog: React.FC<OTPDialogProps> = ({ mobile, isOpen, setIsOpen }) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();
    const [key, setKey] = useState(0);

    const {
        passcode,
        // setPasscode,
        // currentFocusedIndex,
        // setCurrentFocusedIndex,
        getEventHandlers,
        isComplete,
        refs,
    } = usePasscode({
        count: 6,
    });

    console.log('[REFS] - ', refs.current.values)

    const handleVerify = () => {
        setIsOpen(false);
        // TODO: call the API
        const stringPasscode = otpToString(passcode)
        console.log('[stringPasscode] - ', stringPasscode)
        navigate("/personal-detail");
    };

    const handleResend = () => {
        // TODO: call the OTP api again
        setIsDisabled(true);
        setKey((prevKey) => prevKey + 1);
    };

    useEffect(() => {
        if (isComplete) {
            handleVerify()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isComplete])


    return (
        <Dialog
            static
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
                    <div className="bg-gray-100 grid grid-cols-6 gap-2 p-5 rounded-lg w-auto">
                        {passcode.map((value, index) => {
                            const { ...rest } = getEventHandlers(index);
                            return (
                                <input
                                    className="px-3 py-2 border border-primary-600 rounded-lg text-center text-primary-950"
                                    ref={(el) => el && (refs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    maxLength={1}
                                    pattern="\d{1}"
                                    value={String(value)}
                                    key={`index-${index}`}
                                    disabled={!isDisabled}
                                    {...rest}
                                />
                            );
                        })}
                    </div>
                    <div className="flex justify-center sm:justify-end gap-4">
                        <Button
                            onClick={handleResend}
                            variant={"secondary"}
                            disabled={isDisabled}
                        >
                            Resend
                        </Button>
                        <Button
                            onClick={handleVerify}
                            variant={"primary"}
                            disabled={!isDisabled}
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