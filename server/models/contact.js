const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user")

const contactSchema = new Schema({
    name: {
        type: String,
        required:[true, "Please provide a contact name!"],
        unique:[true, "Contact name should be unique!"],
    },
    phone: {
        type: String,
        required:[true, "Please provide a phone number!"],
        unique:[true, "Phone number should be unique!"],
    },
    email: {
        type: String,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email!'],
        unique: [true, "Email already used!"],
    },
    city: {
        type: String
    },
    contactOwner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}) 

module.exports = mongoose.model("Contact", contactSchema);