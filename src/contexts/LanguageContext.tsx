import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LangCode = 'en' | 'hi' | 'gu' | 'mr' | 'raj';

export const LANGUAGES: { code: LangCode; label: string; nativeLabel: string }[] = [
  { code: 'en',  label: 'English',    nativeLabel: 'English' },
  { code: 'hi',  label: 'Hindi',      nativeLabel: 'हिन्दी' },
  { code: 'gu',  label: 'Gujarati',   nativeLabel: 'ગુજરાતી' },
  { code: 'mr',  label: 'Marathi',    nativeLabel: 'मराठी' },
  { code: 'raj', label: 'Rajasthani', nativeLabel: 'राजस्थानी' },
];

// ---------- Translation Dictionary ----------
const translations: Record<string, Record<LangCode, string>> = {
  // Sidebar
  'Overview':            { en: 'Overview',        hi: 'अवलोकन',          gu: 'ઝાંખી',           mr: 'आढावा',          raj: 'झांकी' },
  'Medical Records':     { en: 'Medical Records', hi: 'मेडिकल रिकॉर्ड',  gu: 'તબીબી રેકોર્ડ',   mr: 'वैद्यकीय नोंदी', raj: 'मेडिकल रिकॉर्ड' },
  'Lab Reports':         { en: 'Lab Reports',     hi: 'लैब रिपोर्ट',     gu: 'લેબ રિપોર્ટ',     mr: 'लॅब अहवाल',      raj: 'लैब रिपोर्ट' },
  'Appointments':        { en: 'Appointments',    hi: 'अपॉइंटमेंट',      gu: 'એપોઇન્ટમેન્ટ',    mr: 'भेटी',           raj: 'अपॉइन्टमेन्ट' },
  'Find Doctors':        { en: 'Find Doctors',    hi: 'डॉक्टर खोजें',    gu: 'ડૉક્ટર શોધો',     mr: 'डॉक्टर शोधा',    raj: 'डॉक्टर ढूंढो' },
  'Find Pharmacy':       { en: 'Find Pharmacy',   hi: 'फार्मेसी खोजें',  gu: 'ફાર્મસી શોધો',    mr: 'फार्मसी शोधा',   raj: 'दवाखानो ढूंढो' },
  'Emergency Profile':   { en: 'Emergency Profile', hi: 'आपातकालीन प्रोफ़ाइल', gu: 'કટોકટી પ્રોફાઇલ', mr: 'आणीबाणी प्रोफाइल', raj: 'इमरजेंसी प्रोफाइल' },
  'Settings':            { en: 'Settings',        hi: 'सेटिंग्स',         gu: 'સેટિંગ્સ',         mr: 'सेटिंग्ज',        raj: 'सेटिंग्स' },

  // TopBar
  'My Health':           { en: 'My Health',       hi: 'मेरा स्वास्थ्य',   gu: 'મારું સ્વાસ્થ્ય',  mr: 'माझे आरोग्य',    raj: 'म्हारो स्वास्थ्य' },
  'Dashboard':           { en: 'Dashboard',       hi: 'डैशबोर्ड',         gu: 'ડેશબોર્ડ',         mr: 'डॅशबोर्ड',        raj: 'डैशबोर्ड' },

  // Welcome Banner
  'Good morning':        { en: 'Good morning',    hi: 'सुप्रभात',         gu: 'સુપ્રભાત',        mr: 'सुप्रभात',        raj: 'राम राम सा' },
  'Your health profile is': { en: 'Your health profile is', hi: 'आपकी स्वास्थ्य प्रोफ़ाइल', gu: 'તમારી સ્વાસ્થ્ય પ્રોફાઇલ', mr: 'तुमचे आरोग्य प्रोफाइल', raj: 'थारी स्वास्थ्य प्रोफाइल' },
  '% complete.':         { en: '% complete.',     hi: '% पूर्ण है।',      gu: '% પૂર્ણ છે.',     mr: '% पूर्ण आहे.',    raj: '% पूरो है।' },
  'Complete your profile': { en: 'Complete your profile →', hi: 'अपनी प्रोफ़ाइल पूरी करें →', gu: 'તમારી પ્રોફાઇલ પૂર્ણ કરો →', mr: 'तुमचे प्रोफाइल पूर्ण करा →', raj: 'थारी प्रोफाइल पूरी करो →' },

  // Emergency Card
  'Emergency Profile Card': { en: 'Emergency Profile', hi: 'आपातकालीन प्रोफ़ाइल', gu: 'કટોકટી પ્રોફાઇલ', mr: 'आणीबाणी प्रोफाइल', raj: 'इमरजेंसी प्रोफाइल' },
  'Show Emergency QR':   { en: 'Show Emergency QR', hi: 'इमरजेंसी QR दिखाएँ', gu: 'ઇમર્જન્સી QR બતાવો', mr: 'आणीबाणी QR दाखवा', raj: 'इमरजेंसी QR दिखाओ' },

  // Summary Cards
  'Active Medications':  { en: 'Active Medications', hi: 'सक्रिय दवाइयाँ',  gu: 'સક્રિય દવાઓ',     mr: 'सक्रिय औषधे',     raj: 'चालू दवाइयाँ' },
  'Conditions':          { en: 'Conditions',      hi: 'स्वास्थ्य स्थिति', gu: 'આરોગ્ય સ્થિતિ',   mr: 'आरोग्य स्थिती',   raj: 'बीमारियाँ' },
  'Allergies':           { en: 'Allergies',        hi: 'एलर्जी',           gu: 'એલર્જી',           mr: 'ऍलर्जी',          raj: 'एलर्जी' },
  'Insurance':           { en: 'Insurance',        hi: 'बीमा',             gu: 'વીમો',             mr: 'विमा',            raj: 'बीमा' },
  'None added':          { en: 'None added',      hi: 'कोई नहीं',         gu: 'કંઈ ઉમેર્યું નથી', mr: 'काही नाही',       raj: 'कोई नीं' },
  'None recorded':       { en: 'None recorded',   hi: 'कोई रिकॉर्ड नहीं', gu: 'કોઈ રેકોર્ડ નથી', mr: 'नोंद नाही',       raj: 'कोई रिकॉर्ड नीं' },
  'Not enrolled':        { en: 'Not enrolled',    hi: 'नामांकित नहीं',    gu: 'નોંધાયેલ નથી',    mr: 'नोंदणी नाही',     raj: 'भरतू नहीं करायो' },
  'Active':              { en: 'Active',           hi: 'सक्रिय',           gu: 'સક્રિય',           mr: 'सक्रिय',          raj: 'चालू' },
  'View all':            { en: 'View all →',      hi: 'सभी देखें →',      gu: 'બધા જુઓ →',       mr: 'सर्व पहा →',      raj: 'सगळा देखो →' },

  // Upcoming Appointments
  'Upcoming Appointments': { en: 'Upcoming Appointments', hi: 'आगामी अपॉइंटमेंट', gu: 'આગામી એપોઇન્ટમેન્ટ', mr: 'आगामी भेटी', raj: 'आण आळी अपॉइन्टमेन्ट' },
  'Book Appointment':    { en: 'Book Appointment +', hi: 'अपॉइंटमेंट बुक करें +', gu: 'એપોઇન્ટમેન્ટ બુક કરો +', mr: 'भेट बुक करा +', raj: 'अपॉइन्टमेन्ट बुक करो +' },
  'No upcoming appointments.': { en: 'No upcoming appointments.', hi: 'कोई आगामी अपॉइंटमेंट नहीं।', gu: 'કોઈ આગામી એપોઇન્ટમેન્ટ નથી.', mr: 'कोणतीही आगामी भेट नाही.', raj: 'कोई आण आळी अपॉइन्टमेन्ट नीं।' },
  'Book your first appointment': { en: 'Book your first appointment →', hi: 'अपनी पहली अपॉइंटमेंट बुक करें →', gu: 'તમારી પ્રથમ એપોઇન્ટમેન્ટ બુક કરો →', mr: 'तुमची पहिली भेट बुक करा →', raj: 'थारी पहली अपॉइन्टमेन्ट बुक करो →' },

  // Recent Reports
  'Recent Reports':      { en: 'Recent Reports',  hi: 'हालिया रिपोर्ट',   gu: 'તાજેતરના અહેવાલ', mr: 'अलीकडील अहवाल',   raj: 'नवी रिपोर्ट' },
  'Upload Report':       { en: 'Upload Report +', hi: 'रिपोर्ट अपलोड करें +', gu: 'રિપોર્ટ અપલોડ કરો +', mr: 'अहवाल अपलोड करा +', raj: 'रिपोर्ट अपलोड करो +' },
  'No reports uploaded yet.': { en: 'No reports uploaded yet.', hi: 'अभी तक कोई रिपोर्ट अपलोड नहीं।', gu: 'હજુ સુધી કોઈ રિપોર્ટ અપલોડ થયો નથી.', mr: 'अद्याप अहवाल अपलोड केलेला नाही.', raj: 'अभी कोई रिपोर्ट अपलोड नीं करी।' },
  'Upload your first report': { en: 'Upload your first report →', hi: 'अपनी पहली रिपोर्ट अपलोड करें →', gu: 'તમારો પ્રથમ રિપોર્ટ અપલોડ કરો →', mr: 'तुमचा पहिला अहवाल अपलोड करा →', raj: 'थारी पहली रिपोर्ट अपलोड करो →' },
  'Abnormal':            { en: 'Abnormal',        hi: 'असामान्य',          gu: 'અસામાન્ય',         mr: 'असामान्य',         raj: 'गड़बड़' },

  // Vitals
  'Vitals Tracker':      { en: 'Vitals Tracker',  hi: 'वाइटल ट्रैकर',    gu: 'વાઇટલ ટ્રેકર',    mr: 'व्हायटल ट्रॅकर',  raj: 'वाइटल ट्रैकर' },
  'Log Reading':         { en: 'Log Reading',     hi: 'रीडिंग दर्ज करें', gu: 'રીડિંગ લોગ કરો',  mr: 'रीडिंग नोंदवा',   raj: 'रीडिंग दर्ज करो' },
  'No vitals recorded yet.': { en: 'No vitals recorded yet.', hi: 'अभी तक कोई वाइटल रिकॉर्ड नहीं।', gu: 'હજુ સુધી કોઈ વાઇટલ રેકોર્ડ નથી.', mr: 'अद्याप व्हायटल नोंदवलेले नाहीत.', raj: 'अभी कोई वाइटल रिकार्ड नीं।' },
  'Log your first reading': { en: 'Log your first reading →', hi: 'अपनी पहली रीडिंग दर्ज करें →', gu: 'તમારી પ્રથમ રીડિંગ લોગ કરો →', mr: 'तुमची पहिली रीडिंग नोंदवा →', raj: 'थारी पहली रीडिंग दर्ज करो →' },
  'Blood Pressure (last 7)': { en: 'Blood Pressure (last 7)', hi: 'रक्तचाप (अंतिम 7)', gu: 'બ્લડ પ્રેશર (છેલ્લા 7)', mr: 'रक्तदाब (शेवटचे 7)', raj: 'ब्लड प्रेशर (पिछला 7)' },
  'Blood Sugar (last 7)': { en: 'Blood Sugar (last 7)', hi: 'रक्त शर्करा (अंतिम 7)', gu: 'બ્લડ સુગર (છેલ્લા 7)', mr: 'रक्तशर्करा (शेवटचे 7)', raj: 'ब्लड शुगर (पिछला 7)' },

  // Log Vitals Modal
  'Log Vital Reading':   { en: 'Log Vital Reading', hi: 'वाइटल रीडिंग दर्ज करें', gu: 'વાઇટલ રીડિંગ લોગ કરો', mr: 'व्हायटल रीडिंग नोंदवा', raj: 'वाइटल रीडिंग दर्ज करो' },
  'Blood Pressure':      { en: '🩸 Blood Pressure', hi: '🩸 रक्तचाप',      gu: '🩸 બ્લડ પ્રેશર',   mr: '🩸 रक्तदाब',      raj: '🩸 ब्लड प्रेशर' },
  'Blood Sugar':         { en: '🍬 Blood Sugar',   hi: '🍬 रक्त शर्करा',  gu: '🍬 બ્લડ સુગર',    mr: '🍬 रक्तशर्करा',   raj: '🍬 ब्लड शुगर' },
  'Systolic (mmHg)':     { en: 'Systolic (mmHg)',  hi: 'सिस्टोलिक (mmHg)', gu: 'સિસ્ટોલિક (mmHg)', mr: 'सिस्टोलिक (mmHg)', raj: 'सिस्टोलिक (mmHg)' },
  'Diastolic (mmHg)':    { en: 'Diastolic (mmHg)', hi: 'डायस्टोलिक (mmHg)', gu: 'ડાયસ્ટોલિક (mmHg)', mr: 'डायस्टोलिक (mmHg)', raj: 'डायस्टोलिक (mmHg)' },
  'Blood Sugar (mg/dL)': { en: 'Blood Sugar (mg/dL)', hi: 'रक्त शर्करा (mg/dL)', gu: 'બ્લડ સુગર (mg/dL)', mr: 'रक्तशर्करा (mg/dL)', raj: 'ब्लड शुगर (mg/dL)' },
  'Notes (optional)':    { en: 'Notes (optional)', hi: 'नोट्स (वैकल्पिक)', gu: 'નોંધ (વૈકલ્પિક)',  mr: 'नोट्स (ऐच्छिक)', raj: 'नोट्स (ऐच्छिक)' },
  'Save Reading':        { en: 'Save Reading',    hi: 'रीडिंग सेव करें',  gu: 'રીડિંગ સેવ કરો',  mr: 'रीडिंग जतन करा',  raj: 'रीडिंग सेव करो' },
  'Cancel':              { en: 'Cancel',           hi: 'रद्द करें',        gu: 'રદ કરો',           mr: 'रद्द करा',        raj: 'रद्द करो' },
  'Saving...':           { en: 'Saving...',        hi: 'सेव हो रहा है...', gu: 'સેવ થઈ રહ્યું છે...', mr: 'जतन होत आहे...', raj: 'सेव हो रह्यो है...' },

  // Sidebar Bottom
  'Welcome':             { en: 'Welcome',          hi: 'स्वागत है',        gu: 'સ્વાગત છે',       mr: 'स्वागत आहे',     raj: 'पधारो' },
  'ABHA Linked':         { en: 'ABHA Linked ✓',   hi: 'ABHA जुड़ा ✓',     gu: 'ABHA જોડાયેલ ✓',  mr: 'ABHA जोडलेले ✓', raj: 'ABHA जुड़्यो ✓' },
  'Link ABHA':           { en: 'Link ABHA →',     hi: 'ABHA जोड़ें →',    gu: 'ABHA જોડો →',     mr: 'ABHA जोडा →',    raj: 'ABHA जोड़ो →' },
  'My Emergency QR':     { en: 'My Emergency QR',  hi: 'मेरा इमरजेंसी QR', gu: 'મારો ઇમર્જન્સી QR', mr: 'माझा आणीबाणी QR', raj: 'म्हारो इमरजेंसी QR' },
  'Tap to view & download': { en: 'Tap to view & download', hi: 'देखने और डाउनलोड करने के लिए टैप करें', gu: 'જોવા અને ડાઉનલોડ કરવા ટેપ કરો', mr: 'पाहण्यासाठी आणि डाउनलोड करण्यासाठी टॅप करा', raj: 'देखण अर डाउनलोड करण खातर टैप करो' },
  'Logout':              { en: 'Logout',           hi: 'लॉगआउट',           gu: 'લૉગઆઉટ',           mr: 'लॉगआउट',          raj: 'लॉगआउट' },

  // Buttons
  'Download Full Profile': { en: 'Download Full Profile', hi: 'पूरी प्रोफ़ाइल डाउनलोड करें', gu: 'પૂર્ણ પ્રોફાઇલ ડાઉનલોડ કરો', mr: 'पूर्ण प्रोफाइल डाउनलोड करा', raj: 'पूरी प्रोफाइल डाउनलोड करो' },
  'Generating PDF...':   { en: 'Generating PDF...', hi: 'PDF बन रहा है...',  gu: 'PDF બની રહી છે...', mr: 'PDF तयार होत आहे...', raj: 'PDF बण रह्यो है...' },

  // Language Selector
  'Language':            { en: 'Language',          hi: 'भाषा',             gu: 'ભાષા',             mr: 'भाषा',            raj: 'भासा' },
};

// ---------- Context & Hook ----------
interface LanguageContextType {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<LangCode>(() => {
    try {
      return (localStorage.getItem('sanjeevani_lang') as LangCode) || 'en';
    } catch { return 'en'; }
  });

  const setLang = (l: LangCode) => {
    setLangState(l);
    localStorage.setItem('sanjeevani_lang', l);
  };

  const t = (key: string): string => {
    const dict = translations[key];
    if (!dict) return key;
    return dict[lang] || dict.en || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
