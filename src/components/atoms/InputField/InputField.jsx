import React from 'react';
import ErrorIcon from '../../../assets/icons/error-24px.svg';
import './InputField.scss';

function InputField({ name, label, value, placeholder, onChange, error }) {
  return (
    <div className="input-field">
      <label htmlFor="input" className="input-field__label">
        {label}
      </label>
      <input
        className={error ? 'input-field__error' : 'input-field__input'}
        name={name}
        id="input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
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
