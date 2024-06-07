import { forwardRef } from 'react';
import { Listbox as HUIListbox, ListboxProps, ListboxButton, ListboxOption, ListboxOptions, Field, Label } from '@headlessui/react'
import classNames from 'classnames';

interface HUIListboxProps extends ListboxProps {
    options: { id: number; name: string }[];
    selectedOption: { id: number; name: string };
    onAction: (option: { id: number; name: string }) => void;
    disabled?: boolean;
    label: string;
    className?: string;
    required?: boolean;
}

const Listbox = forwardRef<HTMLDivElement, HUIListboxProps>(
    (
        { options, selectedOption, onAction, disabled, label, className, required, ...props },
        ref
    ) => {
        const baseStyles = 'w-full text-center text-sm flex justify-center items-center rounded-lg border border-primary-400 py-1 px-5 text-primary-900 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
        const disabledStyles = "opacity-50 cursor-not-allowed";

        return (
            <Field>
                <Label className="block text-sm font-medium text-primary text-left mb-1">{label}{required && <span className='ml-1 text-red-800'>*</span>}</Label>
                <HUIListbox
                    ref={ref}
                    value={selectedOption}
                    disabled={disabled}
                    onChange={onAction}
                    {...props}
                >
                    <ListboxButton
                        id={`id-${label.toLowerCase()}`}
                        className={classNames(baseStyles, { [disabledStyles]: disabled }, className
                        )}>
                        {selectedOption.name}
                    </ListboxButton>
                    <ListboxOptions anchor="bottom" className={'bg-primary-50 rounded-lg shadow-lg'}>
                        {options.map((option, index) => (
                            <ListboxOption
                                key={`id-${label}-${index}`}
                                value={option}
                                className="data-[focus]:bg-primary-300 px-5 py-1 text-sm"
                            >
                                {option.name}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </HUIListbox>
            </Field>
        );
    }
);

export default Listbox;
