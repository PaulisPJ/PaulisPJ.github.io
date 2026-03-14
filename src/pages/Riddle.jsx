import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../context/LanguageContext';
import { APP_CONTENT } from '../data/content';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import Layout from '../components/Layout';

const Riddle = () => {
    const { gameState, updateRiddleInput, solveRiddle, resetApp, unlockAllQuestions } = useGame();
    const { language } = useLanguage();

    // Get the riddle for the current language
    const riddleText = APP_CONTENT.riddle[language] || "";

    const [finalAnswer, setFinalAnswer] = useState("");
    const [feedback, setFeedback] = useState(null);

    const handleInputChange = (globalIndex, value) => {
        // Only allow 1 char
        const char = value.slice(-1); // Allow any case input, we process in check
        const storageKey = `${language}-${globalIndex}`;
        updateRiddleInput(storageKey, char);
    };

    const checkAnswer = () => {
        const trimmedAnswer = finalAnswer.trim();

        // Check for dev cheat code
        if (trimmedAnswer === "1answ-all") {
            unlockAllQuestions();
            // Show toast/feedback - reusing the existing feedback state for updated message
            // Wait, existing feedback is just 'correct'/'incorrect' class logic. 
            // We might want a custom alert or just reuse 'correct' with custom text renderer? 
            // Simpler: just alert() for dev tool or set a temp state. 
            // Let's set a distinct feedback state or modify how feedback is rendered.
            // Actually user request said: show a small temporary message or alert saying "Developer Mode: All questions unlocked."
            alert("Developer Mode: All questions unlocked.");
            return;
        }

        // Check for dev reset code
        if (trimmedAnswer === "1reset1") {
            resetApp();
            return;
        }

        // 1. Check if final answer text is correct
        const correctAnswer = language === 'lv' ? "Bergfrīds" : "Bergfreid";
        const isTextCorrect = finalAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();

        // 2. Also check if the grid is filled correctly (optional but good for consistency)
        // For now, the requirement specifically emphasizes the input window validation.
        // "This page should only be reachable if the user enters the correct riddle answer above."
        // implying the text input. The individual letters are helper for the user.

        if (isTextCorrect) {
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
            setTimeout(() => setFeedback(null), 3000);
        }
    };

    // Helper to identify static characters
    const isPunctuationOrSpace = (char) => {
        return ' ,.!?\u002D'.includes(char);
    };

    // Robust renderer
    const renderRobust = () => {
        const tokens = [];
        let currentToken = { chars: [], type: 'word' };

        // Pre-calculate input numbers (1-based index for actual input fields)
        let inputCounter = 0;
        const inputIndices = {}; // map valid char index -> display number
        for (let i = 0; i < riddleText.length; i++) {
            if (!isPunctuationOrSpace(riddleText[i]) && riddleText[i] !== '\n') {
                inputCounter++;
                inputIndices[i] = inputCounter;
            }
        }

        for (let i = 0; i < riddleText.length; i++) {
            const char = riddleText[i];

            if (char === ' ') {
                if (currentToken.chars.length > 0) {
                    tokens.push(currentToken);
                }
                tokens.push({ chars: [{ char, index: i }], type: 'space' });
                currentToken = { chars: [], type: 'word' };
            } else if (char === '\n') {
                if (currentToken.chars.length > 0) {
                    tokens.push(currentToken);
                }
                tokens.push({ chars: [{ char, index: i }], type: 'break' });
                currentToken = { chars: [], type: 'word' };
            } else {
                currentToken.chars.push({ char, index: i });
            }
        }
        if (currentToken.chars.length > 0) tokens.push(currentToken);

        // Group tokens by lines (split on 'break')
        const lines = [];
        let currentLine = [];
        tokens.forEach(token => {
            if (token.type === 'break') {
                if (currentLine.length > 0) lines.push(currentLine);
                currentLine = [];
            } else {
                currentLine.push(token);
            }
        });
        if (currentLine.length > 0) lines.push(currentLine);

        return (
            <div className="flex flex-col gap-6 w-full max-w-lg mx-auto">
                {lines.map((lineTokens, lineIndex) => (
                    <div key={lineIndex} className="flex flex-wrap justify-center gap-y-6">
                        {lineTokens.map((token, tIndex) => {
                            if (token.type === 'space') {
                                return <div key={tIndex} className="w-2 md:w-4"></div>; // Gap between words
                            }

                            return (
                                <div key={tIndex} className="flex items-end flex-nowrap mx-1 sm:mx-2">
                                    {token.chars.map(({ char, index }) => {
                                        if (isPunctuationOrSpace(char)) {
                                            return (
                                                <span key={index} className={`text-xl font-bold ml-0.5 ${char === '-' ? 'self-center -translate-y-3' : 'mb-2'}`}>
                                                    {char}
                                                </span>
                                            );
                                        }

                                        const storageKey = `${language}-${index}`;
                                        const val = gameState.riddleInputs[storageKey] || '';
                                        const displayNumber = inputIndices[index];

                                        // Define seal configurations
                                        const seal1_numbers = [1, 7, 9, 11, 14, 18, 20, 25, 27, 29, 31, 35, 39, 42, 44, 47, 49];
                                        const seal2_numbers = [2, 4, 6, 8, 13, 15, 17, 21, 24, 26, 30, 33, 36, 38, 40, 41, 45, 48];
                                        const seal3_numbers = [3, 5, 10, 12, 16, 19, 22, 23, 28, 32, 34, 37, 43, 46, 50];

                                        let sealImage = null;
                                        if (seal1_numbers.includes(displayNumber)) {
                                            sealImage = '/images/zimogs_1.png';
                                        } else if (seal2_numbers.includes(displayNumber)) {
                                            sealImage = '/images/zimogs_2.png';
                                        } else if (seal3_numbers.includes(displayNumber)) {
                                            sealImage = '/images/zimogs_3.png';
                                        }

                                        return (
                                            <div key={index} className="flex flex-col items-center gap-1 mx-[1px] sm:mx-[2px]">
                                                <input
                                                    type="text"
                                                    value={val}
                                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                                    className="w-10 h-14 sm:w-10 sm:h-16 bg-[length:100%_90%] bg-center bg-no-repeat border-none text-center font-bold text-xl sm:text-2xl focus:outline-none uppercase p-0 bg-transparent"
                                                    style={{ backgroundImage: "url('/images/mazs_papirs.png')" }}
                                                />
                                                <div className="relative flex items-center justify-center w-10 h-10">
                                                    {sealImage && (
                                                        <div
                                                            className=" absolute inset-0 bg-contain bg-center bg-no-repeat opacity-100"
                                                            style={{ backgroundImage: `url('${sealImage}')` }}
                                                        />
                                                    )}
                                                    <span className="relative z-10 text-m sm:text-base text-black text-center mt-1 font-medieval select-none font-bold [-webkit-text-stroke:_0.4px_white]">
                                                        {displayNumber}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <Layout>
            <Card className="flex flex-col items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/akmens_bruga_siena.png')] bg-cover bg-center opacity-70 pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center w-full">
                    <PageTitle>
                        {language === 'lv' ? 'Mīkla' : 'The riddle'}
                    </PageTitle>

                    <div className="w-full mb-6">
                        {renderRobust()}
                    </div>

                    {/* Final Answer Input */}
                    <div className="w-full mb-4">
                        <input
                            type="text"
                            value={finalAnswer}
                            onChange={(e) => setFinalAnswer(e.target.value)}
                            placeholder={language === 'lv' ? 'Atbilde...' : 'Answer...'}
                            className="w-[90%] mx-auto block py-5 px-3 text-center bg-[length:100%_100%] bg-center bg-no-repeat border-none text-xl italic text-gray-900 focus:outline-none"
                            style={{ backgroundImage: "url('/images/Scroll.png')" }}
                        />
                    </div>

                    {/* Feedback Message */}
                    {feedback && (
                        <div className={`mt-2 mb-4 p-3 rounded-lg font-bold animate-pulse w-full text-center ${feedback === 'correct' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                            }`}>
                            {feedback === 'correct'
                                ? (language === 'lv' ? 'Pareizi!' : 'Correct!')
                                : (language === 'lv' ? 'Nepareizi!' : 'Incorrect!')}
                        </div>
                    )}

                    <div className="w-full">
                        <button
                            onClick={checkAnswer}
                            className="w-full text-white py-3 text-3xl font-bold font-medieval transition-transform shadow-xl active:scale-95 duration-100 bg-[length:100%_100%] bg-center bg-no-repeat drop-shadow-2xl [-webkit-text-stroke:_0.5px_black] [text-shadow:_2px_2px_2px_rgba(0,0,0,0.3)]"
                            style={{ backgroundImage: "url('/images/Delis.png')" }}
                        >
                            {language === 'lv' ? 'Pārbaudīt' : 'Check'}
                        </button>
                        <button
                            onClick={() => updateRiddleInput("hack", "refresh")} // Dummy update to force re-render if needed or just cosmetic
                            className="hidden"
                        />
                    </div>
                </div>
            </Card>
        </Layout>
    );
};

export default Riddle;
