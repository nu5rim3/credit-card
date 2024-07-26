import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Button from './Button';
import { LoaderCircle } from 'lucide-react';

type TConfirmDialog = {
    open: boolean;
    close: () => void;
    onConfirm: () => void;
    loading: boolean;
}

const ConfirmDialog: React.FC<TConfirmDialog> = ({ open, close, onConfirm, loading }) => {


    return (

        <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-primary/50 backdrop-blur-lg">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        // transition
                        className="w-full max-w-md rounded-xl p-6 bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-xl font-bold text-primary mb-3">
                            Confirm to Apply
                        </DialogTitle>
                        <p className="mt-2 text-sm/6 text-primary-">
                            Do you want to apply for the credit card?
                        </p>
                        <div className="mt-4 flex gap-2 flex-1 justify-end">
                            <Button
                                variant='outline'
                                onClick={close}
                                disabled={loading}
                            >
                                Close
                            </Button>
                            <Button
                                variant='primary'
                                onClick={onConfirm}
                                disabled={loading}
                                className='flex flex-row items-center justify-between gap-2'
                            >
                                {loading && <LoaderCircle className="animate-spin animate-infinite" />} Confirm
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default ConfirmDialog;
