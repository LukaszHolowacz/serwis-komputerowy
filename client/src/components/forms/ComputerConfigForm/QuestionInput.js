import React from 'react';

export const renderInputField = (question, answers, handleChange) => {
    const value = answers[question.id] || '';
    switch (question.fieldType) {
        case 'numeric':
        case 'text':
            return (
                <input
                    className="form-control"
                    type={question.fieldType === 'numeric' ? 'number' : 'text'}
                    value={value}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                />
            );
        case 'dropdown':
            return (
                <select
                    className="form-select"
                    value={value}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                >
                    {question.options.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            );
        default:
            return null;
    }
};

export const QuestionInput = ({ question, answers, handleChange }) => {
    return (
        <div className="mb-3">
            <p>{question.question}</p>
            {renderInputField(question, answers, handleChange)}
        </div>
    );
};
