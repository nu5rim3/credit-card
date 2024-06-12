import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Listbox, RadioGroup } from '../components';
import logo from '../assets/images/lolcf_logo.svg'
import { RadioOption } from '../components/RadioGroup';
import { useEffect, useState } from 'react';

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
            return !isNaN(date.getTime()) && date.getTime() <= eighteenYearsAgoTime;
        },
        { message: "You must be at least 18 years old" }
    ),
    mothersMaidenName: z.string().min(1, 'Mother`s Maiden Name is required'),
    residencePhone: z.string().optional().refine((val) => !val || /^\d{10}$|^\+\d{1,3}\d{10}$/.test(val), {
        message: 'Invalid phone number (e.g. +94712345678)',
    }),
    permAddressLine1: z.string().min(1, 'Permanent Address is required'),
    permAddressLine2: z.string().optional(),
    permAddressLine3: z.string().optional(),
    permAddressLine4: z.string().optional(),
    mailAddressLine1: z.string().min(1, 'Mailling Address is required'),
    mailAddressLine2: z.string().optional(),
    mailAddressLine3: z.string().optional(),
    mailAddressLine4: z.string().optional(),
    whatsappNo: z.string().regex(/^(?:\+\d{1,3}\d{10}|[0-9]{10})$/, 'Invalid phone number (e.g. +94712345678)'),
    additionalContactNo: z.string().optional().refine((val) => !val || /^\d{10}$|^\+\d{1,3}\d{10}$/.test(val), {
        message: 'Invalid phone number (e.g. +94712345678)',
    }),
    residenceType: z.string().min(1, 'Residence Type is required'),
    province: z.string().min(1, 'Province is required'),
})

const nationalities: RadioOption[] = [{ label: 'Sri Lankan', value: 'SriLankan' }, { label: 'Other', value: 'Other' }]
const residenceTypes: RadioOption[] = [{ label: 'Resident', value: 'Resident' }, { label: 'NonResident', value: 'NonResident' }]
const preferredLanguages = ["English", "Sinhala", "Tamil"]
const provinces = ["Central", "Eastern", "North Central", "North Western", "Northern", "Sabaragamuwa", "Southern", "Western", "Uva"]

type FormData = z.infer<typeof schema>;


const DetailForm = () => {
    const { control, register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            nationality: "",
            fullName: "",
            preferredLanguage: preferredLanguages[0],
            dob: "",
            mothersMaidenName: "",
            residencePhone: "",
            whatsappNo: "",
            additionalContactNo: "",
            residenceType: "",
            permAddressLine1: "",
            permAddressLine2: "",
            permAddressLine3: "",
            permAddressLine4: "",
            province: provinces[0],
            mailAddressLine1: "",
            mailAddressLine2: "",
            mailAddressLine3: "",
            mailAddressLine4: "",
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
    const [sameMobile, setSameMobile] = useState<boolean>(false)
    const [sameAddress, setSameAddress] = useState<boolean>(false)

    const onSubmit = (data: FormData) => {
        // TODO: call the API
        console.log(data)
    };

    const handleNationalityChange = (value: string) => {
        setValue("nationality", value);
    };

    const handleresidenceTypeChange = (value: string) => {
        setValue("residenceType", value);
    };

    useEffect(() => {
        if (sameMobile) {
            setValue("whatsappNo", '0762525765');
        } else {
            setValue("whatsappNo", '');
        }
        if (sameAddress) {
            const { permAddressLine1, permAddressLine2, permAddressLine3, permAddressLine4 } = getValues();
            setValue('mailAddressLine1', permAddressLine1)
            setValue('mailAddressLine2', permAddressLine2)
            setValue('mailAddressLine3', permAddressLine3)
            setValue('mailAddressLine4', permAddressLine4)
        } else {
            setValue('mailAddressLine1', "")
            setValue('mailAddressLine2', "")
            setValue('mailAddressLine3', "")
            setValue('mailAddressLine4', "")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sameMobile, sameAddress])


    return (
        <div className='flex justify-center bg-primary-50 py-5 px-2 sm:px-0'>
            <div className='container flex flex-col justify-center items-center'>
                <img className="w-32 mb-3 animate-fade-up animate-duration-[1200ms] animate-once" src={logo} />
                <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className='bg-primary-100 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[3000ms] animate-once hover:shadow-xl flex flex-col gap-2'>
                        <p className='font-semibold text-primary-950'>Customer Personal Details</p>
                        <Input type={'text'} label={'Full Name'} required {...register('fullName')} error={errors.fullName?.message} />
                        <Input
                            type={'date'}
                            label={'Date of Birth'}
                            required
                            error={errors.dob?.message}
                            {...register('dob')}
                        />
                        <Input
                            type={'text'}
                            label={'Mother`s Maiden Name'}
                            required
                            error={errors.mothersMaidenName?.message}
                            {...register('mothersMaidenName')}
                        />
                        <Input
                            type={'text'}
                            label={'Whatsapp Number'}
                            error={errors.whatsappNo?.message}
                            {...register('whatsappNo')}
                            check
                            checkLabel={'Same as the mobile number'}
                            checkStatus={sameMobile}
                            setCheackStatus={setSameMobile}
                            required
                        />
                        <>
                            <Input
                                type={'text'}
                                label={'Permenant Address'}
                                {...register('permAddressLine1')}
                                placeholder='Line 1'
                                required
                            />
                            <Input
                                type={'text'}
                                {...register('permAddressLine2')}
                                placeholder='Line 2'
                            />
                            <Input
                                type={'text'}
                                {...register('permAddressLine3')}
                                placeholder='Line 3'
                            />
                            <Input
                                type={'text'}
                                error={errors.permAddressLine1?.message}
                                {...register('permAddressLine4')}
                                placeholder='Line 4'
                            />
                        </>
                        <>
                            <Input
                                type={'text'}
                                label={'Mailling Address'}
                                {...register('mailAddressLine1')}
                                placeholder='Line 1'
                                check
                                checkLabel={'Same as the permenant address'}
                                checkStatus={sameAddress}
                                setCheackStatus={setSameAddress}
                                required
                            />
                            <Input
                                type={'text'}
                                {...register('mailAddressLine2')}
                                disabled={sameAddress}
                                placeholder='Line 2'
                            />
                            <Input
                                type={'text'}
                                {...register('mailAddressLine3')}
                                disabled={sameAddress}
                                placeholder='Line 3'
                            />
                            <Input
                                type={'text'}
                                error={errors.mailAddressLine1?.message}
                                {...register('mailAddressLine4')}
                                disabled={sameAddress}
                                placeholder='Line 4'
                            />
                        </>
                        <Controller
                            control={control}
                            name={'province'}
                            render={({ field }) =>
                                <Listbox
                                    options={provinces}
                                    label={'Province'}
                                    error={errors.province?.message}
                                    {...field}
                                    required
                                />
                            }
                        />
                        <Controller
                            control={control}
                            name={'preferredLanguage'}
                            render={({ field }) =>
                                <Listbox
                                    options={preferredLanguages}
                                    label={'Preferred Language'}
                                    error={errors.preferredLanguage?.message}
                                    {...field}
                                    required
                                />
                            }
                        />
                        <Controller
                            control={control}
                            name={'nationality'}
                            render={({ field }) =>
                                <RadioGroup
                                    options={nationalities}
                                    label={'Nationality'}
                                    error={errors.nationality?.message}
                                    {...field}
                                    onChange={handleNationalityChange}
                                    required
                                />
                            }
                        />
                        <Controller
                            control={control}
                            name={'residenceType'}
                            render={({ field }) =>
                                <RadioGroup
                                    options={residenceTypes}
                                    label={'Resident Type'}
                                    error={errors.residenceType?.message}
                                    {...field}
                                    onChange={handleresidenceTypeChange}
                                    required
                                />
                            }
                        />
                        <Input
                            type={'text'}
                            label={'Residence Phone Number'}
                            error={errors.residencePhone?.message}
                            {...register('residencePhone')}
                        />
                        <Input
                            type={'text'}
                            label={'Additional Contact Number'}
                            error={errors.additionalContactNo?.message}
                            {...register('additionalContactNo')}
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
                    <div className="md:col-span-4 justify-end h-10 animate-fade-up animate-duration-[6000ms] animate-once hidden sm:flex">
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