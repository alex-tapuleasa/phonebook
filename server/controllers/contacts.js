const Contact = require("../models/contact");
const User = require("../models/user");

module.exports.index = async (req, res) => {
    const user = await User.findById(req.params.id).populate("contacts")
    res.send(user.contacts)
}

module.exports.createContact = async (req, res) => {
    const user = await User.findById(req.params.id)
    const newContact = new Contact({...req.body})
    newContact.contactOwner = req.user._id
    user.contacts.push(newContact)
    user.populate({
        path: "contacts"
    })
    await user.save()
    newContact.populate("contactOwner")
    await newContact.save()
    res.send(newContact)
}

module.exports.showContact = async (req, res) => {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId)
    res.send(contact)
}

module.exports.editContact = async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(req.params.contactId, {...req.body})
    // await contact.save()
    res.send(contact)
}

module.exports.deleteContact = async (req, res) => {
    const { id, contactId } = req.params;
    const user = await User.findByIdAndUpdate(id, {$pull: {contacts: contactId}})
    await Contact.findByIdAndDelete(contactId)
    res.send(user.contacts)
}