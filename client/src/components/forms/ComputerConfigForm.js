import React, { useState } from 'react';
import data from '../../assets/json/questions.json';

const requiredQuestionsData = data.questions.filter(question => question.required);
const additionalQuestionsData = data.questions.filter(question => !question.required);

function ComputerConfigForm() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedAdditionalQuestions, setSelectedAdditionalQuestions] = useState([]);

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

    const renderQuestion = (question) => {
        return <p>{question.question}</p>; // Wyświetlenie samego pytania
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
                {renderQuestion(question)} {/* Wywołanie funkcji renderującej pytanie */}
                {renderInputField(question)} {/* Wywołanie funkcji renderującej pole wejściowe */}
            </div>
        );
    };
    

    const isLastQuestion = currentQuestionIndex === requiredQuestionsData.length - 1;
    const isAdditionalQuestionsView = currentQuestionIndex === requiredQuestionsData.length;

    return (
        <div className='computer-config-form'>
            {isAdditionalQuestionsView ? (
                <>
                    <h2>Dodatkowe pytania</h2>
                    <select multiple onChange={handleAdditionalQuestionChange}>
                        {additionalQuestionsData.map(question => (
                            <option key={question.id} value={question.id}>{question.short_question || question.question}</option>
                        ))}
                    </select>
                    <table>
                        {selectedAdditionalQuestions.map(questionId => {
                            const question = additionalQuestionsData.find(q => q.id.toString() === questionId);
                            return (
                                <tr key={question.id}>
                                    <td>{question.question}</td>
                                    <td>{renderInputField(question)}</td>
                                </tr>
                            );
                        })}
                    </table>
                </>
            ) : (
                <div className='question'>
                    {renderQuestionInput(requiredQuestionsData[currentQuestionIndex])}
                </div>
            )}

            <div className="navigation-bar">
                {requiredQuestionsData.concat({}).map((question, index) => (
                    <button
                        key={question.id || 'additional'}
                        onClick={() => setCurrentQuestionIndex(index)}
                        style={{ backgroundColor: currentQuestionIndex === index ? 'blue' : 'grey' }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            
            <div className='nav-buttons'>
                {currentQuestionIndex > 0 && <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>Wstecz</button>}
                {!isAdditionalQuestionsView && <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Następne pytanie</button>}
                {isAdditionalQuestionsView && <button onClick={handleFinish}>Zakończ</button>}
            </div>
        </div>
    );
}

export default ComputerConfigForm;
