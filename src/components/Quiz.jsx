/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { resultInitalState } from "../Constants";

const Quiz = ({ questions }) => {
  const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
  const [selectedAnsIdx, setSelectedAnsIdx] = useState(null);
  const [activeQsResult, setActiveQsResult] = useState(null);
  const [result, setResult] = useState(resultInitalState);

  const { question, choices, correctAnswer } = questions[currentQuestionNo];

  const handleAnswerSelection = (optionChosen, index) => {
    setSelectedAnsIdx(index);
    optionChosen === correctAnswer
      ? setActiveQsResult(true)
      : setActiveQsResult(false);
  };

  const handleNext = () => {
    setCurrentQuestionNo((currentQuestionNo) => currentQuestionNo + 1);
    setSelectedAnsIdx(null);
  };

  return (
    <div className="quiz-container">
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
                className={selectedAnsIdx === index ? "selected-answer" : null}
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
    </div>
  );
};

export default Quiz;
