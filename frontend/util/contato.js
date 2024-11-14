function saveContacts(contact) {
    let storedContact = getContacts();

    if (!storedContact) {
        storedContact = {};
    }

    storedContact[contact.id] = contact;        

    sessionStorage.setItem("contacts", JSON.stringify(storedContact));
}

function getContacts() {
    return JSON.parse(sessionStorage.getItem("contacts"));
}