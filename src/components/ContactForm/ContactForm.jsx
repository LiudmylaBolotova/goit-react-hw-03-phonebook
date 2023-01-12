import React, { Component } from 'react';
import propTypes from 'prop-types';
import { BtnForm, Form, InputForm, TitleForm } from './ContactForm.styled';

const initialState = {
  name: '',
  number: '',
};
export class ContactForm extends Component {
  state = {
    name: ' ',
    number: ' ',
  };

  handleChangeInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmitForm = event => {
    event.preventDefault();

    this.props.formSubmitHandler(this.state);
    this.reset();
  };

  reset = () => {
    this.setState(initialState);
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmitForm}>
          <TitleForm>Name</TitleForm>
          <label>
            <InputForm
              type="text"
              name="name"
              value={this.state.name.trim()}
              onChange={this.handleChangeInput}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <TitleForm>Number</TitleForm>
          <label>
            <InputForm
              type="tel"
              name="number"
              value={this.state.number.trim()}
              onChange={this.handleChangeInput}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <BtnForm type="submit">Add contact</BtnForm>
        </Form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  formSubmitHandler: propTypes.func.isRequired,
};
