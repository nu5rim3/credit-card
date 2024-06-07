import { forwardRef } from 'react';
import { Field, Label, Radio, RadioGroup as HUIRadioGroup, RadioGroupProps } from '@headlessui/react';
import classNames from 'classnames';

export interface RadioOption {
    value: string;
    label: string;
}

interface HUIRadioGroupProps extends RadioGroupProps {
    options: RadioOption[];
    selectedOption: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    label?: string;
    className?: string;
    required?: boolean;
}

const RadioGroup = forwardRef<HTMLDivElement, HUIRadioGroupProps>(({ options, selectedOption, onChange, disabled, label, className, required, ...props }, ref) => {
    const baseStyles = 'py-1 rounded-md';
    const disabledStyles = 'opacity-50 cursor-not-allowed';

    return (
        <Field>
            <Label className="block text-sm font-medium text-primary text-left">{label}{required && <span className='ml-1 text-red-800'>*</span>}</Label>
            <HUIRadioGroup value={selectedOption} onChange={onChange} disabled={disabled} ref={ref}>
                <div className='flex flex-row justify-center gap-4'>
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
                                            'text-primary-800': !checked,
                                            // 'ring-2 ring-primary-500': active && !checked,
                                            [disabledStyles]: disabled,
                                        },
                                        'flex items-start justify-between w-full cursor-pointer',
                                        className
                                    )
                                }
                                {...props}
                            >
                                {({ checked }) => (
                                    <>
                                        <span className="flex items-center">
                                            <span
                                                className={classNames(
                                                    'h-4 w-4 border border-gray-300 rounded-full',
                                                    {
                                                        'bg-primary-500': checked,
                                                        'bg-white': !checked,
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
        </Field>
    )
});

export default RadioGroup;
