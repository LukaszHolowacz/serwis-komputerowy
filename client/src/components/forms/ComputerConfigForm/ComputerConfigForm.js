import React, { useState } from 'react';
import { QuestionInput } from './QuestionInput';
import { AdditionalQuestions } from './AdditionalQuestions';
import { Pagination } from './Pagination';
import FooterPagination from './FooterPagination';
import data from '../../../assets/json/questions.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFormLogic from './useFormLogic';
import LoginPrompt from '../../LoginPrompt';

function ComputerConfigForm() {

    const requiredQuestionsData = data.questions.filter(question => question.required);
    const defaultAnswers = requiredQuestionsData.reduce((acc, question) => {
        acc[question.id] = question.options ? question.options[0] : '';
        return acc;
    }, {});

    const token = localStorage.getItem('token');
    const submitUrl = 'http://localhost:3001/pc-form-register';

    const {
        answers,
        selectedAdditionalQuestions,
        setSelectedAdditionalQuestions,
        additionalComments,
        setAdditionalComments,
        handleChange,
        handleFinish,
        currentQuestionIndex, 
        setCurrentQuestionIndex, 
    } = useFormLogic(defaultAnswers, submitUrl, token);

    const isLastQuestion = currentQuestionIndex === requiredQuestionsData.length - 1;
    const isAdditionalQuestionsView = currentQuestionIndex === requiredQuestionsData.length;

    if (!token) {
        return <LoginPrompt />;
    }

    console.log("currentQuestionIndex:", currentQuestionIndex, "isAdditionalQuestionsView:", isAdditionalQuestionsView);


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
