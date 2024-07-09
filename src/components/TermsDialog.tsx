import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Button from './Button';


interface TermsDialogProps {
    isOpen: boolean | undefined;
    setIsOpen: (value: boolean) => void;
}

const TermsDialog: React.FC<TermsDialogProps> = ({ isOpen, setIsOpen }) => {

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
        >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-primary/50 backdrop-blur-lg">
                <DialogPanel className="container space-y-4 border bg-primary-50 p-5 rounded-lg shadow-lg text-center text-primary">
                    <DialogTitle className="font-semibold text-xl">
                        Terms and Conditions
                    </DialogTitle>
                    <Description className="text-gray-500 px-5 bg-white border p-4 rounded-lg h-[50vh] sm:h-[60vh]  overflow-x-scroll">
                        <p className='mb-5 text-base'>CENTRAL BANK OF SRI LANKA</p>

                        <p className='mb-5'>
                            I CASCC (Primary Cardholder), declare that all details given above by me on this form are true and correct.
                        </p>
                        <p className='mb-5'>
                            I hereby confirm that I am aware of the conditions imposed under the provision of the Foreign Exchange Act, No 12 of 2017 (the Act) on Electronic Fund Transfer Cards (EFTCs) subject to which the card may be used for transactions in foreign exchange and I hereby undertake to abide by the said conditions.
                        </p>
                        <p className='mb-5'>
                            I further agree to provide any information on transactions carried out by me in foreign exchange on the card issued to me as LOLC Finance PLC may require for the purpose of Act.
                        </p>
                        <p className='mb-5'>
                            I am aware that the restricted financial institution is required to suspend availability of foreign exchange on ETFC if reasonable grounds exist to suspect that unauthorized foreign exchange transactions are being carried out on the EFTC issued to me and to report the matter to the Director-Department of Foreign Exchange. I also affirm that I undertake to surrender the Credit Card to LOLC Finance PLC, if I migrate or leave Sri Lanka for employment abroad.
                        </p>
                        <p className='mb-5 text-red-500'>
                            Terms & Condition | Tariff
                        </p>
                        <p className='mb-5'>
                            I confirm that I accept clauses herein and shall be taken as my acceptance of the accuracy of the information supplied by me for the purpose of the entirety of this digital/online application.
                        </p>
                    </Description>
                    <div className="flex justify-center sm:justify-end">
                        <Button
                            className='w-full sm:w-40'
                            onClick={() => setIsOpen(false)}
                            variant={"primary"}
                        >
                            Close
                        </Button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default TermsDialog