import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import logo from '../assets/images/lolcf_logo.svg'
import { useForm } from 'react-hook-form';
import { Button, Uploader } from '../components';

const schema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
})
type FormData = z.infer<typeof schema>;

const DocumentForm = () => {
    // control, register, unregister, 
    // setValue, getValues, watch,
    const { handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        shouldUnregister: true,
        defaultValues: {
            fullName: ''
        }
    })

    /**
    * on Submit - main api call to  save the document details
    * @param data 
    */
    const onSubmit = (data: FormData) => {
        // TODO: call the API
        console.log(data)
    };

    return (
        <div className="bg-card-pattern flex justify-center py-5 px-2 sm:px-0 sm:h-screen">
            <div className='container flex flex-col justify-center items-center'>
                <img className="w-32 mb-3 animate-fade-up animate-duration-[1200ms] animate-once" src={logo} />
                <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {/* Customer Personal Details */}
                    <div className='hidden sm:block' />
                    <div className='bg-primary-50 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[3000ms] animate-once hover:shadow-xl flex flex-col gap-2 sm:h-[80vh] sm:overflow-scroll'>
                        <p className='font-semibold text-primary-950'>Customer Personal Details</p>
                        <Uploader
                            label={'NIC'}
                            onFileSelected={function (files: File[]): void {
                                console.log('[FILE] - ', files)
                                throw new Error('Function not implemented.');
                            }}
                            multiple={true}
                            required
                            error={errors.fullName?.message}
                        />
                        <Uploader
                            label={'NIC'}
                            onFileSelected={function (files: File[]): void {
                                console.log('[FILE] - ', files)
                                throw new Error('Function not implemented.');
                            }}
                            multiple={true}
                            required
                            error={errors.fullName?.message}
                        />
                        <Uploader
                            label={'NIC'}
                            onFileSelected={function (files: File[]): void {
                                console.log('[FILE] - ', files)
                                throw new Error('Function not implemented.');
                            }}
                            multiple={true}
                            required
                            error={errors.fullName?.message}
                        />
                        <Uploader
                            label={'NIC'}
                            onFileSelected={function (files: File[]): void {
                                console.log('[FILE] - ', files)
                                throw new Error('Function not implemented.');
                            }}
                            multiple={true}
                            required
                            error={errors.fullName?.message}
                        />
                        <Uploader
                            label={'NIC'}
                            onFileSelected={function (files: File[]): void {
                                console.log('[FILE] - ', files)
                                throw new Error('Function not implemented.');
                            }}
                            multiple={true}
                            required
                            error={errors.fullName?.message}
                        />
                    </div>
                    {/* Customer Personal Details */}
                    <div className='bg-primary-50 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[4000ms] animate-once hover:shadow-xl flex flex-col gap-2 sm:h-[80vh] sm:overflow-scroll mb-20 sm:mb-0'>
                        <p className='font-semibold text-primary-950'>Customer Personal Details</p>
                        <Uploader
                            onFileSelected={function (files: File[]): void {
                                console.log('[FILE] - ', files)
                                throw new Error('Function not implemented.');
                            }}
                            multiple={false}
                            label={''}
                            required={false}
                            error={errors.fullName?.message}
                        />
                    </div>
                    <div className="md:col-span-3 justify-end h-10 animate-fade-up animate-duration-[6000ms] animate-once hidden sm:flex">
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