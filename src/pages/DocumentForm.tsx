/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import logo from '../assets/images/lolcf_logo.svg'
import { useForm } from 'react-hook-form';
import { Button, Loader, Uploader } from '../components';
import { RootState, useAppDispatch } from '../store/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { userDetailGet } from '../store/actions/userDetailGetActions';
import imageCompression from 'browser-image-compression';
import { createGoogleUat } from '../services/api/apiFetch';
import toast from 'react-hot-toast';
import { updateDocumentStatus } from '../store/actions/documentUpdateActions';
import { useNavigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';


const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'applocation/pdf'
]

const schema = z.object({
    USER_IDENTIFICATION_1: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'You must upload front side of the identification' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }),
    USER_IDENTIFICATION_2: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'You must upload rear side of the identification' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }),
    UTILITY_BILL: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Utility Bill is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }),
    PAY_SLIP: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Latest Pay Slip is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }),
    EMLOYEE_ID: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Employee ID is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }).optional(),
    EMPLOYEMENT_CONFIRMATION_LETTER: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Employement Confirmation Letter is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }).optional(),
    BANK_STATEMENT: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Bank Statements is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }).optional(),
    PROOF_OF_INCOME: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Proof of Income is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }).optional(),
    BUSINUESS_CARD: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Businuess Card is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }).optional(),
    BUSINUESS_REGISTRATION_CRETIFICATION: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Businuess Registeration Certificate is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }).optional(),
    SELF_BANK_STATEMENT: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Bank Statements is required' })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `Max file size is 5MB`,
        }).optional(),

})

interface FormData {
    [key: string]: any;
    USER_IDENTIFICATION_1?: any;
    USER_IDENTIFICATION_2?: any;
    UTILITY_BILL?: any;
    PAY_SLIP?: any;
    EMLOYEE_ID?: any;
    EMPLOYEMENT_CONFIRMATION_LETTER?: any;
    BANK_STATEMENT?: any;
    PROOF_OF_INCOME?: any;
    BUSINUESS_CARD?: any;
    BUSINUESS_REGISTRATION_CRETIFICATION?: any;
    SELF_BANK_STATEMENT?: any;
}

const DocumentForm = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        shouldUnregister: true,
        defaultValues: {
            USER_IDENTIFICATION_1: [],
            USER_IDENTIFICATION_2: [],
            UTILITY_BILL: [],
            PAY_SLIP: [],
            EMLOYEE_ID: [],
            EMPLOYEMENT_CONFIRMATION_LETTER: [],
            BANK_STATEMENT: [],
            PROOF_OF_INCOME: [],
            BUSINUESS_CARD: [],
            BUSINUESS_REGISTRATION_CRETIFICATION: [],
            SELF_BANK_STATEMENT: []
        }
    })
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [allUploaded, setAllUploaded] = useState(false);
    const { data: userData, loading: isUserDataLoading } = useSelector((state: RootState) => state.userDetailGet);
    const { loading: isdocumentUpdateLoading } = useSelector((state: RootState) => state.documentUpdatePost);
    const { data: userLoginData } = useSelector((state: RootState) => state.userLogin);

    useEffect(() => {
        dispatch(userDetailGet(userLoginData?.referenceNo ?? ''))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLoginData])

    /**
     * getKey - get the key for the document
     * @param key 
     * @returns 
     */
    const getKey = (key: string) => {
        switch (key) {
            case 'USER_IDENTIFICATION_1':
                return 'identification_document_1_1'
            case 'USER_IDENTIFICATION_2':
                return 'identification_document_1_2'
            case 'PROOF_OF_INCOME':
                return 'income_proof_document'
            default:
                return 'other_supporting_document'
        }
    }

    /**
    * on Submit - main api call to  save the document details
    * @param data 
    */
    const onSubmit = async (data: FormData) => {
        const uploadResult = Object.keys(data).map(async (key: any) => {
            if (data[key].length > 1) {
                data[key].forEach(async (_: any, i: number) => {
                    if (data[key][i].type !== 'application/pdf') {
                        const options = {
                            maxSizeMB: 1,
                            maxWidthOrHeight: 1920,
                            useWebWorker: true,
                            fileType: data[key].type
                        }
                        const compressedFile = await imageCompression(data[key][i], options);
                        const base64String = await fileToBase64(compressedFile);
                        return await upload(base64String.split(',')[0], getKey(key), data[key][i].type, key);
                    } else {
                        const base64String = await fileToBase64(data[key][i]);
                        return await upload(base64String.split(',')[0], getKey(key), data[key][i].type, key);
                    }
                })

            } else {
                if (data[key][0].type !== 'application/pdf') {
                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true,
                        fileType: data[key].type
                    }
                    const compressedFile = await imageCompression(data[key][0], options);
                    const base64String = await fileToBase64(compressedFile);
                    return await upload(base64String.split(',')[0], getKey(key), data[key][0].type, key);
                } else {
                    const base64String = await fileToBase64(data[key][0]);
                    return await upload(base64String.split(',')[0], getKey(key), data[key][0].type, key);
                }
            }
        })

        await Promise.all(uploadResult.flat()).then((result) => {
            if (result.includes(false)) {
                setAllUploaded(false);
            } else {
                setAllUploaded(true);
            }
        }).catch((err) => {
            console.error('[UPLOAD ERROR] - ', err)
            setAllUploaded(false)
        });

    }


    /**
     * fileToBase64
     * @param file 
     * @returns 
     */
    const fileToBase64 = (file: File): Promise<string> => {

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                const base64String = result.split(',')[1];
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    /**
     * uploadImageToGCPFunction
     * @param base64Image 
     * @param category 
     * @param type 
     * @param comment 
     */
    const upload = async (base64Image: string, category: string, type: string, comment: string): Promise<boolean> => {
        const wrapper = {
            referenceNo: userLoginData?.referenceNo,
            category: category,
            fileName: `${userLoginData?.referenceNo}_${category}_${new Date().getTime()}.${type.toLowerCase().split("/")[1]}`,
            fileType: type,
            image: base64Image,
            additionalComments: comment
        };

        try {
            const response: any = await createGoogleUat(wrapper);

            if (response.status === 200) {
                if (response.data.status === 200) {

                    toast.success(response.data.data.message ?? `${wrapper.fileName} - Document Uploaded Successfully`);
                    return true; // Success
                } else if (response.data.status === 400) {
                    toast.error(response.data.data.message);
                    return false; // Failure
                }
            } else {
                toast.error('Uploading Feature Failed, Please try again later');
                return false; // Failure
            }
        } catch (error) {
            toast.error('An error occurred while uploading the document');
            return false; // Failure
        }
        return false; // Ensure a return value for all code paths
    };

    useEffect(() => {
        if (allUploaded) {
            toast.success('All Documents Uploaded Successfully')
            dispatch(updateDocumentStatus(navigate, userLoginData?.referenceNo ?? '', "A"))
        }

        return () => {
            setAllUploaded(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allUploaded])

    isUserDataLoading && <Loader />

    return (
        <div className="bg-card-pattern flex justify-center py-5 px-2 sm:px-0 sm:h-screen">
            <div className='container flex flex-col justify-center items-center'>
                <img className="w-32 mb-3 animate-fade-up animate-duration-[1200ms] animate-once" src={logo} />
                <form onSubmit={handleSubmit(onSubmit)} className="w-full mb-10 sm:mb-0">
                    <div className='bg-primary-50 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[3000ms] animate-once hover:shadow-xl sm:h-[75vh] sm:overflow-scroll'>
                        <p className='font-semibold text-primary-950 text-center sm:text-left mb-5 text-lg'>Customer Document Details</p>
                        <div className='grid grid-cols-1 sm:grid-cols-4 gap-2'>
                            <Uploader
                                label={'NIC/Driving License (Front Side)'}
                                multiple={true}
                                required
                                {...register('USER_IDENTIFICATION_1')}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const files = event.target.files ? Array.from(event.target.files) : [];
                                    setValue('USER_IDENTIFICATION_1', files);
                                }}
                                error={errors?.USER_IDENTIFICATION_1?.message?.toString() || ''}
                            />
                            <Uploader
                                label={'NIC/Driving License (Rear Side)'}
                                multiple={true}
                                required
                                {...register('USER_IDENTIFICATION_2')}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const files = event.target.files ? Array.from(event.target.files) : [];
                                    setValue('USER_IDENTIFICATION_2', files);
                                }}
                                error={errors?.USER_IDENTIFICATION_2?.message?.toString() || ''}
                            />
                            <Uploader
                                label={'Utility Bill (within last 3 months)'}
                                multiple={true}
                                required
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const files = event.target.files ? Array.from(event.target.files) : [];
                                    setValue('UTILITY_BILL', files);
                                }}
                                error={errors.UTILITY_BILL?.message?.toString() || ''}
                            />
                            {
                                userData?.employmentCategory !== 'self' &&
                                <>
                                    <Uploader
                                        label={'Latest Pay Slip'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('PAY_SLIP', files);
                                        }}
                                        error={errors.PAY_SLIP?.message?.toString() || ''}
                                        multiple={true}
                                        required
                                    />
                                    <Uploader
                                        label={'Employee ID'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('EMLOYEE_ID', files);
                                        }}
                                        error={errors.EMLOYEE_ID?.message?.toString() || ''}
                                        multiple={true}
                                        required={false}
                                    />
                                    <Uploader
                                        label={'Employement Confirmation Letter'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('EMPLOYEMENT_CONFIRMATION_LETTER', files);
                                        }}
                                        error={errors.EMPLOYEMENT_CONFIRMATION_LETTER?.message?.toString() || ''}
                                        multiple={true}
                                        required={false}
                                    />
                                    <Uploader
                                        label={'Bank Statements (Last month)'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('BANK_STATEMENT', files);
                                        }}
                                        error={errors.BANK_STATEMENT?.message?.toString() || ''}
                                        multiple={true}
                                        required={false}
                                    />
                                    <Uploader
                                        label={'Proof of Income (Last month)'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('PROOF_OF_INCOME', files);
                                        }}
                                        error={errors.PROOF_OF_INCOME?.message?.toString() || ''}
                                        multiple={true}
                                        required={false}
                                    />
                                    <Uploader
                                        label={'Businuess Card'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('BUSINUESS_CARD', files);
                                        }}
                                        error={errors.BUSINUESS_CARD?.message?.toString() || ''}
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
                                            setValue('BUSINUESS_REGISTRATION_CRETIFICATION', files);
                                        }}
                                        error={errors.BUSINUESS_REGISTRATION_CRETIFICATION?.message?.toString() || ''}
                                        multiple={true}
                                        required={false}
                                    />
                                    <Uploader
                                        label={'Bank Statements (Last 3 months)'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('SELF_BANK_STATEMENT', files);
                                        }}
                                        error={errors.SELF_BANK_STATEMENT?.message?.toString() || ''}
                                        multiple={true}
                                        required={false}
                                    />
                                </>
                            }
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-3 justify-end h-10 animate-fade-up animate-duration-[6000ms] animate-once hidden sm:flex">
                        <Button variant='primary' type="submit" className={''} >
                            {isdocumentUpdateLoading ? <LoaderCircle className="animate-spin animate-infinite" /> : 'Save Document Details'}
                        </Button>
                    </div>
                    <div className="fixed sm:hidden bottom-3 bg-primary-50 h-auto animate-fade-up animate-duration-[6000ms] animate-once w-full rounded-lg pr-4">
                        <Button variant='primary' type="submit" className={'w-full'} >
                            {isdocumentUpdateLoading ? <LoaderCircle className="animate-spin animate-infinite" /> : 'Save Document Details'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DocumentForm