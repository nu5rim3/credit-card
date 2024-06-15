import { forwardRef } from 'react';
import { Field, Label, Radio, RadioGroup as HUIRadioGroup, RadioGroupProps } from '@headlessui/react';
import classNames from 'classnames';

export interface RadioOption {
    value: string;
    label: string;
}

interface HUIRadioGroupProps extends RadioGroupProps {
    options: RadioOption[];
    onChange: (value: string) => void;
    disabled?: boolean;
    label?: string;
    className?: string;
    required?: boolean;
    error?: string;
}

const RadioGroup = forwardRef<HTMLDivElement, HUIRadioGroupProps>(({ options, onChange, disabled, label, className, required, error, ...props }, ref) => {
    const baseStyles = 'py-1 rounded-md';
    const disabledStyles = 'opacity-50 cursor-not-allowed';

    return (
        <Field>
            <Label className="block text-sm font-medium text-primary-950 text-left">{label}{required && <span className='ml-1 text-red-800'>*</span>}</Label>
            <HUIRadioGroup disabled={disabled} onChange={onChange} ref={ref} {...props}>
                <div className='flex flex-row justify-start gap-3'>
                    {options.map((option, index) => (
                        <Field key={`id-${label}-${index}`} className="flex items-start">
                            <Radio
                                key={option.value}
                                value={option.value}
                                className={({ checked }) =>
                                    classNames(
                                        baseStyles,
                                        {
                                            'text-primary-900': checked,
                                            'text-primary-950': !checked,
                                            // 'ring-2 ring-primary-500': active && !checked,
                                            [disabledStyles]: disabled,
                                        },
                                        'flex items-start justify-between w-full cursor-pointer',
                                        className
                                    )
                                }

                            >
                                {({ checked }) => (
                                    <>
                                        <span className="flex items-center">
                                            <span
                                                className={classNames(
                                                    'h-4 w-4 border border-primary rounded-full',
                                                    {
                                                        'bg-primary-700': checked,
                                                        'bg-gray-100': !checked,
                                                    }
                                                )}
                                            />
                                            <span className="ml-3 text-sm">{option.label}</span>
                                        </span>
                                    </>
                                )}
                            </Radio>
                        </Field>
                    ))}
                </div>
            </HUIRadioGroup>
            <Label className="block text-xs font-medium text-red-800 text-left mt-1 italic">{error}</Label>
        </Field>
    )
});

export default RadioGroup;
