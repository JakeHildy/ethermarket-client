import React from 'react';
import ErrorIcon from '../../../assets/icons/error-24px.svg';
import './InputField.scss';

function InputField({ name, label, value, placeholder, onChange, error, type }) {
  return (
    <div className="input-field">
      <label htmlFor={`${name}-${label}`} className="input-field__label">
        {label}
      </label>
      <input
        className={error ? 'input-field__error' : 'input-field__input'}
        name={name}
        id={`${name}-${label}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type || 'text'}
      />
      {error && (
        <div className="error">
          <img src={ErrorIcon} alt="error icon" className="error__icon" />
          <p className="error__message">{error}</p>
        </div>
      )}
    </div>
  );
}

export default InputField;
