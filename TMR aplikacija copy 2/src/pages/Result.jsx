import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { APP_CONTENT } from '../data/content';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import Layout from '../components/Layout';

// Icons

const Result = () => {
    const { gameState, navigateTo } = useGame();
    const { language } = useLanguage();
    const { lastAnswerCorrect, currentQuestionId } = gameState;

    const [showHint, setShowHint] = useState(false);
    const [showFact, setShowFact] = useState(false);

    const content = APP_CONTENT.results[lastAnswerCorrect ? 'success' : 'failure'][language];

    // Get question data to show riddle info
    const question = APP_CONTENT.questions.find(q => q.id === currentQuestionId);

    // Custom reward text from the question data
    const customReward = question?.reward?.[language];

    // Helper to format text (superscripts)
    const renderFormattedText = (text) => {
        if (!text) return null;

        // Regex to match number followed by st, nd, rd, th
        const parts = text.split(/(\d+(?:st|nd|rd|th))/gi);

        return parts.map((part, index) => {
            const match = part.match(/^(\d+)(st|nd|rd|th)$/i);
            if (match) {
                return (
                    <span key={index}>
                        {match[1]}<sup className="text-[0.6em]">{match[2]}</sup>
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    const handleAction = () => {
        if (lastAnswerCorrect) {
            navigateTo('riddle', null, 'forward');
        } else {
            // Go back to the question (currently mock, will be question_detail in future)
            navigateTo('question_detail', null, 'backward');
        }
    };

    return (
        <Layout>
            <Card className="flex flex-col items-center text-center py-8 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70 pointer-events-none"
                    style={{ backgroundImage: `url('/images/${lastAnswerCorrect ? 'koka_siena.png' : 'Akmens_siena.png'}')` }}
                />
                <div className="relative z-10 w-full flex flex-col items-center">
                    {/* Header with Hint/Fact buttons */}
                    <div className="w-full flex justify-end gap-2 mb-2">
                        <button
                            onClick={() => setShowHint(!showHint)}
                            className={`p-1 rounded-full transition-colors ${showHint ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}
                        >
                            <img src="/images/spuldze_simbols.png" alt="Hint" className="w-12 h-12 object-contain" />
                        </button>
                        <button
                            onClick={() => setShowFact(!showFact)}
                            className={`p-1 rounded-full transition-colors ${showFact ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}
                        >
                            <img src="/images/extrainfo_simbols.png" alt="Fact" className="w-12 h-12 object-contain" />
                        </button>
                    </div>

                    {/* Dynamic Info Blocks */}
                    <div className="w-full space-y-4 mb-6 text-left">
                        {showHint && question && (
                            <div
                                className="p-8 text-sm text-black animate-fadeIn bg-center bg-no-repeat bg-[length:100%_100%]"
                                style={{ backgroundImage: "url('/images/papirs_horizontali_2.png')" }}
                            >
                                <span className="font-bold block mb-1 text-lg">{language === 'lv' ? 'Padoms:' : 'Hint:'}</span>
                                <span className="text-base font-semibold">{question.hint[language]}</span>
                            </div>
                        )}

                        {showFact && question && (
                            <div
                                className="p-8 text-sm text-black animate-fadeIn bg-center bg-no-repeat bg-[length:100%_100%]"
                                style={{ backgroundImage: "url('/images/papirs_horizontali_2.png')" }}
                            >
                                <span className="font-bold block mb-1 text-lg">{language === 'lv' ? 'Fakts:' : 'Fact:'}</span>
                                <span className="text-base font-semibold" dangerouslySetInnerHTML={{ __html: question.extraInfo[language] }} />
                            </div>
                        )}
                    </div>

                    {/* Status Indicator */}
                    <img
                        src={lastAnswerCorrect ? "/images/correct_answer.png" : "/images/incorrect_answer.png"}
                        alt={lastAnswerCorrect ? "Correct" : "Incorrect"}
                        className="w-35 h-35 mb-6 object-contain"
                    />

                    <PageTitle className={`opacity-100 ${lastAnswerCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {content.title}
                    </PageTitle>

                    {lastAnswerCorrect ? (
                        <div
                            className="w-full mb-6 p-10 bg-center bg-no-repeat bg-[length:100%_100%]"
                            style={{ backgroundImage: "url('/images/papirs_horizontali.png')" }}
                        >


                            {customReward ? (
                                <div className="font-bold text-black text-3xl whitespace-pre-line">
                                    {renderFormattedText(customReward)}
                                </div>
                            ) : (
                                <div className="text-xl font-bold text-gray-400">
                                    Reward not configured
                                </div>
                            )}
                        </div>
                    ) : (
                        <p>
                        </p>
                    )}



                    {lastAnswerCorrect ? (
                        <button
                            onClick={handleAction}
                            className="w-[90%] text-white py-1 font-bold text-3xl font-medieval transition-transform shadow-xl active:scale-95 duration-100 bg-[length:100%_100%] bg-center bg-no-repeat drop-shadow-2xl [-webkit-text-stroke:_0.3px_black] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.6)]"
                            style={{ backgroundImage: "url('/images/Delis.png')" }}
                        >
                            {content.button}
                        </button>
                    ) : (
                        <button
                            onClick={handleAction}
                            className="w-full text-white py-3 font-bold text-4xl font-medieval transition-transform shadow-xl active:scale-95 duration-100 bg-[length:100%_100%] bg-center bg-no-repeat drop-shadow-2xl [-webkit-text-stroke:_0.1px_black] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.5)]"
                            style={{ backgroundImage: "url('/images/Delis.png')" }}
                        >
                            {content.button}
                        </button>
                    )}



                </div>
            </Card>
        </Layout>
    );
};

export default Result;
