import { Button, Input, OTPDialog } from "../components";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form"
import { ArrowRight } from "lucide-react";
import logo from '../assets/images/lolcf_logo.svg'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
    nic: z.string().regex(/^(?:[0-9]{9}[Vv]|[0-9]{10})$/, 'Invalid NIC number (e.g. 123456789V)'),
    email: z.string().email('Invalid email address (e.g. sample@sample.com)'),
    mobile: z.string().regex(/^\+\d{1,3}\d{10}$/, 'Invalid phone number (e.g. +94712345678)'),
});

const MainForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });
    const [openOTP, setOpenOTP] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);

    const onSubmit = (data: unknown) => {
        console.log(data);
        // TODO: add the to the api and OTP
        setOpenOTP(true);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles([...files, ...Array.from(e.target.files)]);
        }
    };

    return (
        <>
            <div className="bg-[url('/img/hero-pattern.svg')] flex justify-center items-center min-h-screen">
                <div className="bg-primary-100/60 p-8 rounded-lg shadow-md w-full my-2 max-w-md animate-fade-up animate-duration-[1000ms] animate-once">
                    <img className="w-32 mb-3 animate-fade-up animate-duration-[1200ms] animate-once" src={logo} />
                    <div className="bg-primary-100 rounded-lg p-3 text-primary animate-fade-up animate-duration-[1500ms] animate-once">
                        <h3 className="text-base mb-2">WellCome to LOLC Credit Card</h3>
                        <ul className="list-disc list-inside text-sm">
                            <li className="">NIC or driving license (Both side)</li>
                            <li className="">Income proof (Latest pay slip or 03 months bank Statements)</li>
                            <li className="">Billing Proof - Electricity/ Water bill</li>
                        </ul>
                        <p className="mt-3 text-xs">
                            To attach multiple images. <br />Please select from your gallery.<br />
                            Allowed document types - (PDF,JPG,JPEG,PNG)
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-5 mt-3 animate-fade-up animate-duration-[2000ms] animate-once">
                            <Input
                                type={"text"}
                                label={"NIC"}
                                error={errors?.nic?.message?.toString()}
                                required
                                {...register("nic")}

                            />
                            <Input
                                type={"tel"}
                                label={"Mobile"}
                                error={errors?.mobile?.message?.toString()}
                                required
                                {...register("mobile")}

                            />
                            <Input
                                type={"email"}
                                label={"Email"}
                                error={errors?.email?.message?.toString()}
                                required
                                {...register("email")}

                            />
                            {/* <label htmlFor="name" className="block font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"
                                }`}
                            
                        />
                        {errors.name && (
                            <p className="text-red-500 mt-1">{errors.name.message}</p>
                        )}
                    </div> */}

                            {/* <div className="mb-4">
                        <label htmlFor="files" className="block font-bold mb-2">
                            Files
                        </label>
                        <input
                            type="file"
                            id="files"
                            multiple
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                            {...register("files")}
                            onChange={handleFileChange}
                        />
                        {errors.files && (
                            <p className="text-red-500 mt-1">{errors.files.message}</p>
                        )}
                    </div> */}

                            <Button type="submit" variant={"primary"} className="w-full flex flex-row items-center justify-between gap-2 mt-3">Start <ArrowRight /></Button>
                        </div>
                    </form>
                </div >
            </div >
            <OTPDialog setIsOpen={setOpenOTP} isOpen={openOTP} />
        </>
    );
};

export default MainForm;
