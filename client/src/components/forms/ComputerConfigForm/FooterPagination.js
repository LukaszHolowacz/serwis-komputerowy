import React from 'react';

const FooterPagination = ({ questionsData, currentQuestionIndex, setCurrentQuestionIndex }) => {
  return (
    <div className="card-footer">
      <div className="d-flex justify-content-center">
        {questionsData.concat({}).map((question, index) => (
          <button
            key={question.id || 'additional'}
            className={`btn btn-sm ${currentQuestionIndex === index ? 'btn-info' : 'btn-outline-secondary'}`}
            onClick={() => setCurrentQuestionIndex(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FooterPagination;
