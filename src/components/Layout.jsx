import React from 'react';
import { useGame } from '../context/GameContext';



const Layout = ({ children }) => {
    const { gameState, navigateTo } = useGame();

    const showHeader = gameState.currentPage !== 'language' && gameState.currentPage !== 'menu' && gameState.currentPage !== 'access_code' && gameState.currentPage !== 'victory';

    return (
        <div
            className="min-h-[100dvh] w-full flex flex-col items-center p-4"
        >
            <div className="w-full max-w-md relative my-auto">
                {showHeader && (
                    <div className="flex justify-between items-center mb-4 px-2">
                        {!(gameState.currentPage === 'tutorial' && !gameState.onboardingComplete) ? (
                            <button
                                onClick={() => {
                                    if (gameState.currentPage === 'question_detail' || gameState.currentPage === 'result') {
                                        navigateTo('questions', null, 'backward');
                                    } else if (gameState.currentPage === 'story' && !gameState.onboardingComplete) {
                                        navigateTo('language', null, 'backward');
                                    } else if (gameState.currentPage === 'tutorial') {
                                        navigateTo(gameState.returnPage || 'menu', null, 'backward');
                                    } else {
                                        navigateTo('menu', null, 'backward');
                                    }
                                }}
                            >
                                <img
                                    src="/images/bulta_simbols.png"
                                    alt="Back"
                                    className="w-12 h-12 object-contain"
                                />
                            </button>
                        ) : (
                            <div className="w-12 h-12" />
                        )}

                        <img
                            src="/images/TMR_logo_pilnais_cutout.png"
                            alt="TMR Logo"
                            className="h-12 w-auto object-contain mx-4"
                        />

                        {gameState.currentPage !== 'tutorial' && !(gameState.currentPage === 'story' && !gameState.onboardingComplete) ? (
                            <button
                                onClick={() => {
                                    // If currently on a question or result, we want to return there (or to question list/detail)
                                    // Actually, if on result, maybe better to return to question list? But user requirement was "from any question".
                                    // Let's check current page.
                                    const current = gameState.currentPage;
                                    const returnTo = (current === 'question_detail' || current === 'result')
                                        ? current
                                        : 'menu';
                                    navigateTo('tutorial', returnTo, 'forward');
                                }}
                            >
                                <img
                                    src="/images/jautajumzime_simbols.png"
                                    alt="Help"
                                    className="w-12 h-12 object-contain"
                                />
                            </button>
                        ) : (
                            <div className="w-12 h-12" />
                        )}
                    </div>
                )}
                {children}
            </div>
        </div >
    );
};

export default Layout;
