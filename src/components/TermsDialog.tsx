import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import Button from './Button';
import { useState } from 'react';


interface TermsDialogProps {
    isOpen: boolean | undefined;
    setIsOpen: (value: boolean) => void;
}

const TermsDialog: React.FC<TermsDialogProps> = ({ isOpen, setIsOpen }) => {

    const [language, setLanguage] = useState<'ENG' | 'TAMIL' | 'SINHALA'>('ENG');

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
        >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-primary/50 backdrop-blur-lg">
                <DialogPanel className="container space-y-4 border bg-primary-50 p-5 rounded-lg shadow-lg text-center text-primary">
                    <DialogTitle className="font-semibold text-xl">
                        Terms and Conditions
                    </DialogTitle>
                    <Description className="text-gray-500 px-5 bg-white border p-4 rounded-lg h-[50vh] sm:h-[60vh]  overflow-x-scroll">
                        <div>
                            <Button variant={'link'} onClick={() => setLanguage('ENG')}>ENG</Button>
                            <Button variant={'link'} onClick={() => setLanguage('SINHALA')}>සිංහල</Button>
                            <Button variant={'link'} onClick={() => setLanguage('TAMIL')}>தமிழ்</Button>
                        </div>
                        {
                            language === 'ENG' && (
                                <div>
                                    <p className='mb-5 text-base'>CENTRAL BANK OF SRI LANKA</p>

                                    <p className='mb-5'>
                                        I CASCC (Primary Cardholder), declare that all details given above by me on this form are true and correct.
                                    </p>
                                    <p className='mb-5'>
                                        I hereby confirm that I am aware of the conditions imposed under the provision of the Foreign Exchange Act, No 12 of 2017 (the Act) on Electronic Fund Transfer Cards (EFTCs) subject to which the card may be used for transactions in foreign exchange and I hereby undertake to abide by the said conditions.
                                    </p>
                                    <p className='mb-5'>
                                        I further agree to provide any information on transactions carried out by me in foreign exchange on the card issued to me as LOLC Finance PLC may require for the purpose of Act.
                                    </p>
                                    <p className='mb-5'>
                                        I am aware that the restricted financial institution is required to suspend availability of foreign exchange on ETFC if reasonable grounds exist to suspect that unauthorized foreign exchange transactions are being carried out on the EFTC issued to me and to report the matter to the Director-Department of Foreign Exchange. I also affirm that I undertake to surrender the Credit Card to LOLC Finance PLC, if I migrate or leave Sri Lanka for employment abroad.
                                    </p>
                                    <p className='mb-5 text-red-500'>
                                        Terms & Condition | Tariff
                                    </p>
                                    <p className='mb-5'>
                                        I confirm that I accept clauses herein and shall be taken as my acceptance of the accuracy of the information supplied by me for the purpose of the entirety of this digital/online application.
                                    </p>
                                </div>
                            )
                        }

                        {
                            language === 'TAMIL' && (
                                <div>
                                    <p className='mb-5 text-base'>சர்வதேச வங்கியின் சங்கிலி</p>

                                    <p className='mb-5'>
                                        நான் CASCC (முதன்மை கார்டு வைத்திருப்பவர்) என, இந்தப் படிவத்தில் எனது மேலே கொடுக்கப்பட்ட அனைத்து விவரங்களும் சரியானவை மற்றும் உண்மையாக்கினேன்.
                                    </p>
                                    <p className='mb-5'>
                                        வெளிநாட்டு பரிமாற்ற சட்டம், எண் 12, 2017 (சட்டம்) கீழ் விதிக்கப்பட்ட நிலைகளுக்குத் தெரியுமென உறுதிபடுத்துகிறேன், இது மூலம் கார்டு வெளிநாட்டு பரிமாற்றங்களில் ஒப்பந்தமாகப் பயன்படுத்தப்படலாம், மேலும் அந்த நிலைகளுக்கு பின்பற்றுவதாக ஒப்புக்கொள்கிறேன்.
                                    </p>
                                    <p className='mb-5'>
                                        LOLC Finance PLC, சட்டத்தின் நிதியியல் நோக்கங்களுக்காக தேவையான எந்தவொரு தகவலையும், எனக்கு வழங்கப்பட்ட கார்டில் வெளிநாட்டு பரிமாற்றங்களில் நான் மேற்கொண்ட நபரிடமிருந்து வழங்க ஏற்கிறேன்.
                                    </p>
                                    <p className='mb-5'>
                                        வெளிநாட்டு பரிமாற்றங்கள் சாய்ந்த பயனர் என்னுடைய EFTC மீது அனுமதியின்றி நடத்தப்படுவதாக சந்தேகிக்கக்கூடிய ஆதாரங்கள் இருப்பின், முடிவளிக்கும் நிதியியல் நிறுவனத்தின் வசதியை நிறுத்துவதற்கும், வெளிநாட்டு பரிமாற்றத் துறையின் இயக்குனருக்கு அந்த விவகாரத்தை தகவல் தருவதற்கும் அவசியம் என்று எனக்கு தெரியும். நான் நாட்டை விட்டு வெளிநாடுகளில் வேலை செய்யச் சென்றால் அல்லது வெளியே சென்றால், கடன் கார்டைப் LOLC Finance PLC-க்கு ஒப்படைக்கப் போகிறேன் என்பதையும் உறுதிப்படுத்துகிறேன்.
                                    </p>
                                    <p className='mb-5 text-red-500'>
                                        அரசாண்மை மற்றும் நிபந்தனைகள் | கட்டணம்
                                    </p>
                                    <p className='mb-5'>
                                        இந்தக் கீழுள்ள உடன்படிக்கைகளை நான் ஏற்கிறேன், மேலும் இந்த டிஜிட்டல்/ஆன்லைன் விண்ணப்பத்தின் முழுவதும் எனது வழங்கப்பட்ட தகவல்களின் நியாயத்திற்கும் எனது ஏற்றுக்கொள்ளுதலாகக் கணக்கிடப்படும் என்று உறுதிப்படுத்துகிறேன்.
                                    </p>
                                </div>
                            )
                        }

                        {
                            language === 'SINHALA' && (
                                <div>
                                    <p className='mb-5 text-base'>ශ්‍රී ලංකාවේ මධ්‍යම බැංකුව</p>

                                    <p className='mb-5'>
                                        මම CASCC (ප්‍රාථමික කාඩ්පත් හිමිකරු), මෙම පෝරමයේ මම ලබා දුන් සියළු විස්තර සත්‍ය සහ නිවැරදි බව පරීක්ෂා කරමි.
                                    </p>
                                    <p className='mb-5'>
                                        බාහිර විනිමය අණුදනම් විධි, අංක 12, 2017 (අයැදුම) යටතේ නියමිත කොන්දේසි පිළිබඳ මට අවබෝධය ඇති බව මෙයින් පසුවීම් කරන අතර එම කොන්දේසි අනුගමනය කිරීමට මම පෙනී සිටිමි.
                                    </p>
                                    <p className='mb-5'>
                                        LOLC Finance PLC මට නීතිමය උනන්දුවක් සඳහා මම ලබා දුන් කාඩ්පත මගින් කරන ලද විනිමය ගනුදෙනු පිළිබඳ කිසියම් තොරතුරු ලබා දීමට මම එකඟව සිටිමි.
                                    </p>
                                    <p className='mb-5'>
                                        අනතුරුව, අනිසි විනිමය ගනුදෙනු සිදු කර ඇති බවට සැක කිරීමේ යුතු හේතු තිබේ නම්, සීමාසහගත මූල්‍ය ආයතනය ETFC හි විනිමය ලබාදීම නවතා දැමීම සහ විදේශ විනිමය දෙපාර්තමේන්තු අධ්‍යක්ෂට මෙම මැත වාර්තා කිරීම කළ යුතු බව මට වැටහේ. මම ශ්‍රී ලංකාව හෝ රැකියා සදහා විදේශය බලා පිටවූ විට මගේ ණය කාඩ්පත LOLC Finance PLC ට හෝ නිකුත් කරන බවත් සහතික කරමි.
                                    </p>
                                    <p className='mb-5 text-red-500'>
                                        වන් කාල සීමාව සහ කොන්දේසි | ප්‍රාරූපය
                                    </p>
                                    <p className='mb-5'>
                                        මෙහි සඳහන් කොටස් මම එකඟව, මෙම ඩිජිටල්/අන්තර්ජාල අයැදුම්පතේ සමස්තත්වය සඳහා මම ලබා දුන් තොරතුරු වල නිවැරදි බව පිළිගන්වනු බව සහතික කරමි.
                                    </p>
                                </div>
                            )
                        }


                    </Description>
                    <div className="flex justify-center sm:justify-end">
                        <Button
                            className='w-full sm:w-40'
                            onClick={() => setIsOpen(false)}
                            variant={"primary"}
                        >
                            Close
                        </Button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default TermsDialog