import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { deleteContact, editContact } from '../../../redux/reducers';
import Close from '../../Close/Close';
import Edit from '../../Edit/Edit';
import Submit from '../../Submit/Submit';
import './Contact.css';

export default function Contact({ name, number, desc, id }) {
  const bool = name === '' && number === '' && desc === '';
  const [editMode, setEditMode] = useState(bool);
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const watchAllFiels = watch();

  const toggleEditMode = () => {
    setEditMode((bool) => !bool);
  };
  const onSubmit = (data) => {
    dispatch(editContact(id, data));
    setEditMode(false);
  };
  const onDelete = () => {
    dispatch(deleteContact(id));
  };
  return (
    <>
      {(!editMode && (
        <>
          <div className="contact">
            <div className="contact__info">
              <div className="contact__fullname">{watchAllFiels.name || name}</div>
              <div className="contact__number">{watchAllFiels.number || number}</div>
              <div className="contact__desc">{watchAllFiels.desc || desc}</div>
            </div>
            <div className="contact__button">
              <Edit onClick={toggleEditMode} />
              <Close onClick={onDelete} />
            </div>
          </div>
        </>
      )) || (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="contact">
            <div className="contact__info">
              <input
                placeholder="Name..."
                className="small fullname"
                defaultValue={name}
                type="text"
                {...register('name')}
              />
              <input
                placeholder="Number..."
                className="small number"
                defaultValue={number}
                type="text"
                {...register('number')}
              />
              <input
                placeholder="Descriprtion..."
                className="small desc"
                defaultValue={desc}
                type="text"
                {...register('desc')}
              />
            </div>
            <button className="contact__button" type="submit">
              <Submit />
            </button>
          </form>
        </>
      )}
    </>
  );
}
