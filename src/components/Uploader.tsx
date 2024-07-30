import { ChangeEvent, forwardRef, useState } from "react";
import { useRef } from "react";
import { Field, Input, InputProps, Label } from "@headlessui/react";
import Button from "./Button";
import { FileUp, Trash2, ZoomIn } from "lucide-react";
import ImagePreview from "./ImagePreview";
import "@cyntler/react-doc-viewer/dist/index.css";
import PdfViewer from "./pdfViewer";
interface UploaderProps extends InputProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    multiple: boolean;
    label?: string;
    required: boolean;
    error?: string;
    ruleLabel?: string;
}

const Uploader = forwardRef<HTMLInputElement, UploaderProps>(
    ({ onChange, multiple, label, required, error, ruleLabel }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const [files, setFiles] = useState<File[]>([]);
        const [open, setOpen] = useState(false);
        const [fileURL, setFileURL] = useState('');
        /**
         * handleFileSelected function
         * @param event 
         */
        const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
            if (multiple && event.target.files) {
                const newFiles = Array.from(event.target.files);
                const existingFiles = files.slice(); // Create a copy of the existing files

                // Combine the new files with the existing ones, optionally filtering duplicates
                const updatedFiles = existingFiles.concat(newFiles.filter(newFile =>
                    !existingFiles.some(existingFile => existingFile.name === newFile.name && existingFile.size === newFile.size)
                ));

                setFiles(updatedFiles); // Update the state with the combined list of files

                // Create a new event to pass to the onChange handler
                const customEvent = {
                    target: {
                        files: updatedFiles
                    }
                };
                onChange(customEvent as unknown as ChangeEvent<HTMLInputElement>);
            } else {
                const selectedFiles = Array.from(event.target.files || []);
                setFiles(selectedFiles);
                onChange(event);
            }

        };

        /**
         * handleButtonClick function
         */
        const handleButtonClick = () => {
            inputRef.current?.click();
        };

        /**
         * handleRemoveImage function
         * @param index 
         */
        const handleRemoveImage = (index: number) => {
            const updatedFiles = [...files];
            updatedFiles.splice(index, 1);
            setFiles(updatedFiles);

            // Clear the input value
            if (inputRef.current) {
                inputRef.current.value = '';
            }

            const event = {
                target: {
                    files: updatedFiles
                }
            };
            onChange(event as unknown as ChangeEvent<HTMLInputElement>);
        };

        return (
            <div className="border border-primary-200 rounded-md p-2 mb-2 bg-primary-100">
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
                        accept="image/*, application/pdf"
                    />
                    {ruleLabel && error === undefined || error === '' && (
                        <p className="text-xs text-gray-500 mt-1 italic normal-case">{ruleLabel}</p>
                    )}
                    <Label className="block text-xs font-medium text-red-800 text-left mt-1 italic normal-case">
                        {error}
                    </Label>
                    {files.length > 0 && (
                        <div className="mt-2">
                            <p className="text-sm font-medium text-gray-700">Selected files:</p>
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                                {files.map((file, index) => (
                                    <div key={index} className="rounded-xl overflow-hidden">
                                        {file.type.includes('image') && (
                                            <ImagePreview documentSrc={URL.createObjectURL(file)} handleRemoveImage={() => handleRemoveImage(index)} />
                                        )}
                                        {file.type.includes('application') && (
                                            <div
                                                key={index}
                                                className="relative w-44 sm:w-44 h-28 rounded-lg flex items-center justify-start overflow-hidden cursor-pointer bg-gray-100 p-1 hover:shadow-xl transition duration-300 delay-500 hover:delay-300 animate-fade-up animate-duration-[3000ms] animate-once"
                                            >
                                                <div className="absolute bottom-0 h-full flex flex-col gap-2 items-start p-3 rounded-lg bg-gray-800/50 sm:bg-gray-800/0 hover:bg-gray-800/50">
                                                    <button type="button" className="bg-primary-900/70 p-1 rounded-full hover:bg-primary-900" onClick={() => handleRemoveImage(index)}><Trash2 size={20} className="text-primary-200" /></button>
                                                    <button type="button" className="bg-primary-900/70 p-1 rounded-full hover:bg-primary-900" onClick={() => {
                                                        setFileURL(URL.createObjectURL(file))
                                                        setOpen(true)
                                                    }}><ZoomIn size={20} className="text-primary-200" /></button>
                                                </div>
                                                <div className="flex flex-1 justify-center items-center rounded-lg">
                                                    <iframe
                                                        src={URL.createObjectURL(file)}
                                                        width="100%"
                                                        height="80px"
                                                        title="PDF Preview"
                                                        className="object-contain h-full rounded-lg"
                                                    />
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </Field>
                <PdfViewer open={open} close={() => setOpen(false)} file={fileURL} />
            </div>
        );
    }
)

export default Uploader;