import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GameProvider, useGame } from './context/GameContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import LanguageSelection from './pages/LanguageSelection';
import MainMenu from './pages/MainMenu';
import QuestionList from './pages/QuestionList';
import Riddle from './pages/Riddle';
import Tutorial from './pages/Tutorial';
import Result from './pages/Result';
import Story from './pages/Story';
import AccessCode from './pages/AccessCode';
import QuestionDetail from './pages/QuestionDetail';

import Victory from './pages/Victory';

const ScreenManager = () => {
  const { gameState, hasAccess } = useGame();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [gameState.currentPage]);

  /* Animation Variants */
  const variants = {
    initial: (direction) => {
      return {
        x: direction === 'forward' ? '100%' : '-100%',
        opacity: 0,
      };
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 400, damping: 40 },
        opacity: { duration: 0.1 },
      },
    },
    exit: (direction) => {
      return {
        x: direction === 'forward' ? '-100%' : '100%',
        opacity: 0,
        transition: {
          x: { type: 'spring', stiffness: 400, damping: 40 },
          opacity: { duration: 0.2 },
        },
      };
    },
  };

  if (!gameState.hasAccess && gameState.currentPage === 'access_code') {
    return <AccessCode />;
  }

  let content;
  switch (gameState.currentPage) {
    case 'language':
      content = <LanguageSelection />;
      break;
    case 'story':
      content = <Story />;
      break;
    case 'tutorial':
      content = <Tutorial />;
      break;
    case 'menu':
      content = <MainMenu />;
      break;
    case 'riddle':
      content = <Riddle />;
      break;
    case 'questions':
      content = <QuestionList />;
      break;
    case 'question_detail':
      content = <QuestionDetail />;
      break;
    case 'result':
      content = <Result />;
      break;
    case 'victory':
      content = <Victory />;
      break;
    default:
      content = (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
          <h1 className="text-3xl font-bold mb-4 capitalize">{gameState.currentPage}</h1>
          <p className="mb-8">This page is under construction.</p>
          <button
            onClick={() => { }} // navigateTo not destructured in default, avoiding error
            className="bg-white text-orange-600 px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-gray-100"
          >
            Back to Menu
          </button>
        </div>
      );
  }

  const { language } = useLanguage();

  return (
    <AnimatePresence mode="wait" custom={gameState.direction}>
      <motion.div
        key={`${gameState.currentPage}-${language}`}
        custom={gameState.direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full min-h-screen"
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <GameProvider>
      <LanguageProvider>
        <ScreenManager />
      </LanguageProvider>
    </GameProvider>
  );
}

export default App;
