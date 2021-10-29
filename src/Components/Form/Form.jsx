import React, { memo, useEffect, useRef } from 'react';
import Input from './Input/Input';
import { useForm } from 'react-hook-form';

const Form = ({ inputs, onUnmount, onSubmit }) => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const watchAllFields = watch();
  const val = useRef();
  useEffect(() => {
    val.current = watchAllFields;
  }, [watchAllFields]);
  useEffect(() => {
    return () => {
      if (onUnmount) onUnmount(val.current);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      {inputs &&
        inputs.map((el) => (
          <Input
            key={el.id}
            name={el.name}
            label={el.label}
            placeholder={el.placeholder}
            validation={el.validation}
            register={register}
            error={errors[el.name]}
            type={el.inputType}
            defaultValue={el.defaultValue}
          />
        ))}
      {inputs && (
        <div className="input-block">
          <button type="submit" className="button">
            Submit
          </button>
        </div>
      )}
    </form>
  );
};

export default memo(Form);
