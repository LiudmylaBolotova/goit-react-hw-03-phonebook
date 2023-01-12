import React, { Component } from 'react';

import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Container, Title } from './App.styled';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
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

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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
