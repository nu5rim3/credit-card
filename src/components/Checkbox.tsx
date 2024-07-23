import { Checkbox as HUICheckBox, Field, Label } from '@headlessui/react'
import classNames from 'classnames';
import { forwardRef } from 'react';

interface HUICheckboxProps {
    type?: "terms" | undefined;
    label?: string;
    className?: string;
    disabled?: boolean;
    setOpen?: (value: boolean) => void;
    error?: string;
    checked?: boolean;
    setCheackStatus?: (check: boolean) => void;
}

const Checkbox = forwardRef<HTMLElement, HUICheckboxProps>(({ label, className, disabled, type, setOpen, error, checked, setCheackStatus, ...props }, ref) => {
    const baseCheckboxStyles = 'group block w-5 h-5 rounded border border-blue-900 bg-white data-[checked]:bg-primary-500 data-[checked]:data-[disabled]:bg-gray-500 cursor-pointer';
    const disabledStyles = 'opacity-50 cursor-not-allowed';

    return (
        <Field className="flex flex-col justify-start items-start">
            <div className='flex flex-row justify-start items-center gap-2'>
                <HUICheckBox
                    ref={ref}
                    checked={checked}
                    disabled={disabled}
                    onChange={() => setCheackStatus && setCheackStatus(checked ?? false)}
                    className={({ active, checked }) =>
                        classNames(
                            baseCheckboxStyles,
                            {
                                "text-primary-900": checked,
                                "text-gray-900": !checked,
                                "ring-primary-500": active && !checked,
                                [disabledStyles]: disabled,
                            },
                            className
                        )
                    }
                    {...props}
                >
                    <svg
                        className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                    >
                        <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </HUICheckBox>
                {type === 'terms' ?
                    <Label className={() => classNames(
                        'text-sm',
                        {
                            'text-primary-950': checked,
                            'text-primary': !checked,
                            [disabledStyles]: disabled,
                        })}>I accept the <span onClick={() => setOpen && setOpen(true)} className='text-red-500 underline cursor-pointer'>terms and conditions</span></Label>
                    :
                    <Label onClick={() => setCheackStatus && setCheackStatus(!checked)} className={() => classNames(
                        'text-sm',
                        {
                            'text-primary-950': checked,
                            'text-primary': !checked,
                            [disabledStyles]: disabled,
                        })}>{label}</Label>
                }
            </div>
            <Label className="block text-xs font-medium text-red-800 text-left mt-1 italic normal-case">
                {error}
            </Label>
        </Field >
    )
})

export default Checkbox