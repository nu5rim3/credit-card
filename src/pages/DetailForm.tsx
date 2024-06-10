import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '../components';


const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type FormData = z.infer<typeof schema>;

const DetailForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => console.log(data);
    return (
        <div className='flex justify-center bg-primary-50 sm:h-screen py-5 px-2 sm:px-0'>
            <div className='container flex justify-center items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className='bg-primary-100 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[3000ms] animate-once hover:shadow-xl flex flex-col gap-2'>
                        <Input type={'text'} label={'Name'} required {...register('name')} error={errors.name?.message} />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                    </div>
                    <div className='bg-primary-100 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[4000ms] animate-once hover:shadow-xl flex flex-col gap-2'>
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                    </div>
                    <div className='bg-primary-100 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[5000ms] animate-once hover:shadow-xl mb-20 sm:mb-0 flex flex-col gap-2'>
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
                        <Input type={'text'} label={'Sample'} required />
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