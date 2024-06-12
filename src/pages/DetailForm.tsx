import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, RadioGroup } from '../components';
import logo from '../assets/images/lolcf_logo.svg'
import { RadioOption } from '../components/RadioGroup';

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

const schema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    nationality: z.string().min(1, 'Nationality is required'),
    preferredLanguage: z.string().min(1, 'Preferred Language is required'),
    dob: z.string().refine(
        (val) => {
            const date = new Date(val);
            const eighteenYearsAgoTime = eighteenYearsAgo.getTime();
            return !isNaN(date.getTime()) && date.getTime() >= eighteenYearsAgoTime;
        },
        { message: "You must be at least 18 years old" }
    ),
});

const nationalities: RadioOption[] = [{ label: 'Sri Lankan', value: 'srilankan' }, { label: 'Other', value: 'other' }]


type FormData = z.infer<typeof schema>;


const DetailForm = () => {
    const { control, register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            nationality: '',
            fullName: "SanjayaKulathunga",
            "preferredLanguage": "Sinhala",
            "dob": "2001-10-15",
            // "mothersMaidenName": "Shriyani",
            // "residencePhone": "0764306768",
            // "whatsappNo": "0772630559",
            // "additionalContactNo": "0766818923",
            // "residenceType": "Resident",
            // "permAddressLine1": "184/1",
            // "permAddressLine2": "Mudugala",
            // "permAddressLine3": "Ussawa",
            // "permAddressLine4": "Melsiripura",
            // "province": "North Western Province",
            // "mailAddressLine1": "184/1",
            // "mailAddressLine2": "Mudugala",
            // "mailAddressLine3": "Ussawa",
            // "mailAddressLine4": "Melsiripura",
            // "politicallyExposed": "Yes",
            // "employmentCategory": "Test",
            // "expInPresentEmployment": "Test",
            // "occupationType": "test",
            // "nameOfTheEmployer": "test Name",
            // "designation": "trainee Software Engineer",
            // "monthlyNetIncome": "100000",
            // "officeAddressLine1": "Rajagiriya",
            // "officeAddressLine2": "Rajagiriya",
            // "officeAddressLine3": "test",
            // "officeAddressLine4": "test",
            // "experienceInPreviousEmployment": "test",
            // "nameOfThePreviousEmployer": "Dulan",
            // "guarantorName": "Mahela",
            // "relationShipToApplication": "test",
            // "guarantorNic": "200128904037",
            // "guarantorMobileNo": "0764306768",
            // "guarantorAddressLine1": "testAddress1",
            // "guarantorAddressLine2": "testAddress2",
            // "guarantorAddressLine3": "test",
            // "guarantorAddressLine4": "test",
            // "dueDate": "2024-06-07",
            // "cardCollectBranch": "Head Office",
            // "nameOnCard": "SanjayaKul"
        }
    });

    const onSubmit = (data: FormData) => console.log(data);

    const handleNationalityChange = (value: string) => {
        setValue("nationality", value);
    };

    return (
        <div className='flex justify-center bg-primary-50 py-5 px-2 sm:px-0'>
            <div className='container flex flex-col justify-center items-center'>
                <img className="w-32 mb-3 animate-fade-up animate-duration-[1200ms] animate-once" src={logo} />
                <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className='bg-primary-100 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[3000ms] animate-once hover:shadow-xl flex flex-col gap-2'>
                        <p className='font-semibold text-primary-950'>Customer Personal Details</p>
                        <Input type={'text'} label={'Full Name'} required {...register('fullName')} error={errors.fullName?.message} />
                        <Controller
                            control={control}
                            name={'nationality'}
                            render={(field) =>
                                <RadioGroup
                                    options={nationalities}
                                    label={'Nationality'}
                                    error={errors.nationality?.message}
                                    onChange={handleNationalityChange}
                                    required
                                    {...field}
                                />
                            }
                        />


                    </div>
                    <div className='bg-primary-100 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[4000ms] animate-once hover:shadow-xl flex flex-col gap-2'>
                        <p className='font-semibold text-primary-950'>Customer Employment Details</p>
                    </div>
                    <div className='bg-primary-100 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[4000ms] animate-once hover:shadow-xl flex flex-col gap-2'>
                        <p className='font-semibold text-primary-950'>Guarantor Details</p>
                    </div>
                    <div className='bg-primary-100 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[5000ms] animate-once hover:shadow-xl mb-20 sm:mb-0 flex flex-col gap-2'>
                        <p className='font-semibold text-primary-950'>Credit Card Details</p>
                    </div>
                    <div className="md:col-span-3 justify-end h-10 animate-fade-up animate-duration-[6000ms] animate-once hidden sm:flex">
                        <Button variant='primary' type="submit" className={''} >
                            Save persanl detail
                        </Button>
                    </div>
                    <div className="fixed sm:hidden bottom-3 bg-primary-50 h-auto animate-fade-up animate-duration-[6000ms] animate-once w-full rounded-lg pr-4">
                        <Button variant='primary' type="submit" className={'w-full'} >
                            Save persanl detail
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DetailForm;