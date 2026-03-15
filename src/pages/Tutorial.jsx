import React from 'react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { APP_CONTENT } from '../data/content';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import Layout from '../components/Layout';

// SVGs for Visual Aids
const ArrowLeft = () => (
    <img src="/images_3/bulta_simbols.png" alt="Arrow" className="w-12 h-12 object-contain" />
);
const Lightbulb = () => (
    <img src="/images_4/spuldze_simbols.png" alt="Lightbulb" className="w-12 h-12 object-contain" />
);
const Paragraph = () => (
    <img src="/images_2/extrainfo_simbols.png" alt="Paragraph" className="w-12 h-12 object-contain" />
);
const HelpCircle = () => (
    <img src="/images_2/jautajumzime_simbols.png" alt="Help" className="w-12 h-12 object-contain" />
);

const Tutorial = () => {
    const { navigateTo, completeOnboarding, gameState } = useGame();
    const { language, t } = useLanguage();
    const tutorialContent = APP_CONTENT.tutorial[language];
    const explanation = APP_CONTENT.tutorial_riddle_explanation[language];

    if (!tutorialContent) {
        return <div>Error: Tutorial content missing for language {language}</div>;
    }

    const getIcon = (type) => {
        switch (type) {
            case 'arrow': return <ArrowLeft />;
            case 'question': return <Lightbulb />;
            case 'fact': return <Paragraph />;
            case 'help': return <HelpCircle />;
            default: return null;
        }
    };

    return (
        <Layout>
            <Card className="flex flex-col items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images_2/koka_siena.png')] bg-cover bg-center opacity-70 pointer-events-none" />

                <div className="relative z-10 w-full flex flex-col items-center">
                    <PageTitle>
                        {!gameState.onboardingComplete ? (
                            language === 'lv' ? (
                                <div className="relative z-10 flex flex-col font-bold items-center w-full text-[40px] sm:text-4xl md:text-[45px] drop-shadow-lg [-webkit-text-stroke:_0.3px_black] [text-shadow:_1px_2px_2px_rgba(0,0,0,0.3)]">
                                    Kā spēlēt?
                                </div>
                            ) : (
                                <div className="relative z-10 flex flex-col font-bold items-center w-full text-[35px] sm:text-4xl md:text-[45px] drop-shadow-lg [-webkit-text-stroke:_0.3px_black] [text-shadow:_1px_2px_2px_rgba(0,0,0,0.3)]">
                                    How to play?
                                </div>
                            )
                        ) : (
                            <div className="relative z-10 flex flex-col items-center w-full">
                                {t('menu_tutorial')}
                            </div>
                        )}
                    </PageTitle>

                    <div className="w-full max-w-[1154px] space-y-6 text-center">
                        {/* Symbol Guide */}
                        <div className="space-y-4 text-left">
                            {tutorialContent.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-4 rounded-lg bg-[length:100%_100%] bg-center bg-no-repeat"
                                    style={{ backgroundImage: "url('/images_2/papirs_horizontali.png')" }}
                                >
                                    <div className="text-orange-600 p-2 shrink-0 ml-1">
                                        {getIcon(item.symbol)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl">{item.title}</h3>
                                        <p className="text-black text-m leading-tight font-semibold mr-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>



                        {/* Riddle Solution Explanation */}
                        <div className="flex flex-col items-center gap-8 py-4">

                            {/* Example Visual */}
                            <div
                                className="w-[110%] max-w-lg flex flex-col items-center pt-6 pb-34 bg-center bg-no-repeat bg-[length:100%_100%] mb-0"
                                style={{ backgroundImage: "url('/images_4/papirs_horizontali_2.png')" }}
                            >
                                <span className="text-[20px] md:text-[15px] font-bold text-gray-800 tracking-wider mb-2 px-4 text-center leading-tight">{explanation.example_caption}</span>
                                <div className="relative flex justify-center">
                                    <span className="text-[36px] md:text-[40px] font-bold tracking-wider leading-none mt-1">{explanation.example_text}</span>

                                    {/* Arrow for Position */}
                                    <div className="absolute top-full left-0 ml-1 mt-1 flex flex-col items-center">
                                        <svg width="24" height="40" viewBox="0 0 24 40" className="text-black overflow-visible mr-[30px]">
                                            <path d="M12 35 L12 5 M6 13 L12 5 L18 13" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    {language === 'lv' ? (
                                        <div className="absolute top-full left-0 -ml-15 mt-[45px] flex flex-col items-center">
                                            <span className="text-[24px] text-gray-900 font-bold leading-tight text-left w-60 -ml-6 px-[20%]">
                                                {explanation.label_position}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="absolute top-full left-0 -ml-12 mt-[45px] flex flex-col items-center">
                                            <span className="text-[24px] text-gray-900 font-bold leading-tight text-left w-60 -mr-10 -ml-2 px-[20%]">
                                                {explanation.label_position}
                                            </span>
                                        </div>
                                    )}

                                    {/* Arrow for Letter */}
                                    <div className="absolute top-full right-0 -mr-9 mt-1 flex flex-col items-center">
                                        <svg width="24" height="40" viewBox="0 0 24 40" className="text-black overflow-visible mr-[30px]">
                                            <path d="M12 35 L12 5 M6 13 L12 5 L18 13" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    {language === 'lv' ? (
                                        <div className="absolute top-full right-0 -mr-12 mt-[45px] flex flex-col items-center">
                                            <span className="text-[24px] text-gray-900 font-bold leading-tight text-right w-60 -mr-4 px-[20%]">
                                                {explanation.label_letter}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="absolute top-full right-0 -mr-12 mt-[45px] flex flex-col items-center">
                                            <span className="text-[24px] text-gray-900 font-bold leading-tight text-center w-32 mr-[15px] -ml-20 pt-4 px-[20%]">
                                                {explanation.label_letter}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Spacer for arrows and large text */}
                            <div className="h-0"></div>

                            {/* Description Text */}
                            <div
                                className="w-[108%] flex justify-center items-center -mt-15 py-18 px-8 bg-center bg-no-repeat bg-[length:100%_100%]"
                                style={{ backgroundImage: "url('/images/Papirs_vertikali.png')" }}
                            >
                                <p className="text-gray-900 leading-relaxed text-center whitespace-pre-line font-medium text-xl pl-3 pr-3">
                                    {explanation.description}
                                </p>
                            </div>
                            {explanation.closing && (
                                <p className="w-[70%] flex justify-center text-black-900 font-bold text-3xl text-center py-4 px-4 bg-center bg-no-repeat bg-[length:100%_100%]"
                                    style={{ backgroundImage: "url('/images_2/papirs_horizontali.png')" }}>
                                    {explanation.closing}
                                </p>
                            )}
                        </div>


                    </div>
                    <div className="w-full">
                        <button
                            onClick={() => {
                                if (!gameState.onboardingComplete) {
                                    completeOnboarding();
                                    navigateTo('menu', null, 'forward');
                                } else {
                                    navigateTo(gameState.returnPage || 'menu', null, 'backward');
                                }
                            }}
                            className="w-full text-white py-3 mt-5 text-4xl font-medieval font-bold transition-transform shadow-xl active:scale-95 duration-100 bg-[length:100%_100%] bg-center bg-no-repeat drop-shadow-2xl [-webkit-text-stroke:_0.4px_black] [text-shadow:_2px_2px_2px_rgba(0,0,0,0.3)]"
                            style={{ backgroundImage: "url('/images/Delis.png')" }}
                        >
                            {!gameState.onboardingComplete
                                ? (language === 'lv' ? 'Sākt' : 'Start')
                                : t('back')
                            }
                        </button>
                    </div>
                </div>
            </Card>
        </Layout>
    );
};

export default Tutorial;
