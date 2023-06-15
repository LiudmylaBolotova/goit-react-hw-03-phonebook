import React from 'react';
import propTypes from 'prop-types';
import { InputForm } from '../ContactForm/ContactForm.styled';

export const Filter = ({ onChangeFilter, filter }) => {
  return (
    <>
      <InputForm type="text" value={filter} onChange={onChangeFilter} />
    </>
  );
};

Filter.propTypes = {
  onChangeFilter: propTypes.func.isRequired,
  filter: propTypes.string.isRequired,
};
