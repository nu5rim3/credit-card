import { Button, Input, OTPDialog } from "../components";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form"
import { ArrowRight } from "lucide-react";
import logo from '../assets/images/lolcf_logo.svg'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { userLogin } from "../store/actions/userLoginAction";

const schema = z.object({
    nic: z.string().min(1, 'NIC Number is required').regex(/^(?:[0-9]{9}[Vv]|[0-9]{10})$/, 'Invalid NIC number (e.g. 123456789V)'),
    email: z.string().min(1, 'Email Address is required').email('Invalid email address (e.g. sample@sample.com)'),
    mobileNumber: z.string().min(1, 'Mobile Number is required').regex(/^(?:\+\d{1,3}\d{10}|[0-9]{10})$/, 'Invalid phone number (e.g. +94712345678)'),
});

interface FormData {
    nic: string;
    email: string;
    mobileNumber: string;
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

    const dispatch = useDispatch<AppDispatch>();
    const { data, loading, error } = useSelector((state: RootState) => state.userLogin);

    const onSubmit = useCallback((data: FormData) => {
        setFormData(data);
        dispatch(userLogin(data))
        setOpenOTP(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const otpDialog = useMemo(() => {
        return formData && <OTPDialog setIsOpen={setOpenOTP} isOpen={openOTP} mobile={formData.mobileNumber} />;
    }, [formData, openOTP]);


    console.log('[DATA] - ', data)
    console.log('[LOADING] - ', loading)
    console.log('[ERROR] - ', error)

    return (
        <>
            <div className="bg-[url('/img/hero-pattern.svg')] flex justify-center items-center min-h-screen">
                <div className="bg-primary-50 p-8 rounded-lg shadow-md w-full my-2 max-w-md animate-fade-up animate-duration-[1000ms] animate-once">
                    <img className="w-32 mb-3 animate-fade-up animate-duration-[1200ms] animate-once" src={logo} />
                    <div className="bg-white border rounded-lg p-3 text-primary-950 animate-fade-up animate-duration-[1500ms] animate-once">
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
                                error={errors?.mobileNumber?.message?.toString()}
                                required
                                {...register("mobileNumber")}

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
