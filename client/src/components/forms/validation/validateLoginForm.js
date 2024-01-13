const validateLoginForm = (formData) => {
    const errors = {};
  
    if (!formData.email.trim()) {
      errors.email = 'Email jest wymagany.';
    } else if (!formData.email.includes('@')) {
      errors.email = 'Email musi zawierać znak @.';
    }
  
    if (!formData.password) {
      errors.password = 'Hasło jest wymagane.';
    } 
  
    return errors;
  };
  
  export default validateLoginForm;
  