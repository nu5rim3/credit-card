import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Input, Listbox, RadioGroup, TermsDialog } from '../components';
import logo from '../assets/images/lolcf_logo.svg'
import { RadioOption } from '../components/RadioGroup';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import { userDetailPost } from '../store/actions/userDetailPostActions';
import { parseNIC } from '../utils/textConvertor';
import { LoaderCircle } from 'lucide-react';

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

const schema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    nationality: z.string().min(1, 'Nationality is required'),
    preferredLanguage: z.string().min(1, 'Preferred Language is required'),
    dob: z.string().refine(
        (val) => {
            const date = new Date(val);
            const eighteenYearsAgoTime = eighteenYearsAgo.getTime();
            return !isNaN(date.getTime()) && date.getTime() <= eighteenYearsAgoTime;
        },
        { message: "You must be at least 18 years old" }
    ),
    mothersMaidenName: z.string().min(1, 'Mother`s Maiden Name is required'),
    residencePhone: z.string().optional().refine((val) => !val || /^\d{10}$|^\+\d{1,3}\d{10}$/.test(val), {
        message: 'Invalid phone number (e.g. +94712345678)',
    }),
    permAddressLine1: z.string().min(1, 'Permanent Address is required'),
    permAddressLine2: z.string().optional(),
    permAddressLine3: z.string().optional(),
    permAddressLine4: z.string().optional(),
    mailAddressLine1: z.string().min(1, 'Mailling Address is required'),
    mailAddressLine2: z.string().optional(),
    mailAddressLine3: z.string().optional(),
    mailAddressLine4: z.string().optional(),
    whatsappNo: z.string().min(1, 'WhatsApp Number is requied').regex(/^(?:\+\d{1,3}\d{10}|[0-9]{10})$/, 'Invalid phone number (e.g. +94712345678)'),
    additionalContactNo: z.string().optional().refine((val) => !val || /^\d{10}$|^\+\d{1,3}\d{10}$/.test(val), {
        message: 'Invalid phone number (e.g. +94712345678)',
    }),
    residenceType: z.string().min(1, 'Residence Type is required'),
    province: z.string().min(1, 'Province is required'),
    politicallyExposed: z.string().min(1, 'Politically exposed is required'),
    employmentCategory: z.string().min(1, 'Employment Category is required'),
    governmentSectorType: z.string().min(1, 'Government Sector Type is required').optional(),
    pvtSectorType: z.string().min(1, 'Private Sector Type is required').optional(),
    selfEmpType: z.string().min(1, 'Self Employed Types is required').optional(),
    expInPresentEmployment: z.string().min(1, 'Experience in Present Employment is required'),
    experienceInPreviousEmployment: z.string().min(1, 'Experience In Previous Employment is required'),
    nameOfThePreviousEmployer: z.string().min(1, 'Name Of The Previous Employer is required'),
    occupationType: z.string().min(1, 'Occupation Type is required'),
    nameOfTheEmployer: z.string().min(1, 'Name Of The Employer/Business is required'),
    designation: z.string().min(1, 'Designation is required'),
    monthlyNetIncome: z.string().min(1, 'Monthly Net Income is required'),
    officeContactNo: z.string().min(1, 'Office Contact Number is required').regex(/^(?:\+\d{1,3}\d{10}|[0-9]{10})$/, 'Invalid phone number (e.g. +94712345678)'),
    officeAddressLine1: z.string().min(1, 'Office Address is required'),
    officeAddressLine2: z.string().optional(),
    officeAddressLine3: z.string().optional(),
    officeAddressLine4: z.string().optional(),
    guarantorName: z.string().min(1, 'Guarantor Name is required'),
    relationShipToApplication: z.string().min(1, 'RelationShip To Application is required'),
    guarantorNic: z.string().min(1, 'Guarantor NIC Number is required').regex(/^(?:\d{9}[VX]|\d{12})$/, 'Invalid NIC number (e.g. 123456789V)'),
    guarantorMobileNo: z.string().min(1, 'Guarantor Mobile Number is required').regex(/^(?:\+\d{1,3}\d{10}|[0-9]{10})$/, 'Invalid phone number (e.g. +94712345678)'),
    guarantorAddressLine1: z.string().min(1, 'Office Address is required'),
    guarantorAddressLine2: z.string().optional(),
    guarantorAddressLine3: z.string().optional(),
    guarantorAddressLine4: z.string().optional(),
    cardCollectBranch: z.string().min(1, 'Card Collect Branch is required'),
    nameOnCard: z.string().min(1, 'Name On Card is required'),
    termsAndCondition: z.boolean().refine((val) => val === true, "You must accept the Terms and Conditions."),
})

const nationalities: RadioOption[] = [{ label: 'Sri Lankan', value: 'SriLankan' }, { label: 'Other', value: 'Other' }]
const residenceTypes: RadioOption[] = [{ label: 'Resident', value: 'Resident' }, { label: 'Nonresident', value: 'NonResident' }]
const politicallyExposedType: RadioOption[] = [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]
const preferredLanguages = ["English", "Sinhala", "Tamil"]
const provinces = ["Central", "Eastern", "North Central", "North Western", "Northern", "Sabaragamuwa", "Southern", "Western", "Uva"]
const employmentCategories = ["Government Sector", "Private Sector", "Self Employed"]
const governmentSectorTypes = ["Government Healthcare Professionals", "Government Bankers", "Others"]
const privateSectorTypes = ["Private Healthcare Professionals", "Private Bankers", "Others"]
const selfEmployedTypes = ["Entrepreneurs/Small Business Owners", "Freelancers"]
const occupationTypes = ["Full Time", "Part Time", "Contract"]
const branches = ["AKKARAIPATTU IBU",
    "AKURANA IBU",
    "AKURESSA I",
    "AKURESSA II",
    "ALUTHGAMA",
    "AMBALANGODA I",
    "AMBALANGODA II",
    "AMBALANTHOTA",
    "AMPARA I",
    "AMPARA II",
    "ANAMADUWA",
    "ANURADHAPURA I",
    "ANURADHAPURA II",
    "ARALAGANWILA",
    "AVISSAWELLA I",
    "AVISSAWELLA II",
    "BADDEGAMA",
    "BADULLA I",
    "BADULLA II",
    "BADURALIYA",
    "BAKAMUNA",
    "BALANGODA",
    "BAMBALAPITIYA",
    "BANDARAWELA",
    "BATTARAMULLA",
    "BATTICALOA",
    "BELIATTA",
    "BIBILA",
    "BORELLA",
    "BULATHSINHALA",
    "CARD CENTRE - HAVELOCK",
    "CHAVAKACHCHERI",
    "CHENKALADI",
    "CHILAW I",
    "CHILAW II",
    "CHUNNAKAM I",
    "CHUNNAKAM II",
    "CITY OFFICE",
    "DAMBULLA I",
    "DAMBULLA II",
    "DEHIATTAKANDIYA",
    "DEHIWALA I",
    "DEHIWALA II",
    "DELGODA",
    "DIGANA",
    "DIKWELLA",
    "DIVULAPITIYA",
    "EHELIYAGODA",
    "ELPITIYA",
    "EMBILIPITIYA I",
    "EMBILIPITIYA II",
    "GALENBINDUNUWEWA",
    "GALEWELA",
    "GALGAMUWA",
    "GALLE I",
    "GALNEWA",
    "GAMPAHA I",
    "GAMPAHA II",
    "GAMPOLA I",
    "GAMPOLA II",
    "GANEMULLA",
    "GIRIULLA",
    "GODAKAWELA",
    "GRANDPASS I",
    "GRANDPASS II",
    "HABARADUWA",
    "HAKMANA",
    "HANWELLA",
    "HATTON",
    "HEAD OFFICE - BRANCH",
    "HIKKADUWA",
    "HINGURAKGODA",
    "HOMAGAMA",
    "HORANA I",
    "HORANA II",
    "HOROWPATHANA",
    "INGIRIYA",
    "JA-ELA I",
    "JA-ELA II",
    "JAFFNA I",
    "JAFFNA II",
    "KADUWELA I",
    "KADUWELA II",
    "KAHATAGASDIGILIYA",
    "KALAWANA",
    "KALAWANCHIKUDI",
    "KALMUNAI",
    "KALUTARA I",
    "KALUTARA II",
    "KAMBURUPITIYA",
    "KANDY I",
    "KANDY II",
    "KANDY III",
    "KANTALE",
    "KARAPITIYA",
    "KATTANKUDY IBU",
    "KATUGASTOTA",
    "KEGALLE I",
    "KEGALLE II",
    "KEKIRAWA",
    "KESELWATTA",
    "KILINOCHCHI I",
    "KILINOCHCHI II",
    "KINNIYA",
    "KIRIBATHGODA I",
    "KIRIBATHGODA II",
    "KIRINDIWELA",
    "KOCHCHIKADE I",
    "KOCHCHIKADE II",
    "KOHUWALA",
    "KOLLUPITIYA",
    "KOTAHENA",
    "KULIYAPITIYA I",
    "KULIYAPITIYA II",
    "KURUNEGALA I",
    "KURUNEGALA II",
    "MAHARAGAMA I",
    "MAHARAGAMA II",
    "MAHIYANGANAYA",
    "MALABE",
    "MANMUNAIPATTU",
    "MANNAR I",
    "MANNAR II",
    "MARADANA",
    "MATALE I",
    "MATALE II",
    "MATARA I",
    "MATARA II",
    "MATHUGAMA",
    "MAWANELLA",
    "MEDAWACHCHIYA I",
    "MEDAWACHCHIYA II",
    "MEDIRIGIRIYA",
    "MELSIRIPURA",
    "MINUWANGODA",
    "MONARAGALA I",
    "MONARAGALA II",
    "MORATUWA",
    "MORAWAKA",
    "MT. LAVINIA",
    "MULLAITVU",
    "MUTHTHUR",
    "NANATTAN",
    "NAWALAPITIYA",
    "NEGOMBO I",
    "NEGOMBO II",
    "NELLIADY I",
    "NELLIADY II",
    "NELUWA",
    "NIKAWERATIYA",
    "NITTAMBUWA I",
    "NITTAMBUWA II",
    "NOCHCHIYAGAMA",
    "NUGEGODA",
    "NUWARAELIYA I",
    "NUWARAELIYA II",
    "ODDAMAWADI IBU",
    "PADIYATHALAWA",
    "PALAVIYA",
    "PANADURA",
    "PARAKRAMAPURA",
    "PELMADULLA",
    "PETTAH I",
    "PETTAH II",
    "PILIMATHALAWA",
    "PILIYANDALA I",
    "PILIYANDALA II",
    "PITIGALA",
    "POLONNARUWA I",
    "POLONNARUWA II",
    "POTHUVIL",
    "PUDUKUDYIRUPPU",
    "PUTTALAM",
    "RAJAGIRIYA",
    "RATHNAPURA I",
    "RATHNAPURA II",
    "RATTOTA",
    "RIKILLAGASKADA",
    "RUWANWELLA",
    "SERUNUWARA",
    "SURIYAWEWA",
    "TANGALLE I",
    "TANGALLE II",
    "THALAWAKELE",
    "THAMBUTTEGAMA I",
    "THAMBUTTEGAMA II",
    "THIRUKKOVIL",
    "TISSAMAHARAMA",
    "TRINCOMALEE I",
    "TRINCOMALEE II",
    "UDAPPUWA",
    "UDUGAMA",
    "VALACHCHENAI",
    "VAVUNIYA I",
    "VAVUNIYA II",
    "WALASMULLA",
    "WARAKAPOLA",
    "WATTALA I",
    "WATTALA II",
    "WELIGAMA",
    "WELIKANDA",
    "WELIMADA",
    "WELIWERIYA",
    "WELLAWATTA",
    "WELLAWAYA",
    "WENNAPPUWA I",
    "WENNAPPUWA II",
    "WILGAMUWA",]

type FormData = z.infer<typeof schema>;


const DetailForm = () => {
    const { data: userData } = useSelector((state: RootState) => state.userLogin);
    const { loading } = useSelector((state: RootState) => state.userDetailPost);
    const userdob = parseNIC(userData?.nic ?? '')
    const { control, register, unregister, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        shouldUnregister: true,
        defaultValues: {
            nationality: "",
            fullName: "",
            preferredLanguage: preferredLanguages[0],
            dob: userdob?.Birthday ?? "",
            mothersMaidenName: "",
            residencePhone: "",
            whatsappNo: "",
            additionalContactNo: "",
            residenceType: "",
            permAddressLine1: "",
            permAddressLine2: "",
            permAddressLine3: "",
            permAddressLine4: "",
            province: provinces[0],
            mailAddressLine1: "",
            mailAddressLine2: "",
            mailAddressLine3: "",
            mailAddressLine4: "",
            politicallyExposed: "",
            employmentCategory: employmentCategories[0],
            expInPresentEmployment: "",
            occupationType: occupationTypes[0],
            nameOfTheEmployer: "",
            designation: "",
            monthlyNetIncome: "",
            officeContactNo: "",
            officeAddressLine1: "",
            officeAddressLine2: "",
            officeAddressLine3: "",
            officeAddressLine4: "",
            experienceInPreviousEmployment: "",
            nameOfThePreviousEmployer: "",
            guarantorName: "",
            relationShipToApplication: "",
            guarantorNic: "",
            guarantorMobileNo: "",
            guarantorAddressLine1: "",
            guarantorAddressLine2: "",
            guarantorAddressLine3: "",
            guarantorAddressLine4: "",
            cardCollectBranch: branches[0],
            nameOnCard: "",
            termsAndCondition: false,
            governmentSectorType: governmentSectorTypes[0],
            pvtSectorType: privateSectorTypes[0],
            selfEmpType: selfEmployedTypes[0]
        }
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const empCategory = watch("employmentCategory");
    const [sameMobile, setSameMobile] = useState<boolean>(false)
    const [sameAddress, setSameAddress] = useState<boolean>(false)
    const [sameFullName, setSameFullName] = useState<boolean>(false)
    const [openTermsDialog, setOpenTermsDialog] = useState<boolean>(false);

    /**
     * on Submit - main api call to  save the personal details
     * @param data 
     */
    const onSubmit = (data: FormData) => {
        dispatch(userDetailPost(navigate, { ...data, referenceNo: userData?.referenceNo ?? "" }))
    };

    /**
     * handleNationalityChange
     * @param value 
     */
    const handleNationalityChange = (value: string) => {
        setValue("nationality", value);
    };

    /**
     * handleResidenceTypeChange
     * @param value 
     */
    const handleResidenceTypeChange = (value: string) => {
        setValue("residenceType", value);
    };

    /**
     * handlePoliticallyExposedTypeChange
     * @param value 
     */
    const handlePoliticallyExposedTypeChange = (value: string) => {
        setValue("politicallyExposed", value);
    };

    useEffect(() => {
        if (sameMobile) {
            setValue("whatsappNo", userData?.mobileNumber ?? '');
        } else {
            setValue("whatsappNo", '');
        }
        if (sameAddress) {
            const { permAddressLine1, permAddressLine2, permAddressLine3, permAddressLine4 } = getValues();
            setValue('mailAddressLine1', permAddressLine1)
            setValue('mailAddressLine2', permAddressLine2)
            setValue('mailAddressLine3', permAddressLine3)
            setValue('mailAddressLine4', permAddressLine4)
        } else {
            setValue('mailAddressLine1', "")
            setValue('mailAddressLine2', "")
            setValue('mailAddressLine3', "")
            setValue('mailAddressLine4', "")
        }
        if (sameFullName) {
            const { fullName } = getValues();
            setValue("nameOnCard", fullName)
        } else {
            setValue("nameOnCard", "")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sameMobile, sameAddress, sameFullName])

    useEffect(() => {
        const { employmentCategory } = getValues()
        if (employmentCategory === 'Government') {
            unregister("employmentCategory")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch])

    return (
        <div className="bg-card-pattern flex justify-center py-5 px-2 sm:px-0 sm:h-screen">
            <div className='container flex flex-col justify-center items-center'>
                <img className="w-32 mb-3 animate-fade-up animate-duration-[1200ms] animate-once" src={logo} />
                <form onSubmit={handleSubmit(onSubmit)} className="w-full grid grid-cols-1 sm:grid-cols-4 gap-4">

                    <div className='bg-primary-50 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[3000ms] animate-once hover:shadow-xl flex flex-col gap-2 sm:h-[80vh] sm:overflow-scroll'>
                        <p className='font-semibold text-primary-950'>Customer Personal Details</p>
                        <Input
                            type={'text'}
                            label={'Full Name'}
                            required
                            error={errors?.fullName?.message}
                            {...register('fullName')}
                        />
                        <Input
                            type={'date'}
                            label={'Date of Birth'}
                            required
                            error={errors?.dob?.message}
                            {...register('dob')}
                        />
                        <Input
                            type={'text'}
                            label={'Mother`s Maiden Name'}
                            required
                            error={errors?.mothersMaidenName?.message}
                            {...register('mothersMaidenName')}
                        />
                        <Input
                            type={'tel'}
                            label={'WhatsApp Number'}
                            error={errors?.whatsappNo?.message}
                            {...register('whatsappNo')}
                            check
                            checkLabel={'Same as the mobile number'}
                            checkStatus={sameMobile}
                            setCheackStatus={setSameMobile}
                            required
                        />
                        <>
                            <Input
                                type={'text'}
                                label={'Permanent Address'}
                                {...register('permAddressLine1')}
                                placeholder='Line 1'
                                required
                            />
                            <Input
                                type={'text'}
                                {...register('permAddressLine2')}
                                placeholder='Line 2'
                            />
                            <Input
                                type={'text'}
                                {...register('permAddressLine3')}
                                placeholder='Line 3'
                            />
                            <Input
                                type={'text'}
                                error={errors?.permAddressLine1?.message}
                                {...register('permAddressLine4')}
                                placeholder='Line 4'
                            />
                        </>
                        <>
                            <Input
                                type={'text'}
                                label={'Mailling Address'}
                                {...register('mailAddressLine1')}
                                placeholder='Line 1'
                                check
                                checkLabel={'Same as the permanent address'}
                                checkStatus={sameAddress}
                                setCheackStatus={setSameAddress}
                                required
                            />
                            <Input
                                type={'text'}
                                {...register('mailAddressLine2')}
                                disabled={sameAddress}
                                placeholder='Line 2'
                            />
                            <Input
                                type={'text'}
                                {...register('mailAddressLine3')}
                                disabled={sameAddress}
                                placeholder='Line 3'
                            />
                            <Input
                                type={'text'}
                                error={errors?.mailAddressLine1?.message}
                                {...register('mailAddressLine4')}
                                disabled={sameAddress}
                                placeholder='Line 4'
                            />
                        </>
                        <Controller
                            control={control}
                            name={'province'}
                            render={({ field }) =>
                                <Listbox
                                    options={provinces}
                                    label={'Province'}
                                    error={errors?.province?.message}
                                    {...field}
                                    required
                                />
                            }
                        />
                        <Controller
                            control={control}
                            name={'preferredLanguage'}
                            render={({ field }) =>
                                <Listbox
                                    options={preferredLanguages}
                                    label={'Preferred Language'}
                                    error={errors?.preferredLanguage?.message}
                                    {...field}
                                    required
                                />
                            }
                        />
                        <Controller
                            control={control}
                            name={'nationality'}
                            render={({ field }) =>
                                <RadioGroup
                                    options={nationalities}
                                    label={'Nationality'}
                                    error={errors?.nationality?.message}
                                    {...field}
                                    onChange={handleNationalityChange}
                                    required
                                />
                            }
                        />
                        <Controller
                            control={control}
                            name={'residenceType'}
                            render={({ field }) =>
                                <RadioGroup
                                    options={residenceTypes}
                                    label={'Resident Type'}
                                    error={errors?.residenceType?.message}
                                    {...field}
                                    onChange={handleResidenceTypeChange}
                                    required
                                />
                            }
                        />
                        <Controller
                            control={control}
                            name={'politicallyExposed'}
                            render={({ field }) =>
                                <RadioGroup
                                    options={politicallyExposedType}
                                    label={'Politically Exposed'}
                                    error={errors?.politicallyExposed?.message}
                                    {...field}
                                    onChange={handlePoliticallyExposedTypeChange}
                                    required
                                />
                            }
                        />
                        <Input
                            type={'tel'}
                            label={'Residence Phone Number'}
                            error={errors?.residencePhone?.message}
                            {...register('residencePhone')}
                        />
                        <Input
                            type={'tel'}
                            label={'Additional Contact Number'}
                            error={errors?.additionalContactNo?.message}
                            {...register('additionalContactNo')}
                        />
                    </div>

                    <div className='bg-primary-50 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[4000ms] animate-once hover:shadow-xl flex flex-col gap-2 sm:h-[80vh] sm:overflow-scroll'>
                        <p className='font-semibold text-primary-950'>Customer Employment Details</p>
                        <Controller
                            control={control}
                            name={'employmentCategory'}
                            render={({ field }) =>
                                <Listbox
                                    options={employmentCategories}
                                    label={'Employment Category'}
                                    error={errors?.employmentCategory?.message}
                                    {...field}
                                    required
                                />
                            }
                        />
                        {empCategory === 'Government Sector' &&
                            <Controller
                                control={control}
                                name={'governmentSectorType'}
                                render={({ field }) =>
                                    <Listbox
                                        options={governmentSectorTypes}
                                        label={'Government Sector Type'}
                                        error={errors?.governmentSectorType?.message}
                                        {...field}
                                        required
                                    />
                                }
                            />
                        }
                        {empCategory === 'Private Sector' &&
                            <Controller
                                control={control}
                                name={'pvtSectorType'}
                                render={({ field }) =>
                                    <Listbox
                                        options={privateSectorTypes}
                                        label={'Private Sector Type'}
                                        error={errors?.pvtSectorType?.message}
                                        {...field}
                                        required
                                    />
                                }
                            />
                        }
                        {empCategory === 'Self Employed' &&
                            <Controller
                                control={control}
                                name={'selfEmpType'}
                                render={({ field }) =>
                                    <Listbox
                                        options={selfEmployedTypes}
                                        label={'Self Employed Type'}
                                        error={errors?.selfEmpType?.message}
                                        {...field}
                                        required
                                    />
                                }
                            />
                        }
                        <Input
                            type={'text'}
                            label={'Name of the Employer / Business'}
                            required
                            error={errors?.nameOfTheEmployer?.message}
                            {...register('nameOfTheEmployer')}
                        />
                        <Input
                            type={'text'}
                            label={'Designation'}
                            required
                            error={errors?.designation?.message}
                            {...register('designation')}
                        />
                        <Controller
                            control={control}
                            name={'occupationType'}
                            render={({ field }) =>
                                <Listbox
                                    options={occupationTypes}
                                    label={'Nature of Work'}
                                    error={errors?.occupationType?.message}
                                    {...field}
                                    required
                                />
                            }
                        />
                        <Input
                            type={'text'}
                            label={'Experience in Employment'}
                            required
                            error={errors?.expInPresentEmployment?.message}
                            {...register('expInPresentEmployment')}
                        />
                        <Input
                            type={'number'}
                            label={'Monthly Net Income'}
                            required
                            error={errors?.monthlyNetIncome?.message}
                            {...register('monthlyNetIncome')}
                        />
                        <Input
                            type={'tel'}
                            label={'Office Contact Number'}
                            required
                            error={errors?.officeContactNo?.message}
                            {...register('officeContactNo')}
                        />
                        <>
                            <Input
                                type={'text'}
                                label={'Office Address'}
                                required
                                {...register('officeAddressLine1')}
                                placeholder='Line 1'
                            />
                            <Input
                                type={'text'}
                                {...register('officeAddressLine2')}
                                placeholder='Line 2'
                            />
                            <Input
                                type={'text'}
                                {...register('officeAddressLine3')}
                                placeholder='Line 3'
                            />
                            <Input
                                type={'text'}
                                error={errors?.officeAddressLine1?.message}
                                {...register('officeAddressLine4')}
                                placeholder='Line 4'
                            />
                        </>
                        <Input
                            type={'text'}
                            label={'Experience In Previous Employment'}
                            required
                            error={errors?.experienceInPreviousEmployment?.message}
                            {...register('experienceInPreviousEmployment')}
                        />
                        <Input
                            type={'text'}
                            label={'Name of the Previous Employer'}
                            required
                            error={errors?.nameOfThePreviousEmployer?.message}
                            {...register('nameOfThePreviousEmployer')}
                        />

                    </div>

                    <div className='bg-primary-50 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[4000ms] animate-once hover:shadow-xl flex flex-col gap-2 sm:h-[80vh] sm:overflow-scroll'>
                        <p className='font-semibold text-primary-950'>Guarantor Details</p>
                        <Input
                            type={'text'}
                            label={'Guarantor Name'}
                            required
                            error={errors?.guarantorName?.message}
                            {...register('guarantorName')}
                        />
                        <Input
                            type={'text'}
                            label={'Guarantor NIC'}
                            required
                            error={errors?.guarantorNic?.message}
                            {...register('guarantorNic')}
                        />
                        <Input
                            type={"tel"}
                            label={'Guarantor Mobile Number'}
                            required
                            error={errors?.guarantorMobileNo?.message}
                            {...register('guarantorMobileNo')}
                        />
                        <Input
                            type={'text'}
                            label={'Relationship to Application'}
                            required
                            error={errors?.relationShipToApplication?.message}
                            {...register('relationShipToApplication')}
                        />
                        <>
                            <Input
                                type={'text'}
                                label={'Guarantor Residential Address'}
                                required
                                {...register('guarantorAddressLine1')}
                                placeholder='Line 1'
                            />
                            <Input
                                type={'text'}
                                {...register('guarantorAddressLine2')}
                                placeholder='Line 2'
                            />
                            <Input
                                type={'text'}
                                {...register('guarantorAddressLine3')}
                                placeholder='Line 3'
                            />
                            <Input
                                type={'text'}
                                error={errors?.guarantorAddressLine1?.message}
                                {...register('guarantorAddressLine4')}
                                placeholder='Line 4'
                            />
                        </>
                    </div>

                    <div className='bg-primary-50 rounded-lg shadow-lg p-4 animate-fade-up animate-duration-[5000ms] animate-once hover:shadow-xl mb-20 sm:mb-0 flex flex-col gap-2  sm:h-[80vh] sm:overflow-scroll'>
                        <p className='font-semibold text-primary-950'>Credit Card Details</p>
                        <Input
                            type={'text'}
                            label={'Name on Card'}
                            required
                            error={errors?.nameOnCard?.message}
                            {...register('nameOnCard')}
                            check
                            checkLabel={'Same as the full name'}
                            checkStatus={sameFullName}
                            setCheackStatus={setSameFullName}
                        />
                        <Controller
                            control={control}
                            name={'cardCollectBranch'}
                            render={({ field }) =>
                                <Listbox
                                    options={branches}
                                    label={'Card Collecting Branch'}
                                    error={errors?.cardCollectBranch?.message}
                                    {...field}
                                    required
                                />
                            }
                        />

                        <div className="bg-primary-200 rounded-lg p-3 text-primary animate-fade-up animate-duration-[1500ms] animate-once">
                            <Controller
                                control={control}
                                name={'termsAndCondition'}
                                render={({ field }) =>
                                    <Checkbox
                                        type={"terms"}
                                        {...field}
                                        value={field.value ? "true" : "false"}
                                        setOpen={setOpenTermsDialog}
                                        error={errors?.termsAndCondition?.message}
                                    />
                                }
                            />

                        </div>
                    </div>
                    <div className="md:col-span-4 justify-end h-10 animate-fade-up animate-duration-[6000ms] animate-once hidden sm:flex">
                        <Button variant='primary' type="submit" className={''} >
                            {loading ? <LoaderCircle className="animate-spin animate-infinite" /> : 'Save Personal Details'}
                        </Button>
                    </div>
                    <div className="fixed sm:hidden bottom-3 bg-primary-50 h-auto animate-fade-up animate-duration-[6000ms] animate-once w-full rounded-lg pr-4">
                        <Button variant='primary' type="submit" className={'w-full'} >
                            {loading ? <LoaderCircle className="animate-spin animate-infinite" /> : 'Save Personal Details'}
                        </Button>
                    </div>
                </form>
            </div>
            <TermsDialog setIsOpen={setOpenTermsDialog} isOpen={openTermsDialog} />
        </div>
    )
}

export default DetailForm;