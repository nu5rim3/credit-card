import { forwardRef } from 'react'
import { Field, Input as HUIInput, InputProps, Label, Checkbox } from '@headlessui/react'
import classNames from 'classnames';

interface HUIInputProps extends InputProps {
    type: 'text' | 'password' | 'email' | 'tel' | 'url' | 'number' | 'date' | 'datetime-local' | 'month' | 'week' | 'time' | 'range' | 'search';
    label?: string;
    value?: string;
    disabled?: boolean;
    className?: string;
    required?: boolean;
    error?: string;
    check?: boolean;
    checkLabel?: string;
    checkStatus?: boolean;
    setCheackStatus?: (check: boolean) => void;
}

const Input = forwardRef<HTMLInputElement, HUIInputProps>(
    (
        {
            type,
            label,
            value,
            disabled,
            className,
            required,
            error,
            check,
            checkLabel,
            checkStatus,
            setCheackStatus,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            "block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-sm bg-white0";
        const baseCheckboxStyles =
            "group block w-4 h-4 rounded border border-blue-500 bg-white data-[checked]:bg-primary-500 data-[checked]:data-[disabled]:bg-gray-500 cursor-pointer";
        const disabledStyles = "opacity-50 cursor-not-allowed";
        return (
            <Field>
                <Label className="block text-sm font-medium text-primary-950 text-left mb-1">
                    {label}
                    {required && <span className="ml-1 text-red-800">*</span>}
                </Label>
                {check && (
                    <div className="flex flex-row justify-between items-center mb-1">
                        <p className="text-xs text-gray-500">{checkLabel}</p>
                        <Checkbox
                            checked={checkStatus}
                            disabled={disabled}
                            onChange={setCheackStatus}
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
                        </Checkbox>
                    </div>
                )}
                <HUIInput
                    ref={ref}
                    id={`id-${label?.toLowerCase()}`}
                    name={label}
                    type={type}
                    value={value}
                    disabled={disabled || checkStatus}
                    {...props}
                    className={classNames(
                        baseStyles,
                        { [disabledStyles]: disabled || checkStatus },
                        className
                    )}
                />
                <Label className="block text-xs font-medium text-red-800 text-left mt-1 italic">
                    {error}
                </Label>
            </Field>
        );
    }
)


export default Input