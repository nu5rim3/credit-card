import { Button, Input, OTPDialog } from "../components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form"
import { ArrowRight, LoaderCircle } from "lucide-react";
import logo from '../assets/images/lolcf_logo.svg'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { userLogin } from "../store/actions/userLoginActions";

const schema = z.object({
    nic: z.string().min(1, 'NIC Number is required').regex(/^(?:\d{9}[vVxX]|\d{12})$/, 'Invalid NIC number'),
    email: z.string().min(1, 'Email Address is required').email('Invalid email address (e.g. sample@sample.com)'),
    mobileNumber: z.string().min(1, 'Mobile Number is required').regex(/^(?:[0-9]{10})$/, 'Invalid phone number (e.g. 0712345678)'),
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
    const { data, loading } = useSelector((state: RootState) => state.userLogin);

    const onSubmit = useCallback((formData: FormData) => {
        setFormData(formData);
        dispatch(userLogin(formData))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const otpDialog = useMemo(() => {
        return formData && <OTPDialog setIsOpen={setOpenOTP} isOpen={openOTP} mobile={formData.mobileNumber} referenceId={data?.referenceNo ?? ''} />;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData, openOTP]);

    useEffect(() => {
        if (data !== null) {
            setOpenOTP(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <>
            <div className="bg-card-pattern flex justify-center items-center min-h-screen">
                <div className="bg-primary-50 p-8 rounded-lg shadow-md w-full my-2 max-w-md animate-fade-up animate-duration-[3000ms] animate-once">
                    <img className="w-32 mb-3 animate-fade-up animate-duration-[1200ms] animate-once" src={logo} />
                    <div className="bg-white border rounded-lg p-3 text-primary-950 animate-fade-up animate-duration-[1500ms] animate-once">
                        <h3 className="text-base mb-2">Welcome to LOLC Credit Card</h3>
                        <h3 className="text-sm mb-2">Required Documents</h3>
                        <ul className="list-disc list-inside text-sm">
                            <li className="">NIC or Driving License <br />&nbsp;&nbsp;&nbsp;&nbsp;(Both Sides)</li>
                            <li className="">Income Proof <br />&nbsp;&nbsp;&nbsp;&nbsp;(Latest Payslip or 03 months Bank Statements)</li>
                            <li className="">Billing Proof <br />&nbsp;&nbsp;&nbsp;&nbsp;(Electricity/ Water Bill)</li>
                        </ul>
                        <p className="mt-3 text-sm">
                            Use gallery to select and attach multiple documents.
                            <br />
                            Allowed document types - (PDF, JPG, JPEG, PNG)
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

                            <Button type="submit" variant={"primary"} className="w-full flex flex-row items-center justify-between gap-2 mt-3">Start {loading ? <LoaderCircle className="animate-spin animate-infinite" /> : <ArrowRight />}</Button>
                        </div>
                    </form>
                </div>
            </div>
            {otpDialog}
        </>
    );
};

export default MainForm;
