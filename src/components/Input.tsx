import { forwardRef } from 'react'
import { Field, Input as HUIInput, InputProps, Label } from '@headlessui/react'
import classNames from 'classnames';

interface HUIInputProps extends InputProps {
    type: 'text' | 'password' | 'email' | 'tel' | 'url' | 'number' | 'date' | 'datetime-local' | 'month' | 'week' | 'time' | 'range' | 'search';
    label: string;
    value?: string;
    disabled?: boolean;
    className?: string;
    required?: boolean;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, HUIInputProps>(({ type, label, value, disabled, className, required, error, ...props }, ref) => {
    const baseStyles = 'block w-full py-2 px-3 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm bg-gray-100';
    const disabledStyles = 'opacity-50 cursor-not-allowed';
    return (
        <Field>
            <Label className="block text-sm font-medium text-primary text-left mb-1">{label}{required && <span className='ml-1 text-red-800'>*</span>}</Label>
            <HUIInput
                // required={required}
                ref={ref}
                id={`id-${label.toLowerCase()}`}
                name={label}
                type={type}
                value={value}
                disabled={disabled}
                {...props}
                className={classNames(
                    baseStyles,
                    { [disabledStyles]: disabled },
                    className
                )}
            />
            <Label className="block text-xs font-medium text-red-800 text-left mt-1 italic">{error}</Label>
        </Field>
    )
})


export default Input