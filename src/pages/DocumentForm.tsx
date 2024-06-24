import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import logo from '../assets/images/lolcf_logo.svg'
import { useForm } from 'react-hook-form';
import { Button, Loader, Uploader } from '../components';
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userDetailGet } from '../store/actions/userDetailGetActions';
import imageCompression from 'browser-image-compression';

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'applocation/pdf'
]

const schema = z.object({
    identification: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'You must upload both sides of the identification' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }),
    utilityBill: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Utility Bill is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }),
    latestPaySlip: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Latest Pay Slip is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }),
    employeeID: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Employee ID is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }).optional(),
    employementConfirmationLetter: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Employement Confirmation Letter is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }).optional(),
    BankStatements: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Bank Statements is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }).optional(),
    proofOfIncome: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Proof of Income is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }).optional(),
    businuessCard: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Businuess Card is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }).optional(),
    businuessRegisterationCertificate: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Businuess Registeration Certificate is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }).optional(),
    selfBankStatements: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Bank Statements is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }).optional(),

})
type FormData = z.infer<typeof schema>;

const DocumentForm = () => {
    // control, register, unregister, 
    // setValue, getValues, watch,
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        shouldUnregister: true,
        defaultValues: {
            identification: [],
            utilityBill: [],
            latestPaySlip: [],
            employeeID: [],
            employementConfirmationLetter: [],
            BankStatements: [],
            proofOfIncome: [],
            businuessCard: [],
            businuessRegisterationCertificate: [],
            selfBankStatements: []
        }
    })
    const dispatch = useAppDispatch();
    const { data: userData, loading: isUserDataLoading } = useSelector((state: RootState) => state.userDetailGet);
    const { data: userLoginData } = useSelector((state: RootState) => state.userLogin);

    useEffect(() => {
        dispatch(userDetailGet(userLoginData?.referenceNo ?? ''))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLoginData])

    /**
    * on Submit - main api call to  save the document details
    * @param data 
    */
    const onSubmit = (data: FormData) => {
        // TODO: call the API
        console.log('CLICKED')
        const files = extractFiles(data);
        uploadBuildFormData(files)
    };

    const uploadBuildFormData = async (data: File[]) => {
        console.log('DATA - ', data)
        data.map(async (file) => {
            if (file.type !== 'application/pdf') {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                    fileType: file.type
                }
                const compressedFile = await imageCompression(file, options);
                let base64String = await fileToBase64(compressedFile);
                // await upload(base64String.split(',')[1], key, data[key][i].type, data.expected_card_limit);
            } else {
                console.log('PDF')
                // await upload(base64String.split(',')[1], key, data[key][i].type, data.expected_card_limit);
            }
        })

    }

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                const base64String = result.split(',')[1]; // Removing the prefix if you want only the Base64 string
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const extractFiles = (filesObject: any): File[] => {
        const fileArray: File[] = [];

        for (const key in filesObject) {
            if (Object.prototype.hasOwnProperty.call(filesObject, key)) {
                fileArray.push(...filesObject[key]);
            }
        }

        return fileArray;
    };

    isUserDataLoading && <Loader />

    return (
        <div className="bg-card-pattern flex justify-center py-5 px-2 sm:px-0 sm:h-screen">
            <div className='container flex flex-col justify-center items-center'>
                <img className="w-32 mb-3 animate-fade-up animate-duration-[1200ms] animate-once" src={logo} />
                <form onSubmit={handleSubmit(onSubmit)} className="w-full mb-10 sm:mb-0">
                    {/* Customer Personal Details */}
                    <div className='bg-primary-50 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[3000ms] animate-once hover:shadow-xl sm:h-[75vh] sm:overflow-scroll'>
                        <p className='font-semibold text-primary-950 text-center sm:text-left mb-5 text-lg'>Customer Document Details</p>
                        <div className='grid grid-cols-1 sm:grid-cols-4 gap-2'>
                            <Uploader
                                label={'NIC/Driving License (Both Side)'}
                                multiple={true}
                                required
                                {...register('identification')}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const files = event.target.files ? Array.from(event.target.files) : [];
                                    setValue('identification', files);
                                }}
                                error={errors?.identification?.message?.toString() || ''}
                            />
                            <Uploader
                                label={'Utility Bill (within last 3 months)'}
                                multiple={true}
                                required
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const files = event.target.files ? Array.from(event.target.files) : [];
                                    setValue('utilityBill', files);
                                }}
                                error={errors.utilityBill?.message?.toString() || ''}
                            />
                            {
                                userData?.employmentCategory !== 'self' &&
                                <>
                                    <Uploader
                                        label={'Latest Pay Slip'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('latestPaySlip', files);
                                        }}
                                        error={errors.latestPaySlip?.message?.toString() || ''}
                                        multiple={true}
                                        required
                                    />
                                    <Uploader
                                        label={'Employee ID'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('employeeID', files);
                                        }}
                                        error={errors.employeeID?.message?.toString() || ''}
                                        multiple={true}
                                        required={false}
                                    />
                                    <Uploader
                                        label={'Employement Confirmation Letter'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('employementConfirmationLetter', files);
                                        }}
                                        error={errors.employementConfirmationLetter?.message?.toString() || ''}
                                        multiple={true}
                                        required={false}
                                    />
                                    <Uploader
                                        label={'Bank Statements (Last month)'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('BankStatements', files);
                                        }}
                                        error={errors.BankStatements?.message?.toString() || ''}
                                        multiple={true}
                                        required={false}
                                    />
                                    <Uploader
                                        label={'Proof of Income (Last month)'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('proofOfIncome', files);
                                        }}
                                        error={errors.proofOfIncome?.message?.toString() || ''}
                                        multiple={true}
                                        required={false}
                                    />
                                    <Uploader
                                        label={'Businuess Card'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('businuessCard', files);
                                        }}
                                        error={errors.businuessCard?.message?.toString() || ''}
                                        multiple={true}
                                        required={false}
                                    />
                                </>
                            }
                            {
                                userData?.employmentCategory === 'self' &&
                                <>
                                    <Uploader
                                        label={'Businuess Registeration Certificate'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('businuessRegisterationCertificate', files);
                                        }}
                                        error={errors.businuessRegisterationCertificate?.message?.toString() || ''}
                                        multiple={true}
                                        required={false}
                                    />
                                    <Uploader
                                        label={'Bank Statements (Last 3 months)'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('selfBankStatements', files);
                                        }}
                                        error={errors.selfBankStatements?.message?.toString() || ''}
                                        multiple={true}
                                        required={false}
                                    />
                                </>
                            }
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-3 justify-end h-10 animate-fade-up animate-duration-[6000ms] animate-once hidden sm:flex">
                        <Button variant='primary' type="submit" className={''} >
                            Save Document Details
                        </Button>
                    </div>
                    <div className="fixed sm:hidden bottom-3 bg-primary-50 h-auto animate-fade-up animate-duration-[6000ms] animate-once w-full rounded-lg pr-4">
                        <Button variant='primary' type="submit" className={'w-full'} >
                            Save Document Details
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DocumentForm