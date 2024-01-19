import React from 'react';
import data from '../../../assets/json/questions.json';
import { renderInputField } from './QuestionInput';

const additionalQuestionsData = data.questions.filter(question => !question.required);

export const AdditionalQuestions = ({ selectedAdditionalQuestions, setSelectedAdditionalQuestions, additionalComments, setAdditionalComments, answers, handleChange }) => {
    const handleCheckboxChange = (questionId, isChecked) => {
        if (isChecked) {
            setSelectedAdditionalQuestions(prevQuestions => [...prevQuestions, questionId]);
        } else {
            setSelectedAdditionalQuestions(prevQuestions => prevQuestions.filter(id => id !== questionId));
        }
    };

    const handleAdditionalCommentsChange = (e) => {
        setAdditionalComments(e.target.value);
    };

    return (
        <>
            <h2>Dodatkowe pytania</h2>
            <div className='mb-3'>
                {additionalQuestionsData.map(question => (
                    <div key={question.id}>
                        <input 
                            type="checkbox" 
                            id={`checkbox-${question.id}`}
                            onChange={(e) => handleCheckboxChange(question.id, e.target.checked)} 
                            checked={selectedAdditionalQuestions.includes(question.id)}
                        />
                        <label htmlFor={`checkbox-${question.id}`}>{question.short_question || question.question}</label>
                    </div>
                ))}
            </div>
            <table className='table mb-3'>
                <tbody className='align-middle'>
                    {selectedAdditionalQuestions.map(questionId => {
                        const question = additionalQuestionsData.find(q => q.id === questionId);
                        if (!question) return null;

                        return (
                            <tr className='border-bottom border-top' key={question.id}>
                                <td>{question.question}</td>
                                <td>
                                    {renderInputField(question, answers, handleChange)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="additional-comments">
                <textarea
                    className='form-control w-100 mb-3'
                    placeholder="Dodatkowe uwagi"
                    value={additionalComments}
                    onChange={handleAdditionalCommentsChange}
                    maxLength={500}
                />
            </div>
        </>
    );
};
