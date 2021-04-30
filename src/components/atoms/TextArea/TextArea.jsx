import React from 'react';
import errorIcon from '../../../assets/icons/error-24px.svg';
import './TextArea.scss';

function TextArea({ name, label, value, placeholder, onChange, error }) {
  return (
    <div className="text-area">
      <label htmlFor="item" className="text-area__label">
        {label}
      </label>
      <textarea
        className={error ? 'text-area__error' : 'text-area__input'}
        name={name}
        id="item"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && (
        <div className="error-2">
          <img src={errorIcon} alt="error icon" className="error-2__icon" />
          <p className="error-2__message">{error}</p>
        </div>
      )}
    </div>
  );
}

export default TextArea;
