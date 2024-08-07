/* eslint-disable no-debugger */
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
import { updateDocumentStatus } from '../store/actions/documentUpdateActions';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LoaderCircle, StepBack } from 'lucide-react';
import ConfirmDialog from '../components/ConfirmDialog';
import toast from 'react-hot-toast';


const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/pdf'
]

const baseSchema = z.object({
    USER_IDENTIFICATION_1: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'You must upload front side of the identification' })
        .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
            message: `Max file size is 5MB`,
        }),
    USER_IDENTIFICATION_2: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'You must upload rear side of the identification' })
        .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
            message: `Max file size is 5MB`,
        }),
    UTILITY_BILL: z
        .any()
        .refine((files) => files?.length >= 1, { message: 'Utility bill is required atleast 1 file' })
        .refine((files) => files?.length <= 3, { message: 'You can upload upto 3 files' })
        .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
            message: '.jpg, .jpeg, .png and .pdf files are accepted',
        })
        .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
            message: `Max file size is 5MB`,
        })
})

// Function to extend the schema based on employmentCategory
const getDynamicSchema = (employmentCategory?: string) => {
    let dynamicPart = z.object({});
    switch (employmentCategory) {
        case 'Government Sector':
            dynamicPart = z.object({
                PAY_SLIP: z
                    .any()
                    .refine((files) => files?.length >= 1, { message: 'Latest pay slip is required atleast 1 file' })
                    .refine((files) => files?.length <= 3, { message: 'You can upload upto 3 files' })
                    .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
                        message: '.jpg, .jpeg, .png and .pdf files are accepted',
                    })
                    .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
                        message: `Max file size is 5MB`,
                    }),
                EMLOYEE_ID: z
                    .any()
                    .refine((files) => files?.length >= 1, { message: 'Employee ID is required' })
                    .refine((files) => files?.length <= 2, { message: 'You can upload upto 2 files' })
                    .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
                        message: '.jpg, .jpeg, .png and .pdf files are accepted',
                    })
                    .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
                        message: `Max file size is 5MB`,
                    }).optional(),
                EMPLOYEMENT_CONFIRMATION_LETTER: z
                    .any()
                    .refine((files) => files?.length >= 1, { message: 'Employment confirmation letter is required' })
                    .refine((files) => files?.length <= 2, { message: 'You can upload upto 2 files' })
                    .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
                        message: '.jpg, .jpeg, .png and .pdf files are accepted',
                    })
                    .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
                        message: `Max file size is 5MB`,
                    }).optional(),
                BANK_STATEMENT: z
                    .any()
                    .refine((files) => files?.length >= 1, { message: 'Bank statements is required' })
                    .refine((files) => files?.length <= 20, { message: 'You can upload upto 20 files' })
                    .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
                        message: '.jpg, .jpeg, .png and .pdf files are accepted',
                    })
                    .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
                        message: `Max file size is 5MB`,
                    }).optional(),
                PROOF_OF_INCOME: z
                    .any()
                    .refine((files) => files?.length >= 2, { message: 'Proof of income is required atleast 2 files' })
                    .refine((files) => files?.length <= 5, { message: 'You can upload upto 5 files' })
                    .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
                        message: '.jpg, .jpeg, .png and .pdf files are accepted',
                    })
                    .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
                        message: `Max file size is 5MB`,
                    }),
                BUSINESS_CARD: z
                    .any()
                    .refine((files) => files?.length >= 1, { message: 'Business card is required' })
                    .refine((files) => files?.length <= 2, { message: 'You can upload upto 2 files' })
                    .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
                        message: '.jpg, .jpeg, .png and .pdf files are accepted',
                    })
                    .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
                        message: `Max file size is 5MB`,
                    }).optional(),
            });
            break;
        case 'Private Sector':
            dynamicPart = z.object({
                PAY_SLIP: z
                    .any()
                    .refine((files) => files?.length >= 1, { message: 'Latest pay slip is required atleast 1 file' })
                    .refine((files) => files?.length <= 3, { message: 'You can upload upto 3 files' })
                    .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
                        message: '.jpg, .jpeg, .png and .pdf files are accepted',
                    })
                    .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
                        message: `Max file size is 5MB`,
                    }),
                EMLOYEE_ID: z
                    .any()
                    .refine((files) => files?.length >= 1, { message: 'Employee ID is required atleast 1 file' })
                    .refine((files) => files?.length <= 2, { message: 'You can upload upto 2 files' })
                    .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
                        message: '.jpg, .jpeg, .png and .pdf files are accepted',
                    })
                    .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
                        message: `Max file size is 5MB`,
                    }).optional(),
                EMPLOYEMENT_CONFIRMATION_LETTER: z
                    .any()
                    .refine((files) => files?.length >= 1, { message: 'Employment confirmation letter is required' })
                    .refine((files) => files?.length <= 2, { message: 'You can upload upto 2 files' })
                    .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
                        message: '.jpg, .jpeg, .png and .pdf files are accepted',
                    })
                    .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
                        message: `Max file size is 5MB`,
                    }).optional(),
                BANK_STATEMENT: z
                    .any()
                    .refine((files) => files?.length >= 1, { message: 'Bank statements is required' })
                    .refine((files) => files?.length <= 20, { message: 'You can upload upto 20 files' })
                    .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
                        message: '.jpg, .jpeg, .png and .pdf files are accepted',
                    })
                    .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
                        message: `Max file size is 5MB`,
                    }).optional(),
                PROOF_OF_INCOME: z
                    .any()
                    .refine((files) => files?.length >= 2, { message: 'Proof of income is required atleast 2 files' })
                    .refine((files) => files?.length <= 5, { message: 'You can upload upto 5 files' })
                    .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
                        message: '.jpg, .jpeg, .png and .pdf files are accepted',
                    })
                    .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
                        message: `Max file size is 5MB`,
                    }),
                BUSINESS_CARD: z
                    .any()
                    .refine((files) => files?.length >= 1, { message: 'Business card is required' })
                    .refine((files) => files?.length <= 2, { message: 'You can upload upto 2 files' })
                    .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
                        message: '.jpg, .jpeg, .png and .pdf files are accepted',
                    })
                    .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
                        message: `Max file size is 5MB`,
                    }).optional(),
            });
            break;
        case 'Self Employed':
            dynamicPart = z.object({

                BUSINESS_REGISTRATION_CRETIFICATION: z
                    .any()
                    .refine((files) => files?.length >= 1, { message: 'Business registeration certificate is required' })
                    .refine((files) => files?.length <= 5, { message: 'You can upload upto 5 files' })
                    .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
                        message: '.jpg, .jpeg, .png and .pdf files are accepted',
                    })
                    .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
                        message: `Max file size is 5MB`,
                    }).optional(),
                SELF_BANK_STATEMENT: z
                    .any()
                    .refine((files) => files?.length >= 1, { message: 'Bank statements is required atleast 3 files' })
                    .refine((files) => files?.length <= 20, { message: 'You can upload upto 20 files' })
                    .refine((files) => files?.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)), {
                        message: '.jpg, .jpeg, .png and .pdf files are accepted',
                    })
                    .refine((files) => files?.every((file: File) => file.size <= MAX_FILE_SIZE), {
                        message: `Max file size is 5MB`,
                    }),
            });
            break;
        // Add more cases as needed
        default:
            break;
    }
    return baseSchema.merge(dynamicPart);
};

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
    BUSINESS_CARD?: any;
    BUSINESS_REGISTRATION_CRETIFICATION?: any;
    SELF_BANK_STATEMENT?: any;
}

const DocumentForm = () => {
    const { data: userData, loading: isUserDataLoading } = useSelector((state: RootState) => state.userDetailGet);
    const schema = getDynamicSchema(userData?.employmentCategory);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        shouldUnregister: true,
        reValidateMode: 'onSubmit',
        mode: 'onSubmit',
        defaultValues: {
            USER_IDENTIFICATION_1: [],
            USER_IDENTIFICATION_2: [],
            UTILITY_BILL: [],
            PAY_SLIP: [],
            EMLOYEE_ID: [],
            EMPLOYEMENT_CONFIRMATION_LETTER: [],
            BANK_STATEMENT: [],
            PROOF_OF_INCOME: [],
            BUSINESS_CARD: [],
            BUSINESS_REGISTRATION_CRETIFICATION: [],
            SELF_BANK_STATEMENT: []
        }
    })
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [allUploaded, setAllUploaded] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState<FormData | undefined>();
    const { loading: isdocumentUpdateLoading } = useSelector((state: RootState) => state.documentUpdatePost);
    const { data: userLoginData } = useSelector((state: RootState) => state.userLogin);

    useEffect(() => {
        dispatch(userDetailGet(userLoginData?.referenceNo ?? ''))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLoginData])

    // /**
    //  * getKey - get the key for the document
    //  * @param key 
    //  * @returns 
    //  */
    // const getKey = (key: string) => {
    //     switch (key) {
    //         case 'USER_IDENTIFICATION_1':
    //             return 'identification_document_1'
    //         case 'USER_IDENTIFICATION_2':
    //             return 'identification_document_2'
    //         case 'PROOF_OF_INCOME':
    //             return 'income_proof_document'
    //         default:
    //             return 'other_supporting_document'
    //     }
    // }

    /**
    * on Submit - main api call to  save the document details
    * @param data 
    */
    const onSubmit = async (data: FormData) => {
        setConfirmDialog(true);
        setFormData(
            data ? Object.entries(data).flatMap(([key, files]) =>
                files.map((file: any) => {
                    file.key = key;
                    return file;
                })
            ) : []
        );
    }

    /**
     * onConfirm - upload the documents to the GCP
     */
    const onConfirm = async () => {
        setIsUploading(true);

        const resultArray = formData && formData.map(async (file: any) => {

            if (file.type !== 'application/pdf') {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                    fileType: file.type
                }
                return imageCompression(file, options).then(async (compressedFile) => {
                    file.compressedFile = compressedFile;
                    return fileToBase64(file).then(async (base64String) => {
                        file.base64String = base64String.split(',')[0];
                        return await upload(file.base64String, file.key, file.type, file.key);
                    });
                });
            } else {
                return fileToBase64(file).then(async (base64String) => {
                    file.base64String = base64String.split(',')[0];
                    return await upload(file.base64String, file.key, file.type, file.key);
                });
            }
        });
        await Promise.all(resultArray).then((result) => {

            if (result.includes(false)) {
                setAllUploaded(false);
                toast.error('Uploading Feature Failed, Please try again later');
            } else if (!result.includes(false)) {
                setAllUploaded(true);
            }
        }).catch((err) => {
            console.error('[UPLOAD ERROR] - ', err)
            setAllUploaded(false)
        });
        setIsUploading(false);
        setConfirmDialog(false);
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

                    // toast.success(response.data.data.message ?? `${wrapper.fileName} - Document Uploaded Successfully`);
                    return true; // Success
                } else if (response.data.status === 400) {
                    // toast.error(response.data.data.message);
                    return false; // Failure
                }
            } else {
                // toast.error('Uploading Feature Failed, Please try again later');
                return false; // Failure
            }
        } catch (error) {
            // toast.error('An error occurred while uploading the document');
            return false; // Failure
        }
        return false; // Ensure a return value for all code paths
    };

    useEffect(() => {
        if (allUploaded) {
            // toast.success('All Documents Uploaded Successfully')
            dispatch(updateDocumentStatus(navigate, userLoginData?.referenceNo ?? '', "A"))
        }
        // else {
        //     // toast.error('Failed to upload the documents')
        // }

        return () => {
            setAllUploaded(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allUploaded])

    const onBack = () => {
        navigate('/personal-detail')
    }

    useEffect(() => {
        if (userData?.stage === 'COMPLETED') {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData])

    isUserDataLoading && <Loader />

    return (
        <div className="bg-card-pattern flex justify-center py-5 px-2 sm:px-0 sm:h-screen">
            <div className='container flex flex-col justify-center items-center md:p-4'>
                <img className="w-32 mb-3 animate-fade-up animate-duration-[1200ms] animate-once" src={logo} />
                <div className='w-full flex flex-1 sm:hidden'>
                    <Button variant={'link'} className='flex flex-row items-center' onClick={onBack}>
                        <StepBack size={18} className='mr-1' /> Personal details
                    </Button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full mb-10 sm:mb-0">
                    <div className='bg-primary-50 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[3000ms] animate-once hover:shadow-xl sm:h-[75vh] sm:overflow-scroll'>
                        <p className='font-semibold text-primary-950 text-center sm:text-left mb-5 text-lg'>Customer Document Details</p>
                        <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-4 gap-3'>
                            <Uploader
                                label={'NIC/Driving License (Front Side)'}
                                multiple={false}
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
                                multiple={false}
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
                                ruleLabel={"Utility bills mandatory 1 maximum 3"}
                            />
                            {
                                userData?.employmentCategory !== 'Self Employed' &&
                                <>
                                    <Uploader
                                        label={'Latest Pay Slip'}
                                        multiple={true}
                                        required
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('PAY_SLIP', files);
                                        }}
                                        error={errors.PAY_SLIP?.message?.toString() || ''}
                                        ruleLabel={"Pay slip mandatory 1 maximum 3"}
                                    />
                                    <Uploader
                                        label={'Employee ID'}
                                        multiple={true}
                                        required={false}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('EMLOYEE_ID', files);
                                        }}
                                        error={errors.EMLOYEE_ID?.message?.toString() || ''}
                                        ruleLabel={"Employee ID mandatory 1 maximum 3"}
                                    />
                                    <Uploader
                                        label={'Employment Confirmation Letter'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('EMPLOYEMENT_CONFIRMATION_LETTER', files);
                                        }}
                                        error={errors.EMPLOYEMENT_CONFIRMATION_LETTER?.message?.toString() || ''}
                                        multiple={true}
                                        required={false}
                                        ruleLabel={"Employment confirmation letter non-mandatory maximum 3"}
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
                                        ruleLabel={"Bank statements non-mandatory maximum 20"}
                                    />
                                    <Uploader
                                        label={'Proof of Income (Last month)'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('PROOF_OF_INCOME', files);
                                        }}
                                        error={errors.PROOF_OF_INCOME?.message?.toString() || ''}
                                        multiple={true}
                                        required
                                        ruleLabel={"Proof of income mandatory 2 maximum 5"}
                                    />
                                    <Uploader
                                        label={'Business Card'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('BUSINESS_CARD', files);
                                        }}
                                        error={errors.BUSINESS_CARD?.message?.toString() || ''}
                                        multiple={true}
                                        required={false}
                                        ruleLabel={"Business card non-mandatory maximum 2"}
                                    />
                                </>
                            }
                            {
                                userData?.employmentCategory === 'Self Employed' &&
                                <>
                                    <Uploader
                                        label={'Business Registeration Certificate'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('BUSINESS_REGISTRATION_CRETIFICATION', files);
                                        }}
                                        error={errors.BUSINESS_REGISTRATION_CRETIFICATION?.message?.toString() || ''}
                                        multiple={true}
                                        required={false}
                                        ruleLabel={"Business registeration certificate non-mandatory maximum 5"}
                                    />
                                    <Uploader
                                        label={'Bank Statements (Last 3 months)'}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const files = event.target.files ? Array.from(event.target.files) : [];
                                            setValue('SELF_BANK_STATEMENT', files);
                                        }}
                                        error={errors.SELF_BANK_STATEMENT?.message?.toString() || ''}
                                        multiple={true}
                                        required
                                        ruleLabel={"Bank statements mandatory 3 maximum 20"}
                                    />
                                </>
                            }
                        </div>
                    </div>
                    <div className="mt-5 md:col-span-3 justify-between h-10 animate-fade-up animate-duration-[6000ms] animate-once hidden sm:flex">
                        <Button variant={'link'} className='flex flex-row items-center' onClick={onBack}>
                            <StepBack size={18} className='mr-1' /> Personal details
                        </Button>
                        <Button variant='primary' type="submit" className={'flex flex-row items-center justify-between gap-2 h-full'} disabled={isdocumentUpdateLoading} >
                            {'Save Document Details'}
                            {isdocumentUpdateLoading ? <LoaderCircle className="animate-spin animate-infinite" /> : <ArrowRight />}
                        </Button>
                    </div>
                    <div className="fixed sm:hidden bottom-3 bg-primary-50 h-auto animate-fade-up animate-duration-[6000ms] animate-once w-full rounded-lg pr-4">
                        <Button variant='primary' type="submit" className={'w-full flex flex-row items-center justify-between gap-2 mt-3'} disabled={isdocumentUpdateLoading} >
                            {'Save Document Details'}
                            {isdocumentUpdateLoading ? <LoaderCircle className="animate-spin animate-infinite" /> : <ArrowRight />}
                        </Button>
                    </div>
                </form>
            </div>
            <ConfirmDialog open={confirmDialog} close={() => setConfirmDialog(false)} onConfirm={onConfirm} loading={isUploading} />
        </div>
    )
}

export default DocumentForm