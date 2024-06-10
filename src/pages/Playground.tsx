import { useState } from 'react';
import RadioGroup, { RadioOption } from '../components/RadioGroup';
import { ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { Checkbox, Listbox, Input, Button, Loader, Uploader } from '../components';

const people = [
    { id: 1, name: 'Tom Cook' },
    { id: 2, name: 'Wade Cooper' },
    { id: 3, name: 'Tanya Fox' },
    { id: 4, name: 'Arlene Mccoy' },
    { id: 5, name: 'Devon Webb' },
]

const Playground = () => {
    const [selectedOption, setSelectedOption] = useState("option1");
    const [selected, setSelected] = useState(people[1])
    const [enabled, setEnabled] = useState<boolean>(false);
    const [textValue, setTextValue] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const options: RadioOption[] = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];



    const onButtonClick = () => {
        toast.success("hello dear!");
    };

    setTimeout(() => {
        setLoading(false)
    }, 5000);

    console.log('[files] - ', files)

    return (
        <>
            {
                loading ? <Loader />
                    :
                    <div className="flex flex-col items-center py-5 gap-5">
                        <div className="sm:w-1/4 border border-gray-300 shadow-lg rounded-lg text-center p-4">
                            <p className="font-semibold">Buttons</p>
                            <div className="flex flex-col sm:flex-row sm:justify-center gap-4 my-5">
                                <Button
                                    variant={"primary"}
                                    className="flex flex-row items-center justify-between gap-2"
                                    onClick={onButtonClick}
                                >
                                    Get Start <ArrowRight />
                                </Button>
                                <Button variant={"outline"}>What's Required?</Button>
                            </div>
                        </div>
                        <div className="border border-gray-300 shadow-lg rounded-lg text-center p-4">
                            <p className="font-semibold">Radio Button</p>
                            <div className="w-90">
                                <RadioGroup
                                    options={options}
                                    selectedOption={selectedOption}
                                    onChange={setSelectedOption}
                                    className="mb-4"
                                    disabled={false}
                                    label={"Select an option"}
                                />
                            </div>
                        </div>
                        <div className="border border-gray-300 shadow-lg rounded-lg text-center p-4">
                            <p className="font-semibold">Check Box</p>
                            <Checkbox
                                enabled={enabled}
                                onChange={setEnabled}
                                label={"Sample Label"}
                                disabled={false}
                            />
                        </div>
                        <div className="border border-gray-300 shadow-lg rounded-lg text-center p-4">
                            <p className="font-semibold">List Box</p>
                            <Listbox
                                label={'Select Person'}
                                options={people}
                                selectedOption={selected}
                                onAction={setSelected}
                                disabled={false}
                            />
                        </div>
                        <div className="border border-gray-300 shadow-lg rounded-lg text-center p-4">
                            <p className="font-semibold">Input</p>
                            <Input
                                type={'text'}
                                label={'Name'}
                                value={textValue}
                                onChange={(e) => setTextValue(e.target.value)}
                                required={true}
                                disabled={false}
                                placeholder='hello'
                            />
                        </div>
                        <div className="border border-gray-300 shadow-lg rounded-lg text-center p-4">
                            <p className="font-semibold">Input</p>
                            <Uploader
                                type={'text'}
                                label={'NIC (Both side)'}
                                required={true}
                                disabled={false}
                                placeholder='hello'
                                onFileSelected={setFiles}
                                multiple={true} />
                        </div>
                    </div>
            }
        </>
    );
};

export default Playground