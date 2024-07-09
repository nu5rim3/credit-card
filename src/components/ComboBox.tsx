import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, ComboboxProps, Field, Label } from '@headlessui/react'
import clsx from 'clsx'
import { Check, ChevronDown } from 'lucide-react'
import { forwardRef, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface HUIComboBoxProps<T = any> extends ComboboxProps<T, false> {
    options: string[];
    disabled?: boolean;
    label: string;
    className?: string;
    required?: boolean;
    error?: string;
}

const ComboBox = forwardRef<HTMLInputElement, HUIComboBoxProps>(({ options, disabled, label, className, required, error, ...props }, ref) => {
    const [query, setQuery] = useState('')

    const filteredOptions =
        query === ''
            ? options
            : options && options.filter((option: string) => {
                return option.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Field>
            <Label className="block text-sm font-medium text-primary-950 text-left mb-1">{label}{required && <span className='ml-1 text-red-800'>*</span>}</Label>
            <Combobox
                onClose={() => setQuery('')}
                as={'div'}
                {...props}
            >
                <div className="relative">
                    <ComboboxInput
                        className={clsx(
                            'w-full rounded-lg border border-primary-400 py-2 px-3 bg-white text-primary-950 text-sm',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                            className
                        )}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        displayValue={(option: any) => option}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={`Select a ${label.toLowerCase()}`}
                        disabled={disabled}
                        ref={ref}
                    />
                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                        <ChevronDown className="size-4 fill-white/60 group-data-[hover]:fill-white" />
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    anchor="bottom"
                    className={clsx(
                        'w-[var(--input-width)] bg-primary-50 rounded-lg shadow-lg [--anchor-gap:var(--spacing-1)] empty:invisible',
                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                >
                    {filteredOptions && filteredOptions.map((option) => (
                        <ComboboxOption
                            key={option}
                            value={option}
                            className="group flex cursor-default items-center gap-2 py-1.5 select-none data-[focus]:bg-primary/10 px-2"
                        >
                            <Check className="invisible size-4 group-data-[selected]:visible" />
                            <div className="text-sm text-primary-900">{option}</div>
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </Combobox>
            <Label className="block text-xs font-medium text-red-800 text-left mt-1 italic normal-case">{error}</Label>
        </Field>
    )
});

export default ComboBox;
