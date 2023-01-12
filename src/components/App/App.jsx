import React, { Component } from 'react';

import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Container, Title } from './App.styled';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = ({ name, number }) => {
    const newContact = {
      id: nanoid(7),
      name,
      number,
    };

    const findName = this.state.contacts
      .map(contact => contact.name.toLowerCase())
      .some(item => item.includes(newContact.name.toLowerCase().trim()));

    if (findName) {
      return alert(`${newContact.name} is already in contacts!`);
    } else {
      this.setState(prevState => {
        return {
          contacts: [newContact, ...prevState.contacts],
        };
      });
    }
  };

  onDelete = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  onChangeFilter = event => {
    const value = event.target.value;
    this.setState({
      filter: value,
    });
    const findContact = this.state.contacts.filter(contact =>
      contact.name
        .toLocaleLowerCase()
        .includes(this.state.filter.toLocaleLowerCase())
    );
    if (findContact) {
      this.setState({
        contacts: findContact,
      });
    }
  };

  render() {
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm formSubmitHandler={this.formSubmitHandler} />

        <Title>Contacts</Title>
        <Filter
          onChangeFilter={this.onChangeFilter}
          filter={this.state.filter}
        />
        <ContactList contacts={this.state.contacts} onDelete={this.onDelete} />
      </Container>
    );
  }
}
