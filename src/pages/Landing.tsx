import cardImage from '../assets/images/nefa-cc.webp'
import logo from '../assets/images/lolcf_logo.svg'
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form"
import * as yup from "yup";
import { ArrowRight } from 'lucide-react';
import { Button, Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string()
        .required("phone number required (Ex: +94712345678)")
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, "too short")
        .max(10, "too long"),
    files: yup.array().min(1, "At least one file is required"),
});

const LandingPage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    // const [files, setFiles] = useState<File[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const onSubmit = (data: unknown) => {
        console.log(data);
        setIsOpen(true)
    };

    // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         setFiles([...files, ...Array.from(e.target.files)]);
    //     }
    // };
    return (
        <div className="flex flex-row mx-auto h-screen">
            <div className="hidden sm:flex sm:basis-2/3 bg-gradient-to-r from-sky-500 to-indigo-500 flex-1 h-full flex-col justify-between px-20 py-10">
                <div className="text-md mb-4 text-white animate-fade-up animate-duration-[1000ms] animate-once">FOR INQUIRIES +94 (11) 571 8888</div>

                <div className="text-5xl font-extrabold mb-4 text-white animate-fade-up animate-duration-[2000ms] animate-once">Fuel The Goodness In You.</div>

                <div className='flex justify-center'>
                    <img src={cardImage} className='animate-fade-up animate-duration-[3000ms] animate-once' />
                </div>

                <div className="flex flex-row justify-between animate-fade-up animate-duration-[4000ms] animate-once">
                    <div className="text-lg font-semibold text-white">
                        Copyright © 2024 LOLC Finance Plc
                    </div>
                    <div className="text-sm font-semibold text-white flex flex-col ">
                        Powered By LOLC Technology Services Ltd
                        <br />
                        <span className="flex justify-end text-xs ">Version 1.3.5</span>
                    </div>
                </div>
            </div>
            {/* form section */}
            <div className="flex w-full h-screen overflow-auto sm:block sm:basis-1/3 bg-white p-10 animate-fade-up animate-duration-[1000ms] animate-once">
                <div>
                    <img className="w-52 mb-10" src={logo} />
                    <div className='flex flex-col space-y-5'>
                        <div className='text-sm'>LOLC Finance provides you a wide range of credit card options to choose from to fit your financial needs.</div>
                        <div className='bg-blue-50 p-8 rounded-lg space-y-2'>
                            <div className='text-red-500'>Important !</div>
                            <div className='text-sm'>
                                Required documents to complete your Online Credit Card Application.

                                (Pls. note these documents are mandatory to process your request.)
                            </div>

                            <div className='text-sm px-5'>
                                <ol className='list-decimal'>
                                    <li>NIC or Driving License (Both Sides)</li>
                                    <li>Income Proof (Latest Pay Slip or Last 03 months Bank Statements)</li>
                                    <li>Billing Proof -
                                        <ul className='list-disc px-5'>
                                            <li>
                                                Option 1 - If the address is same as NIC/DL, pls. attach your NIC or DL again.
                                            </li>
                                            <li>
                                                Option 2 - If the address is differs with the NIC / DL attach a valid billing proof (Ex : Electricity Bill / Water Bill).
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        To attach multiple images, please select images from your gallery.
                                    </li>
                                    <li>
                                        Allowed document types U+2013 PDF/JPG/JPEG/PNG
                                    </li>
                                </ol>
                            </div>
                        </div>

                        <div className='py-10'>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-4">
                                    {/* <label htmlFor="name" className="block font-bold mb-2">
                                    Name
                                </label> */}
                                    <input
                                        type="text"
                                        placeholder='Name'
                                        id="name"
                                        className={`w-full px-3 py-2 border border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"
                                            }`}
                                        {...register("name")}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 mt-1">{errors.name.message}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    {/* <label htmlFor="email" className="block mb-2">
                                    Email
                                </label> */}
                                    <input
                                        type="email"
                                        placeholder='Email'
                                        id="email"
                                        className={`w-full px-3 py-2 border border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"
                                            }`}
                                        {...register("email")}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 mt-1">{errors.email.message}</p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    {/* <label htmlFor="email" className="block mb-2">
                                    Email
                                </label> */}
                                    <input
                                        type="tel"
                                        placeholder='Phone Number'
                                        id="email"
                                        className={`w-full px-3 py-2 border border-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? "border-red-500" : "border-gray-300"
                                            }`}
                                        {...register("phone")}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 mt-1">{errors.phone.message}</p>
                                    )}
                                </div>
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
                                <div className='flex justify-end pt-5'>

                                    <Button
                                        type="submit"
                                        className="w-full sm:w-56 bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition-colors flex flex-row justify-between px-4 hover:shadow-lg"
                                    >
                                        Get Start
                                        <ArrowRight />
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='flex flex-col text-center sm:hidden pb-10'>
                        <div className="text-base font-semibold">
                            Copyright © 2024 LOLC Finance Plc
                        </div>
                        <div className="text-sm font-semibold  flex flex-col ">
                            Powered By LOLC Technology Services Ltd
                            <br />
                            <span className="text-xs ">Version 1.3.5</span>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                        <DialogTitle className="font-bold">Deactivate account</DialogTitle>
                        <Description>This will permanently deactivate your account</Description>
                        <p>Are you sure you want to deactivate your account? All of your data will be permanently removed.</p>
                        <div className="flex gap-4">
                            <button onClick={() => setIsOpen(false)}>Cancel</button>
                            <button onClick={() => setIsOpen(false)}>Deactivate</button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    )
}

export default LandingPage