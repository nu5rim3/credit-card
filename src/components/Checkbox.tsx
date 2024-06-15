import { Checkbox as HUICheckBox, CheckboxProps, Field, Label } from '@headlessui/react'
import classNames from 'classnames';
import { forwardRef } from 'react';

interface HUICheckboxProps extends CheckboxProps {
    type?: "terms" | undefined;
    label?: string;
    className?: string;
    disabled?: boolean;
    setOpen?: (value: boolean) => void;
    error?: string;
}

const Checkbox = forwardRef<HTMLElement, HUICheckboxProps>(({ label, className, disabled, type, setOpen, error, ...props }, ref) => {
    const baseStyles = 'group block w-5 h-5 rounded border bg-white data-[checked]:bg-primary-500 data-[checked]:data-[disabled]:bg-gray-500 cursor-pointer';
    const disabledStyles = 'opacity-50 cursor-not-allowed';
    return (
        <Field className="flex flex-col justify-start items-start">
            <div className='flex flex-row justify-start items-center gap-2'>
                <HUICheckBox
                    id={`id-${label?.toLowerCase()}`}
                    ref={ref}
                    disabled={disabled}
                    className={({ active, checked }) =>
                        classNames(
                            baseStyles,
                            {
                                'text-primary-900': checked,
                                'text-gray-900': !checked,
                                'ring-primary-500': active && !checked,
                                [disabledStyles]: disabled,
                            },
                            className
                        )
                    }
                    {...props}
                >
                    <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </HUICheckBox>
                {type === 'terms' ?
                    <Label className={() => classNames(
                        'text-sm',
                        {
                            'text-primary-950': props.value,
                            'text-primary': !props.value,
                            [disabledStyles]: disabled,
                        })}>I accept the <span onClick={() => setOpen && setOpen(true)} className='text-red-500 underline cursor-pointer'>terms and conditions</span></Label>
                    :
                    <Label onClick={() => props.onChange && props.onChange(!props.value)} className={() => classNames(
                        'text-sm',
                        {
                            'text-primary-950': props.value,
                            'text-primary': !props.value,
                            [disabledStyles]: disabled,
                        })}>{label}</Label>
                }
            </div>
            <Label className="block text-xs font-medium text-red-800 text-left mt-1 italic">
                {error}
            </Label>
        </Field >
    )
})

export default Checkbox