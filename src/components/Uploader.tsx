import { ChangeEvent, forwardRef, useState } from "react";
import { useRef } from "react";
import { Field, Input, InputProps, Label } from "@headlessui/react";
import Button from "./Button";
import { FileUp, Trash2, ZoomIn } from "lucide-react";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface UploaderProps extends InputProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    multiple: boolean;
    label?: string;
    required: boolean;
    error?: string;
}

const Uploader = forwardRef<HTMLInputElement, UploaderProps>(
    ({ onChange, multiple, label, required, error }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const [files, setFiles] = useState<File[]>([]);
        const [open, setOpen] = useState(false);
        const [openImageSrc, setOpenImageSrc] = useState('');

        /**
         * handleFileSelected function
         * @param event 
         */
        const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
            const selectedFiles = Array.from(event.target.files || []);
            setFiles(selectedFiles);
            onChange(event);
        };

        /**
         * handleButtonClick function
         */
        const handleButtonClick = () => {
            inputRef.current?.click();
        };

        /**
         * handleOpenImageView function
         * @param imageData 
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleOpenImageView = (imageData: any) => {
            setOpenImageSrc(imageData);
            setOpen(true);
        }

        /**
         * handleRemoveImage function
         * @param index 
         */
        const handleRemoveImage = (index: number) => {
            const updatedFiles = [...files];
            updatedFiles.splice(index, 1);
            setFiles(updatedFiles);
            const event = {
                target: {
                    files: updatedFiles
                }
            };
            onChange(event as unknown as ChangeEvent<HTMLInputElement>);
        };

        return (
            <>
                <Field>
                    <Label className="block text-sm font-medium text-primary text-left">
                        {label}
                        {required && <span className="ml-1 text-red-800">*</span>}
                    </Label>
                    <Button variant={"outline"} className="my-2 w-full flex flex-row justify-between bg-white" onClick={() => handleButtonClick()}>Upload Document <FileUp /></Button>
                    <Input
                        ref={inputRef || ref}
                        type="file"
                        multiple={multiple}
                        className="hidden"
                        onChange={handleFileSelected}
                    />
                    <Label className="block text-xs font-medium text-red-800 text-left mt-1 italic">
                        {error}
                    </Label>
                    {files.length > 0 && (
                        <div className="mt-2">
                            <p className="text-sm font-medium text-gray-700">Selected files:</p>
                            <div className="mt-2 flex flex-col sm:flex-row gap-2">
                                {files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="relative w-44 sm:w-44 h-28 rounded-lg flex items-center justify-start overflow-hidden cursor-pointer bg-gray-100 p-1 hover:shadow-xl transition duration-300 delay-500 hover:delay-300 animate-fade-up animate-duration-[3000ms] animate-once"
                                    >
                                        <img src={URL.createObjectURL(file)} alt={file.name}
                                            className="object-contain w-full h-full rounded-lg" />
                                        <div className="absolute bottom-0 h-full w-full flex justify-between items-end p-3 rounded-lg bg-gray-800/50 sm:bg-gray-800/0 hover:bg-gray-800/50">
                                            <button className="bg-primary-900/70 p-1 rounded-full hover:bg-primary-900" onClick={() => handleOpenImageView(URL.createObjectURL(file))}><ZoomIn size={20} className="text-primary-200" /></button>
                                            <button className="bg-primary-900/70 p-1 rounded-full hover:bg-primary-900" onClick={() => handleRemoveImage(index)}><Trash2 size={20} className="text-primary-200" /></button>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
                    )}
                </Field>

                <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={[
                        { src: openImageSrc },
                    ]}
                />
            </>
        );
    }
)

export default Uploader;