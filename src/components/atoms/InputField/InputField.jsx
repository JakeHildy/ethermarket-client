import React from 'react';
import ErrorIcon from '../../../assets/icons/error-24px.svg';
import './InputField.scss';

function InputField({ label, value, placeholder, onChange, error }) {
  return (
    <div className="input-field">
      <label htmlFor="input" className="input-field__label">
        {label}
      </label>
      <input
        className={error ? 'input-field__error' : 'input-field__input'}
        name="input"
        id="input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && (
        <div className="error-2">
          <img src={ErrorIcon} alt="error icon" className="error-2__icon" />
          <p className="error-2__message">{error}</p>
        </div>
      )}
    </div>
  );
}

export default InputField;
