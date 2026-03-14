import React, { createContext, useContext, useState, useEffect } from 'react';
import { APP_CONTENT } from '../data/content';

const GameContext = createContext();

const INITIAL_STATE = {
    currentPage: 'language', // Default to language selection
    unlockedRiddleChars: [],
    completedQuestions: [],
    riddleInputs: {},
    hasSeenTutorial: false,
    currentQuestionId: null,
    lastAnswerCorrect: false,
    onboardingComplete: false,
    riddleSolved: false,
    returnPage: null, // Track page to return to from Tutorial
    direction: 'forward', // Track navigation direction for animations
};

// eslint-disable-next-line react-refresh/only-export-components
export const GameProvider = ({ children }) => {
    const [gameState, setGameState] = useState(() => {
        const saved = localStorage.getItem('gameState');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Ensure direction exists in restored state, default to forward
                const state = { ...INITIAL_STATE, ...parsed, direction: 'forward' };
                return state;
            } catch (e) {
                console.error("Failed to parse game state", e);
                return INITIAL_STATE;
            }
        }
        return INITIAL_STATE;
    });

    useEffect(() => {
        localStorage.setItem('gameState', JSON.stringify(gameState));
    }, [gameState]);

    const completeOnboarding = () => {
        setGameState(prev => ({
            ...prev,
            onboardingComplete: true
        }));
    };

    const solveRiddle = () => {
        setGameState(prev => ({
            ...prev,
            riddleSolved: true,
            currentPage: 'victory',
            direction: 'forward'
        }));
    };

    const unlockAllQuestions = () => {
        const allQuestions = Array.from({ length: 30 }, (_, i) => i + 1);
        setGameState(prev => ({
            ...prev,
            completedQuestions: allQuestions,
            lastAnswerCorrect: true
        }));
    };

    const navigateTo = (page, returnTo = null, direction = 'forward') => {
        setGameState(prev => ({
            ...prev,
            currentPage: page,
            returnPage: returnTo,
            direction: direction
        }));
    };

    const completeQuestion = (questionId) => {
        setGameState(prev => {
            if (prev.completedQuestions.includes(questionId)) return prev;
            return {
                ...prev,
                completedQuestions: [...prev.completedQuestions, questionId]
            };
        });
    };

    const updateRiddleInput = (index, char) => {
        setGameState(prev => ({
            ...prev,
            riddleInputs: {
                ...prev.riddleInputs,
                [index]: char
            }
        }));
    };

    const setCurrentQuestion = (id) => {
        setGameState(prev => ({ ...prev, currentQuestionId: id }));
    };

    const submitAnswer = (isCorrect) => {
        setGameState(prev => {
            const newState = {
                ...prev,
                lastAnswerCorrect: isCorrect,
                currentPage: 'result',
                direction: 'forward'
            };

            if (isCorrect && prev.currentQuestionId) {
                if (!prev.completedQuestions.includes(prev.currentQuestionId)) {
                    newState.completedQuestions = [...prev.completedQuestions, prev.currentQuestionId];

                    // Auto-fill riddle inputs from rewards
                    let updatedRiddleInputs = { ...prev.riddleInputs };
                    const question = APP_CONTENT.questions.find(q => q.id === prev.currentQuestionId);

                    if (question && question.reward) {
                        ['lv', 'en'].forEach(lang => {
                            if (question.reward[lang]) {
                                const rewardLines = question.reward[lang].split('\n');
                                rewardLines.forEach(line => {
                                    const match = line.match(/(\d+).*?-\s*(.)/);
                                    if (match) {
                                        const displayNumber = parseInt(match[1], 10);
                                        const char = match[2];
                                        const riddleText = APP_CONTENT.riddle[lang];

                                        let inputCounter = 0;
                                        for (let i = 0; i < riddleText.length; i++) {
                                            if (!' ,.!?\u002D\n'.includes(riddleText[i])) {
                                                inputCounter++;
                                                if (inputCounter === displayNumber) {
                                                    const key = `${lang}-${i}`;
                                                    updatedRiddleInputs[key] = char;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        });
                    }
                    newState.riddleInputs = updatedRiddleInputs;
                }
            }
            return newState;
        });
    };

    const isQuestionCompleted = (id) => gameState.completedQuestions.includes(id);

    const resetApp = () => {
        if (window.confirm("ATIESTATĪT PROTOTIPU / RESET PROTOTYPE\n\nAre you sure you want to reset all progress?")) {
            localStorage.clear();
            setGameState(INITIAL_STATE);
            // Force reload to ensure all contexts (Language) are reset cleanly or handle it via callback?
            // Simplest way to "Redirect to Language Selection" and reset language state is:
            window.location.reload();
        }
    };

    return (
        <GameContext.Provider value={{ gameState, setGameState, navigateTo, completeQuestion, updateRiddleInput, isQuestionCompleted, resetApp, setCurrentQuestion, submitAnswer, completeOnboarding, solveRiddle, unlockAllQuestions }}>
            {children}
        </GameContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGame = () => useContext(GameContext);
