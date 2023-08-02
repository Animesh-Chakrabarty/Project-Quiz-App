/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { resultInitalState } from "../Constants";

const Quiz = ({ questions }) => {
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
  const [selectedAnsIdx, setSelectedAnsIdx] = useState(null);
  const [activeQsResult, setActiveQsResult] = useState(null);
  const [result, setResult] = useState(resultInitalState);
  const [showResult, setShowResult] = useState(false);

  const { question, choices, correctAnswer } = questions[currentQuestionNo];

  const handleAnswerSelection = (optionChosen, index) => {
    setSelectedAnsIdx(index);
    optionChosen === correctAnswer
      ? setActiveQsResult(true)
      : setActiveQsResult(false);
  };

  const handleNext = () => {
    setSelectedAnsIdx(null);
    setResult((prev) =>
      activeQsResult
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    console.log(currentQuestionNo);
    currentQuestionNo !== questions.length - 1
      ? setCurrentQuestionNo((prev) => prev + 1)
      : (setCurrentQuestionNo(0), setShowResult(true));
    // console.log(result);
  };

  const handleTryAgain = () => {
    setResult(resultInitalState);
    setShowResult(false);
  };

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="result">
          <h2>Result</h2>
          <p>
            Total Questions : <span>{questions.length}</span>
          </p>
          <p>
            Score : <span>{result.score}</span>
          </p>
          <p>
            Correct Answers : <span>{result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers : <span>{result.wrongAnswers}</span>
          </p>
          <button onClick={handleTryAgain}>Try Again</button>
        </div>
      ) : (
        <>
          <span className="active-question-no">{currentQuestionNo + 1}</span>
          <span className="total-question">/{questions.length}</span>
          <h2>{question}</h2>
          <ul>
            {choices.map((option, index) => {
              return (
                <li
                  key={index}
                  onClick={() => handleAnswerSelection(option, index)}
                  className={
                    selectedAnsIdx === index ? "selected-answer" : null
                  }
                >
                  {option}
                </li>
              );
            })}
          </ul>
          <div className="footer">
            <button onClick={handleNext} disabled={selectedAnsIdx === null}>
              {currentQuestionNo === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
