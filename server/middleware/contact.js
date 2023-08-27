const Contact = require('../models/contact');
const ExpressError = require('../utils/ExpressError');
const { authorize } = require('passport');


module.exports.isContactOwner = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact.contactOwner.equals(req.user._id)) {
        return next(new ExpressError('Not authorized to access this route', 401));
    }
    next();
}