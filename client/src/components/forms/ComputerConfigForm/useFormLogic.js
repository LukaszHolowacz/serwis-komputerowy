import { useState, useCallback } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const useFormLogic = (initialData, onSubmitUrl, token) => {
    const [answers, setAnswers] = useState(initialData);
    const [selectedAdditionalQuestions, setSelectedAdditionalQuestions] = useState([]);
    const [additionalComments, setAdditionalComments] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 

    const handleChange = useCallback((questionId, answer) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    }, []);

    const handleFinish = useCallback(() => {
        if (answers[1] === '0' || answers[1] === '') {
            alert("Musisz podać swój budżet!");
            return;
        }

        const postData = {
            userId: token ? jwtDecode(token).userId : null,
            answers,
            additionalComments
        };

        axios.post(onSubmitUrl, postData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Wystąpił błąd przy wysyłaniu danych:', error);
            });
    }, [answers, additionalComments, token, onSubmitUrl]);

    return {
        answers,
        selectedAdditionalQuestions,
        setSelectedAdditionalQuestions,
        additionalComments,
        setAdditionalComments,
        handleChange,
        handleFinish,
        currentQuestionIndex, 
        setCurrentQuestionIndex, 
    };
};

export default useFormLogic;
