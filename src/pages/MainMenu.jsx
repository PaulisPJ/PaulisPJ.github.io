import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import Card from '../components/Card';
import Layout from '../components/Layout';

const MenuButton = ({ label, onClick }) => (
    <button
        onClick={onClick}
        className="w-full text-white py-4 text-4xl font-medieval font-bold mb-3 transition-transform shadow-xl active:scale-95 duration-100 bg-[length:100%_100%] bg-center bg-no-repeat drop-shadow-2xl [-webkit-text-stroke:_0.3px_black] [text-shadow:_2px_2px_2px_rgba(0,0,0,0.25)]"
        style={{ backgroundImage: "url('/images/Delis.png')" }}
    >
        {label}
    </button>
);

const FlagLV = () => (
    <svg viewBox="0 0 600 300" className="w-15 mt-2 h-auto drop-shadow-2xl hover:scale-110 transition-transform cursor-pointer">
        <rect width="600" height="300" fill="#9E3039" />
        <rect y="120" width="600" height="60" fill="#FFFFFF" />
    </svg>
);

const FlagUK = () => (
    <svg viewBox="0 0 60 30" className="w-15 mt-2 h-auto drop-shadow-2xl hover:scale-110 transition-transform cursor-pointer">
        <clipPath id="t">
            <path d="M30,15h30v15zv15h-30zh-30v-15zv-15h30z" />
        </clipPath>
        <path d="M0,0v30h60v-30z" fill="#00247d" />
        <path d="M0,0l60,30m0,-30l-60,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0l60,30m0,-30l-60,30" clipPath="url(#t)" stroke="#cf142b" strokeWidth="4" />
        <path d="M30,0v30M0,15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0v30M0,15h60" stroke="#cf142b" strokeWidth="6" />
    </svg>
);

const MainMenu = () => {
    const { t, language, setLanguage } = useLanguage();
    const { navigateTo, resetApp } = useGame();

    return (
        <Layout>
            <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/Bruga_siena.jpg')] bg-cover bg-center opacity-80 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center w-full">
                    <div
                        className="relative w-full max-w-[600px] bg-cover bg-center flex justify-center items-center mb-4 text-black"
                        style={{
                            aspectRatio: '2492 / 1170',
                            backgroundImage: "url('/images_3/Title_paper.png')"
                        }}
                    >
                        <h1
                            className="font-medieval font-bold text-[clamp(30px,7vw,40px)] whitespace-pre-line text-center px-6 leading-tight select-none ml-5 mr-5"
                        >
                            {t('app_title')}
                        </h1>
                    </div>

                    <div className="w-full flex flex-col gap-2">
                        <MenuButton label={t('menu_riddle')} onClick={() => navigateTo('riddle')} />
                        <MenuButton label={t('menu_questions')} onClick={() => navigateTo('questions')} />
                        <MenuButton label={t('menu_story')} onClick={() => navigateTo('story')} />
                        <MenuButton label={t('menu_tutorial')} onClick={() => navigateTo('tutorial')} />
                    </div>

                    <div
                        className="w-full flex justify-center items-center gap-0 my-2 px-6 py-4 bg-[length:100%_100%] bg-center bg-no-repeat"
                        style={{ backgroundImage: "url('/images_2/papirs_horizontali.png')" }}
                    >

                        <img
                            src="/images_3/TMR_logo_sais_horizontali_cutout.png"
                            alt="TMR Logo"
                            className="h-25 w-40 object-contain drop-shadow-xl"
                        />
                        <img
                            src="/images/ST_logo.png"
                            alt="ST Logo"
                            className="h-30 w-25 object-contain drop-shadow-xl mb-1"
                        />
                    </div>

                    <div className="flex flex-col items-center gap-4">


                        <div
                            onClick={() => {
                                window.scrollTo(0, 0);
                                navigateTo('menu', null, 'forward');
                                setLanguage(language === 'lv' ? 'en' : 'lv');
                            }}
                            className="cursor-pointer"
                            title={language === 'lv' ? "Switch to English" : "Pārslēgt uz latviešu valodu"}
                        >
                            {language === 'lv' ? <FlagUK /> : <FlagLV />}
                        </div>
                    </div>
                </div>
            </Card>
        </Layout>
    );
};

export default MainMenu;
