import React from 'react';

const Input = ({ validation, label, placeholder, name, error, register, type, defaultValue }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input
        defaultValue={defaultValue}
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name, validation)}
      />
      <div className="warning">{error?.message}</div>
    </div>
  );
};

export default Input;
