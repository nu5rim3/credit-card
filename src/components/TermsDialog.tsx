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
                <DialogPanel className="max-w-lg space-y-4 border bg-primary-50 p-5 rounded-lg shadow-lg text-center text-primary">
                    <DialogTitle className="font-semibold text-xl">
                        Terms and Conditions
                    </DialogTitle>
                    <Description className="text-gray-500 px-5 bg-white border p-4 rounded-lg h-[50vh] sm:h-[30vh]  overflow-x-scroll">
                        <span className='mb-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
                        <span className='mb-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>
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