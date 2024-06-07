import { Button as HUIButton, ButtonProps } from '@headlessui/react'
import { forwardRef } from 'react';
import classNames from 'classnames';

export interface HUIButtonProps extends ButtonProps {
    variant: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'link';
    className?: string;
    disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, HUIButtonProps>(({ variant, disabled, className, ...props }, ref) => {
    const baseStyles = 'px-4 py-2 transition-colors rounded-md text-base font-medium';

    const variantStyles = {
        primary: 'bg-primary text-white hover:bg-primary-800 focus:ring-primary-500 hover:shadow-lg',
        secondary: 'bg-green-500 text-white hover:bg-green-600 focus:ring-gray-500 hover:shadow-lg',
        danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 hover:shadow-lg',
        outline: 'border border-primary-500 text-primary hover:bg-gray-50 focus:ring-gray-500 hover:shadow-lg',
        ghost: 'bg-transparent text-primary-500 hover:bg-gray-50 focus:ring-gray-500',
        link: 'text-primary-500 hover:bg-gray-50 focus:ring-gray-500'
        // Add more types as needed
    };

    const disabledStyles = 'opacity-50 cursor-not-allowed';

    return (
        <HUIButton
            ref={ref}
            className={classNames(
                baseStyles,
                variantStyles[variant],
                { [disabledStyles]: disabled },
                className
            )}
            disabled={disabled}
            {...props}
        />
    );
});

export default Button;
