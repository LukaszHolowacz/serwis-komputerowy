import React from 'react';

export const Pagination = ({ currentQuestionIndex, setCurrentQuestionIndex, isLastQuestion, isAdditionalQuestionsView, handleFinish, questionsData }) => {
    return (
        <div className="d-flex justify-content-between mb-3">
            <div>
                {currentQuestionIndex > 0 && (
                    <button className="btn btn-secondary" onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
                        Wstecz
                    </button>
                )}
            </div>
            <div>
                {!isAdditionalQuestionsView && (
                    <button className="btn btn-primary" onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                        Następne pytanie
                    </button>
                )}
                {isAdditionalQuestionsView && (
                    <button className="btn btn-success" onClick={handleFinish}>
                        Zakończ
                    </button>
                )}
            </div>
        </div>
    );
};
