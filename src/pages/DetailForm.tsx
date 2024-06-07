import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


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


        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input
                    type="tel"
                    id="phone"
                    {...register('phone')}
                    className={`w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>
            <button type="submit" className="md:col-span-3 bg-blue-500 text-white p-2">
                Submit
            </button>
        </form>
    )
}

export default DetailForm;