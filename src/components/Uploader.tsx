import { ChangeEvent, useState } from "react";
import { useRef } from "react";
import { Field, Input, InputProps, Label } from "@headlessui/react";
import Button from "./Button";
import { FileUp, Trash2, ZoomIn } from "lucide-react";

interface UploaderProps extends InputProps {
    onFileSelected: (files: File[]) => void;
    multiple: boolean;
    label: string;
    required: boolean;
    error?: string;
}

const Uploader: React.FC<UploaderProps> = (
    ({ onFileSelected, multiple, label, required, error, ...props }) => { //...props
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
                <Button variant={"outline"} className="my-2 w-full flex flex-row justify-between bg-gray-100" onClick={() => handleButtonClick()}>Upload {label} <FileUp /></Button>
                <Input
                    ref={inputRef}
                    type="file"
                    multiple={multiple}
                    onChange={handleFileSelected}
                    className="hidden"
                    {...props}
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
                                    className="relative w-44 sm:w-full h-28 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer bg-gray-100 p-1 hover:shadow-xl transition duration-300 delay-500 hover:delay-300 animate-fade-up animate-duration-[3000ms] animate-once"
                                >
                                    <img src={URL.createObjectURL(file)} alt={file.name}
                                        className="object-contain w-full h-full rounded-lg" />
                                    <div className="absolute bottom-0 h-full w-full flex justify-between items-end p-3 rounded-lg bg-gray-800/50 sm:bg-gray-800/0 hover:bg-gray-800/50">
                                        <button className="bg-primary-900/70 p-1 rounded-full hover:bg-primary-900"><ZoomIn size={20} className="text-primary-200" /></button>
                                        <button className="bg-primary-900/70 p-1 rounded-full hover:bg-primary-900"><Trash2 size={20} className="text-primary-200" /></button>
                                    </div>
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