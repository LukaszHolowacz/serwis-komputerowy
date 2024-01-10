import React from 'react';

function FormField({ type, name, placeholder, value, onChange, error }) {
  return (
    <div className="form-field">
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default FormField;
