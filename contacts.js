const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.join('./db/contacts.json');

function listContacts() {
  return fs
    .readFile(contactsPath)
    .then(data => console.table(JSON.parse(data)))
    .catch(err => console.log(err.message));
}

function getContactById(contactId) {
  return fs
    .readFile(contactsPath)
    .then(data => {
      const contacts = JSON.parse(data);

      return console.table(contacts.find(({ id }) => id === contactId));
    })
    .catch(err => console.log(err.message));
}

function removeContact(contactId) {
  return fs
    .readFile(contactsPath)
    .then(data => {
      const contactsList = JSON.parse(data);

      const newContactsList = [
        ...contactsList.filter(({ id }) => id !== contactId)
      ];

      fs.writeFile(
        contactsPath,
        JSON.stringify(newContactsList, null, '\t'),
        'utf8'
      );

      console.table(newContactsList);
      return console.table(`Сontact remove`);
    })
    .catch(err => console.log(err.message));
}

function addContact(name, email, phone) {
  const newContact = {
    id: shortid.generate(),
    name,
    email,
    phone
  };

  return fs
    .readFile(contactsPath)
    .then(data => {
      const contactsList = JSON.parse(data);

      const newContactsList = [...contactsList, newContact];

      fs.writeFile(
        contactsPath,
        JSON.stringify(newContactsList, null, '\t'),
        'utf8'
      );

      console.table(newContactsList);
      return console.table(`Сontact added`);
    })
    .catch(err => console.log(err.message));
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact
};
