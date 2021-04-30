import React from 'react';
import ErrorIcon from '../../../assets/icons/error-24px.svg';
import './DropDownField.scss';

function DropDownField({ name, label, options, value, onChange, error }) {
  return (
    <div className="drop-down-field">
      <label htmlFor="dropdown" className="drop-down-field__label">
        {label}
      </label>
      <select
        className={error ? 'drop-down-field__error' : 'drop-down-field__input'}
        name={name}
        id="dropdown"
        value={value || 'Please select'}
        onChange={onChange}
        placeholder="Please Select"
      >
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      {error && (
        <div className="error">
          <img src={ErrorIcon} alt="error icon" className="error__icon" />
          <p className="error__message">{error}</p>
        </div>
      )}
    </div>
  );
}

export default DropDownField;
