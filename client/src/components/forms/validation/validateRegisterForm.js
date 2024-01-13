const validateRegisterForm = (formData) => {
    const errors = {};
    if (!formData.firstName.trim()) {
      errors.firstName = 'Imię jest wymagane.';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Nazwisko jest wymagane.';
    }
    if (!formData.email.includes('@')) {
      errors.email = 'Email musi zawierać znak @.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email jest wymagany.';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Numer telefonu jest wymagany.';
    } 
    else if (!/^\d+$/.test(formData.phone)) {
      errors.phone = 'Numer telefonu powinien zawierać tylko cyfry.';
    }

    if (!formData.password) {
      errors.password = 'Hasło jest wymagane.';
    }
    else if (formData.password.length < 8){
      errors.password = 'Hasło musi zawierać co najmniej 8 znaków.';
    } 

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Potwierdzenie hasła jest wymagane.';
    }
    else if (formData.password !== formData.confirmPassword){
      errors.confirmPassword = 'Hasła nie są takie same.';
    }
    return errors;
};

export default validateRegisterForm;