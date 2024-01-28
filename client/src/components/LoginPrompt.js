import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const LoginPrompt = () => {
    const navigate = useNavigate(); 

    const handleLoginRedirect = () => {
        navigate('/login'); 
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="alert alert-info" role="alert">
                        <h4 className="alert-heading">Aby przejść dalej, należy się zalogować</h4>
                        <p>Aby uzyskać dostęp do tej części aplikacji, musisz być zalogowany. Kliknij poniższy przycisk, aby przejść do strony logowania.</p>
                        <hr />
                        <button className="btn btn-primary" onClick={handleLoginRedirect}>Przejdź do logowania</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPrompt;
