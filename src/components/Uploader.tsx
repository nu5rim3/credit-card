import { ChangeEvent, useState } from "react";
import { useRef } from "react";
import { Field, Input, InputProps, Label } from "@headlessui/react";
import Button from "./Button";

interface UploaderProps extends InputProps {
    onFileSelected: (files: File[]) => void;
    multiple: boolean;
    label: string;
    required: boolean;
    error?: string;
}

const Uploader: React.FC<UploaderProps> = (
    ({ onFileSelected, multiple, label, required, error }) => { //...props
        const inputRef = useRef<HTMLInputElement>(null);
        const [files, setFiles] = useState<File[]>([]);

        const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
            console.log('[CLICKED] - handleFileSelected')
            const selectedFiles = Array.from(event.target.files || []);
            setFiles(selectedFiles);
            onFileSelected(selectedFiles);
        };

        const handleButtonClick = () => {
            console.log('[CLICKED] - handleButtonClick')
            inputRef.current?.click();
        };

        return (
            <Field>
                <Label className="block text-sm font-medium text-primary text-left">
                    {label}
                    {required && <span className="ml-1 text-red-800">*</span>}
                </Label>
                <Button variant={"outline"} className="my-2" onClick={() => handleButtonClick()}>Upload {label}</Button>
                <Input
                    ref={inputRef}
                    type="file"
                    multiple={multiple}
                    onChange={handleFileSelected}
                    className="hidden"
                // {...props}
                />
                <Label className="block text-xs font-medium text-red-800 text-left mt-1 italic">
                    {error}
                </Label>
                {files.length > 0 && (
                    <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Selected files:</p>
                        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {files.map((file, index) => (
                                <div
                                    key={index}
                                    className="relative w-full h-32  border rounded-lg flex items-center justify-center overflow-hidden cursor-pointer"
                                >
                                    <img src={URL.createObjectURL(file)} alt={file.name}
                                        className="object-cover w-full h-full rounded-lg" />
                                    <button className="absolute bottom-0 right-3">hello</button>
                                </div>

                            ))}
                        </div>
                    </div>
                )}
            </Field>
        );
    }
);

export default Uploader;