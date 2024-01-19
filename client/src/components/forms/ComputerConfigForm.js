import React, { useState } from 'react';
import data from '../../assets/json/questions.json';
import 'bootstrap/dist/css/bootstrap.min.css';

const requiredQuestionsData = data.questions.filter(question => question.required);
const additionalQuestionsData = data.questions.filter(question => !question.required);

function ComputerConfigForm() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedAdditionalQuestions, setSelectedAdditionalQuestions] = useState([]);
    const [additionalComments, setAdditionalComments] = useState('');

    const handleAdditionalCommentsChange = (e) => {
        setAdditionalComments(e.target.value);
    };

    const handleChange = (questionId, answer) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    };

    const handleFinish = () => {
        console.log(answers);
    };

    const handleAdditionalQuestionChange = (event) => {
        setSelectedAdditionalQuestions(Array.from(event.target.selectedOptions, option => option.value));
    };

    const handleCheckboxChange = (questionId, isChecked) => {
        if (isChecked) {
            setSelectedAdditionalQuestions(prevQuestions => [...prevQuestions, questionId]);
        } else {
            setSelectedAdditionalQuestions(prevQuestions => prevQuestions.filter(id => id !== questionId));
        }
    };

    const renderQuestion = (question) => {
        return <p>{question.question}</p>; 
    };
    
    const renderInputField = (question) => {
        const value = answers[question.id] || '';
        switch (question.fieldType) {
            case 'numeric':
                return (
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => handleChange(question.id, e.target.value)}
                    />
                );
            case 'dropdown':
                return (
                    <select
                        value={value}
                        onChange={(e) => handleChange(question.id, e.target.value)}
                    >
                        {question.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                );
            case 'text':
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(question.id, e.target.value)}
                    />
                );
            // Dodaj obsługę innych typów pól, jeśli są wymagane
            default:
                return null;
        }
    };
    
    const renderQuestionInput = (question) => {
        return (
            <div className="question-item">
                {renderQuestion(question)} 
                {renderInputField(question)} 
            </div>
        );
    };
    

    const isLastQuestion = currentQuestionIndex === requiredQuestionsData.length - 1;
    const isAdditionalQuestionsView = currentQuestionIndex === requiredQuestionsData.length;

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            {isAdditionalQuestionsView ? (
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
                                                if (!question) return null; // Dodane zabezpieczenie

                                                return (
                                                    <tr className='border-bottom border-top' key={question.id}>
                                                        <td>{question.question}</td>
                                                        <td >{renderInputField(question)}</td>
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
                            ) : (
                                <div className='mb-3'>
                                    {renderQuestionInput(requiredQuestionsData[currentQuestionIndex])}
                                </div>
                            )}

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
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center">
                                {requiredQuestionsData.concat({}).map((question, index) => (
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComputerConfigForm;
