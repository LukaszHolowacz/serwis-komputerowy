import React from 'react';

// Eksportujemy renderInputField jako named export, aby można było go użyć w innych komponentach
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

// Komponent QuestionInput korzysta teraz z wyeksportowanej funkcji renderInputField
export const QuestionInput = ({ question, answers, handleChange }) => {
    return (
        <div className="mb-3">
            <p>{question.question}</p>
            {renderInputField(question, answers, handleChange)}
        </div>
    );
};
