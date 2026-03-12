<GameContext.Provider value={{
  gameState,
  setGameState,
  navigateTo,
  completeQuestion,
  updateRiddleInput,
  isQuestionCompleted,
  resetApp,
  setCurrentQuestion,
  submitAnswer,
  grantAccess,
  completeOnboarding,
  solveRiddle,
  unlockAllQuestions,
}}>
  {children}
</GameContext.Provider>