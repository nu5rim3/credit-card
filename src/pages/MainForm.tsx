import { Button, Input, OTPDialog } from "../components";
import { useCallback, useMemo, useState } from "react";
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

interface FormData {
    nic: string;
    email: string;
    mobile: string;
}

const MainForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    const [openOTP, setOpenOTP] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData | null>(null);

    const onSubmit = useCallback((data: FormData) => {
        setFormData(data);
        setOpenOTP(true);
    }, []);

    const otpDialog = useMemo(() => {
        return formData && <OTPDialog setIsOpen={setOpenOTP} isOpen={openOTP} mobile={formData.mobile} />;
    }, [formData, openOTP]);

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

                            <Button type="submit" variant={"primary"} className="w-full flex flex-row items-center justify-between gap-2 mt-3">Start <ArrowRight /></Button>
                        </div>
                    </form>
                </div>
            </div>
            {otpDialog}
        </>
    );
};

export default MainForm;
