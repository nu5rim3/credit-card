import { Dialog, DialogPanel } from '@headlessui/react'
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
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
                <div className="flex w-auto items-center justify-center p-4">

                    <DialogPanel
                        // transition
                        className="container rounded-xl p-6 bg-white duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >

                        <div className='container'>
                            <div className='flex justify-end'>
                                <button onClick={close}>
                                    <X />
                                </button>
                            </div>
                            <DocViewer pluginRenderers={DocViewerRenderers} documents={[{ uri: file }]} config={{
                                header: {
                                    disableHeader: false,
                                    disableFileName: false,
                                    retainURLParams: false
                                }
                            }} className='w-full' />
                        </div>

                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default PdfViewer;
