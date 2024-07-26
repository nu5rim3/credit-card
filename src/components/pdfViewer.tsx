import { Dialog, DialogPanel } from '@headlessui/react'
import { X } from 'lucide-react';

type TPdfViewer = {
    open: boolean;
    close: () => void;
    file: string;
}

const PdfViewer: React.FC<TPdfViewer> = ({ open, close, file }) => {

    return (

        <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-primary/50 backdrop-blur-lg">
                <DialogPanel
                    // transition
                    className="container h-3/4 rounded-xl px-3 bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                    <div className='flex justify-end'>
                        <button onClick={close} className='bg-slate-300 p-2 rounded-full my-2'>
                            <X />
                        </button>
                    </div>
                    <iframe
                        src={file}
                        title="PDF Preview"
                        className="object-contain h-full pb-16 rounded-lg w-full"
                    />
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default PdfViewer;
