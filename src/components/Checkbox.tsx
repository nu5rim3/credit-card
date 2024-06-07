import { Checkbox as HUICheckBox, CheckboxProps, Field, Label } from '@headlessui/react'
import classNames from 'classnames';
import { forwardRef } from 'react';

interface HUICheckboxProps extends CheckboxProps {
    label: string;
    enabled: boolean;
    className?: string;
    disabled?: boolean;
    onChange: (value: boolean) => void;
}

const Checkbox = forwardRef<HTMLElement, HUICheckboxProps>(({ label, enabled, className, onChange, disabled, ...props }, ref) => {
    const baseStyles = 'group block w-5 h-5 rounded border bg-white data-[checked]:bg-primary-500 data-[checked]:data-[disabled]:bg-gray-500 cursor-pointer';
    const disabledStyles = 'opacity-50 cursor-not-allowed';
    return (
        <Field className="flex items-center gap-2">
            <HUICheckBox
                id={`id-${label.toLowerCase()}`}
                ref={ref}
                checked={enabled}
                disabled={disabled}
                onChange={onChange}
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
            <Label onClick={() => onChange(!enabled)} className={() => classNames(
                'text-sm',
                {
                    'text-primary-900': enabled,
                    'text-primary': !enabled,
                    [disabledStyles]: disabled,
                })}>{label}</Label>
        </Field >
    )
})

export default Checkbox