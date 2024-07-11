import { Trash2, ZoomIn, ZoomOut } from 'lucide-react';
import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

type TImagePreview = {
    documentSrc: string;
    handleRemoveImage: () => void;
}

const ImagePreview: React.FC<TImagePreview> = ({ documentSrc, handleRemoveImage }) => {
    return (
        <PhotoProvider
            toolbarRender={({ onScale, scale }) => {
                return (
                    <div className='flex gap-3'>
                        <ZoomIn className="w-5 h-5" onClick={() => onScale(scale + 1)} />
                        <ZoomOut className="w-5 h-5" onClick={() => onScale(scale - 1)} />
                    </div>
                );
            }}>
            <div className='className="relative w-44 sm:w-44 h-28 rounded-lg flex flex-col overflow-hidden cursor-pointer bg-gray-100 p-1 hover:shadow-xl transition duration-300 delay-500 hover:delay-300 animate-fade-up animate-duration-[3000ms] animate-once'>
                <PhotoView src={documentSrc}>
                    <img src={documentSrc} alt="" className='absolute' />
                </PhotoView>
                {/* <div className="absolute left-10 top-5 bg-primary-900/70 p-1 mr-2 rounded-full hover:bg-primary-900"><ZoomIn size={20} className="text-primary-200" /></div> */}
                <button className="absolute top-5 bg-primary-900/70 p-1 ml-2 rounded-full hover:bg-primary-900" onClick={handleRemoveImage}><Trash2 size={20} className="text-primary-200" /></button>
            </div>

        </PhotoProvider>
    );
}

export default ImagePreview;