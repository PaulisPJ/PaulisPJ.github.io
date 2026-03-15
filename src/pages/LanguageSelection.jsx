import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useGame } from '../context/GameContext';
import Card from '../components/Card';
import Layout from '../components/Layout';

const LanguageSelection = () => {
    const { setLanguage, t } = useLanguage();
    const { gameState, navigateTo } = useGame();
    const { onboardingComplete } = gameState;

    const handleSelect = (lang) => {
        setLanguage(lang);
        if (onboardingComplete) {
            navigateTo('menu');
        } else {
            navigateTo('story');
        }
    };

    return (
        <Layout>
            <Card className="relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images_2/koka_siena.png')] bg-cover bg-center opacity-80 pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center gap-6 text-center">
                    <div
                        className="w-full max-w-[600px] bg-center bg-no-repeat bg-[length:100%_100%] flex flex-col items-center justify-center py-6 px-6"
                        style={{ backgroundImage: "url('/images_2/papirs_horizontali.png')" }}
                    >
                        <h1 className="text-3xl font-bold mb-3">{t('app_title')}</h1>
                        <p className="text-lg font-bold">Izvēlieties valodu /<br />Select Language</p>
                    </div>

                    <button
                        onClick={() => handleSelect('lv')}
                        className="w-full max-w-[400px] h-24 bg-center bg-no-repeat bg-[length:100%_100%] text-3xl font-bold font-medieval text-black transition-transform active:scale-95 drop-shadow-lg flex items-center justify-center pt-2"
                        style={{ backgroundImage: "url('/images_3/Title_paper.png')" }}
                    >
                        Latviešu
                    </button>

                    <button
                        onClick={() => handleSelect('en')}
                        className="w-full max-w-[400px] h-24 bg-center bg-no-repeat bg-[length:100%_100%] text-3xl font-bold font-medieval text-black transition-transform active:scale-95 drop-shadow-lg flex items-center justify-center pt-2"
                        style={{ backgroundImage: "url('/images_3/Title_paper.png')" }}
                    >
                        English
                    </button>
                </div>
            </Card>
        </Layout>
    );
};

export default LanguageSelection;
