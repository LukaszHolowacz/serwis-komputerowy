import React, { useState } from 'react';
import { QuestionInput } from './QuestionInput';
import { AdditionalQuestions } from './AdditionalQuestions';
import { Pagination } from './Pagination';
import FooterPagination from './FooterPagination';
import data from '../../../assets/json/questions.json';
import 'bootstrap/dist/css/bootstrap.min.css';

const requiredQuestionsData = data.questions.filter(question => question.required);

function ComputerConfigForm() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [selectedAdditionalQuestions, setSelectedAdditionalQuestions] = useState([]);
    const [additionalComments, setAdditionalComments] = useState('');

    const isLastQuestion = currentQuestionIndex === requiredQuestionsData.length - 1;
    const isAdditionalQuestionsView = currentQuestionIndex === requiredQuestionsData.length;

    const handleChange = (questionId, answer) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    };

    const handleFinish = () => {
        console.log(answers);
    };

    return (
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            {isAdditionalQuestionsView ? (
                                <AdditionalQuestions
                                    selectedAdditionalQuestions={selectedAdditionalQuestions}
                                    setSelectedAdditionalQuestions={setSelectedAdditionalQuestions}
                                    additionalComments={additionalComments}
                                    setAdditionalComments={setAdditionalComments}
                                    answers={answers}
                                    handleChange={handleChange}
                                />
                            ) : (
                                <QuestionInput
                                    question={requiredQuestionsData[currentQuestionIndex]}
                                    answers={answers}
                                    handleChange={handleChange}
                                />
                            )}
                            <Pagination 
                                currentQuestionIndex={currentQuestionIndex}
                                setCurrentQuestionIndex={setCurrentQuestionIndex}
                                isLastQuestion={isLastQuestion}
                                isAdditionalQuestionsView={isAdditionalQuestionsView}
                                handleFinish={handleFinish}
                                questionsData={requiredQuestionsData}
                            />
                        </div>
                        <FooterPagination 
                            questionsData={requiredQuestionsData} 
                            currentQuestionIndex={currentQuestionIndex}
                            setCurrentQuestionIndex={setCurrentQuestionIndex} 
                        />
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComputerConfigForm;
