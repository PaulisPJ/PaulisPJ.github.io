import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { APP_CONTENT } from '../data/content';
import Card from '../components/Card';
import Layout from '../components/Layout';

// Icons
const Lightbulb = () => (
    <img src="/images_2/spuldze_simbols.png" alt="Lightbulb" className="w-12 h-12 object-contain" />
);
const Paragraph = () => (
    <img src="/images_2/extrainfo_simbols.png" alt="Paragraph" className="w-12 h-12 object-contain" />
);

const QuestionDetail = () => {
    const { gameState, submitAnswer } = useGame();
    const { language } = useLanguage();
    const { currentQuestionId } = gameState;

    const [userAnswer, setUserAnswer] = useState("");
    const [showHint, setShowHint] = useState(false);
    const [showFact, setShowFact] = useState(false);

    // Find the current question
    const question = APP_CONTENT.questions.find(q => q.id === currentQuestionId);

    if (!question) {
        return <Layout><Card>Error: Question not found</Card></Layout>;
    }

    const handleAnswerSubmit = (e) => {
        e.preventDefault();

        // Validation logic
        const correct = question.correctAnswer[language];

        let isCorrect = false;
        if (Array.isArray(correct)) {
            isCorrect = correct.some(ans => userAnswer.toLowerCase().trim() === ans.toLowerCase().trim());
        } else {
            isCorrect = userAnswer.toLowerCase().trim() === correct.toLowerCase().trim();
        }

        submitAnswer(isCorrect);
    };

    return (
        <Layout>
            <Card className="flex flex-col min-h-[60vh] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/brugis.png')] bg-cover bg-center opacity-70 pointer-events-none" />
                <div className="relative z-10 w-full flex flex-col h-full">
                    <div className="flex justify-between items-center mb-2">
                        <div
                            className="w-[60%] mr-0 font-bold text-[22px] whitespace-pre-line text-white uppercase py-7 px-1 bg-center bg-no-repeat bg-[length:100%_80%] flex items-center justify-center drop-shadow-lg [-webkit-text-stroke:_0.3px_black] [text-shadow:_1px_1px_1px_rgba(0,0,0,0.3)]"
                            style={{ backgroundImage: "url('/images_2/delis_ar_naglam.png')" }}
                        >
                            {language === 'lv' ? 'Jautājums' : 'Question'} {question.id}
                        </div>
                        <div className="flex gap-1">
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className={`p-1 rounded-full transition-colors ${showHint ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}
                            >
                                <Lightbulb />
                            </button>
                            <button
                                onClick={() => setShowFact(!showFact)}
                                className={`p-1 rounded-full transition-colors ${showFact ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}
                            >
                                <Paragraph />
                            </button>
                        </div>
                    </div>

                    <div
                        className="relative flex justify-center items-center py-8 px-8 mb-6 -mx-4 bg-center bg-no-repeat bg-[length:100%_100%]"
                        style={{ backgroundImage: "url('/images_2/papirs_horizontali.png')" }}
                    >
                        <h2 className="text-2xl font-bold text-center leading-relaxed">
                            {question.questionText[language]}
                        </h2>
                    </div>

                    <div className="flex-1 space-y-4">
                        {showHint && (
                            <div
                                className="p-8 text-sm text-black animate-fadeIn bg-center bg-no-repeat bg-[length:100%_100%]"
                                style={{ backgroundImage: "url('/images_2/papirs_horizontali_2.png')" }}
                            >
                                <span className="font-bold block mb-1 text-lg">{language === 'lv' ? 'Padoms:' : 'Hint:'}</span>
                                <span className="text-base font-semibold">{question.hint[language]}</span>
                            </div>
                        )}

                        {showFact && (
                            <div
                                className="p-8 text-sm text-black animate-fadeIn bg-center bg-no-repeat bg-[length:100%_100%]"
                                style={{ backgroundImage: "url('/images_2/papirs_horizontali_2.png')" }}
                            >
                                <span className="font-bold block mb-1 text-lg">{language === 'lv' ? 'Fakts:' : 'Fact:'}</span>
                                <span className="text-base font-semibold" dangerouslySetInnerHTML={{ __html: question.extraInfo[language] }} />
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleAnswerSubmit} className="mt-8">
                        <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder={language === 'lv' ? 'Atbilde' : 'Answer'}
                            className="w-[80%] mx-auto block text-center text-xl italic text-gray-900 py-5 bg-[length:100%_110%] bg-center bg-no-repeat border-none focus:outline-none mb-4"
                            style={{ backgroundImage: "url('/images/Scroll.png')" }}
                        />
                        <button
                            type="submit"
                            disabled={!userAnswer.trim()}
                            className="w-full text-white py-3 text-3xl font-bold font-medieval transition-transform shadow-xl active:scale-95 duration-100 bg-[length:100%_100%] bg-center bg-no-repeat drop-shadow-2xl [-webkit-text-stroke:_0.3px_black] [text-shadow:_2px_2px_2px_rgba(0,0,0,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{ backgroundImage: "url('/images/Delis.png')" }}
                        >
                            {language === 'lv' ? 'Atbildēt' : 'Submit'}
                        </button>
                    </form>
                </div>
            </Card>
        </Layout>
    );
};

export default QuestionDetail;
