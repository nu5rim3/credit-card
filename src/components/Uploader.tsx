import React, { forwardRef } from "react";
import { useRef } from 'react';

interface UploadProps {
    onFileSelected: (file: File) => void;
}

const Upload = forwardRef<HTMLInputElement, UploadProps>(({ onFileSelected }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onFileSelected(file);
        }
    };

    return (
        <input
            ref={ref || inputRef}
            type="file"
            onChange={handleFileSelected}
            className="hidden"
        />
    );
});

export default Upload;
