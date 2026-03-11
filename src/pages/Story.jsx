import React from 'react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { APP_CONTENT } from '../data/content';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import Layout from '../components/Layout';

const Story = () => {
    const { gameState, navigateTo } = useGame();
    const { language, t } = useLanguage();
    const text = APP_CONTENT.story[language];
    const { onboardingComplete } = gameState;

    // Split text by newlines for paragraph rendering
    const paragraphs = text.split('\n\n');

    return (
        <Layout>
            <Card className="flex flex-col items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/papirs_fons.png')] bg-cover bg-center opacity-70 pointer-events-none" />

                <div className="relative z-10 w-full flex flex-col items-center">
                    <PageTitle>{t('menu_story')}</PageTitle>

                    <div className="w-full max-w-[1154px] space-y-7 pt-6 text-center">
                        {paragraphs.map((para, index) => (
                            <p key={index} className="text-black leading-relaxed font-bold text-[22px] sm:text-2xl md:text-3xl" dangerouslySetInnerHTML={{ __html: para }} />
                        ))}
                    </div>

                    <div className="w-full">
                        <button
                            onClick={() => {
                                if (onboardingComplete) {
                                    navigateTo('menu', null, 'backward');
                                } else {
                                    navigateTo('tutorial', null, 'forward');
                                }
                            }}
                            className="w-full text-white font-bold py-2 mt-10 text-4xl font-medieval transition-transform shadow-xl active:scale-95 duration-100 bg-[length:100%_100%] bg-center bg-no-repeat drop-shadow-2xl [-webkit-text-stroke:_0.4px_black] [text-shadow:_2px_2px_2px_rgba(0,0,0,0.3)]"
                            style={{ backgroundImage: "url('/images/Delis.png')" }}

                        >
                            {onboardingComplete
                                ? (language === 'lv' ? 'Atpakaļ uz izvēlni' : 'Back to Menu')
                                : (language === 'lv' ? 'Tālāk' : 'Next')
                            }

                        </button>
                        <br />
                        <br />
                        {!onboardingComplete && (
                            <button
                                onClick={() => navigateTo('language', null, 'backward')}
                                className="w-[70%] mx-auto py-3 px-6 mb-2 flex justify-center items-center bg-[length:100%_100%] text-1xl font-bold font-medieval text-black transition-transform active:scale-95 drop-shadow-lg flex items-center justify-center pt-3"
                                style={{ backgroundImage: "url('/images/Scroll.png')" }}
                            >
                                {t('back')}
                            </button>
                        )}
                    </div>
                </div>
            </Card>
        </Layout>
    );
};

export default Story;
