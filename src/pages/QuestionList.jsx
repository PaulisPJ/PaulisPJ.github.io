import React from 'react';
import { useGame } from '../context/GameContext';
import { APP_CONTENT } from '../data/content';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import Layout from '../components/Layout';
import { useLanguage } from '../context/LanguageContext';

const QuestionList = () => {
    const { navigateTo, isQuestionCompleted, setCurrentQuestion, submitAnswer } = useGame();
    const { language } = useLanguage();

    // Sort questions by ID just in case and limit to 22
    const questions = APP_CONTENT.questions.sort((a, b) => a.id - b.id).slice(0, 22);

    return (
        <Layout>
            <Card className="flex flex-col items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/Akmens_siena.png')] bg-cover bg-center opacity-80 pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center w-full">
                    <PageTitle>
                        {language === 'lv' ? 'Jautājumi' : 'Questions'}
                    </PageTitle>

                    <div className="grid grid-cols-3 gap-4 w-full">
                        {questions.map((q) => {
                            const isCompleted = isQuestionCompleted(q.id);
                            return (
                                <button
                                    key={q.id}
                                    onClick={() => {
                                        setCurrentQuestion(q.id);
                                        if (isCompleted) {
                                            // If already completed, go to result screen with success state
                                            submitAnswer(true);
                                        } else {
                                            navigateTo('question_detail');
                                        }
                                    }}
                                    className={`
                  aspect-square flex items-center justify-center text-2xl font-bold rounded-lg border-2 shadow-sm transition-all
                  ${isCompleted
                                            ? 'bg-green-500 border-green-600 text-white'
                                            : 'bg-white border-black text-black hover:bg-gray-50'
                                        }
                `}
                                >
                                    {q.id}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </Card>
        </Layout>
    );
};

export default QuestionList;
