import { forwardRef } from 'react';
import { Listbox as HUIListbox, ListboxProps, ListboxButton, ListboxOption, ListboxOptions, Field, Label } from '@headlessui/react'
import classNames from 'classnames';
import { ChevronDown } from 'lucide-react';

interface HUIListboxProps extends ListboxProps {
    options: string[];
    disabled?: boolean;
    label: string;
    className?: string;
    required?: boolean;
    error?: string;
}

const Listbox = forwardRef<HTMLDivElement, HUIListboxProps>(
    (
        { options, disabled, label, className, required, error, ...props },
        ref
    ) => {
        const baseStyles = 'w-full text-center text-sm flex justify-between items-center rounded-lg border border-primary-400 py-2 px-3 bg-white text-primary-950 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
        const disabledStyles = "opacity-50 cursor-not-allowed";

        return (
            <Field>
                <Label className="block text-sm font-medium text-primary-950 text-left mb-1">{label}{required && <span className='ml-1 text-red-800'>*</span>}</Label>
                <HUIListbox
                    as={'div'}
                    ref={ref}
                    disabled={disabled}
                    {...props}
                >
                    <ListboxButton
                        id={`id-${label.toLowerCase()}`}
                        className={classNames(baseStyles, { [disabledStyles]: disabled }, className
                        )}>
                        {props?.value}
                        <ChevronDown size={16} />
                    </ListboxButton>
                    <ListboxOptions anchor="bottom" className={'w-3/4 sm:w-1/6 bg-primary-50 rounded-lg shadow-lg'}>
                        {options.map((option, index) => (
                            <ListboxOption
                                key={`id-${label}-${index}`}
                                value={option}
                                className="data-[focus]:bg-primary-300 px-5 py-1 text-sm"
                            >
                                {option}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </HUIListbox>
                <Label className="block text-xs font-medium text-red-800 text-left mt-1 italic normal-case">{error}</Label>
            </Field>
        );
    }
);

export default Listbox;
