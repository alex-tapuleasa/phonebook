const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const catchAsync = require("../utils/catchAsync");
const { isContactOwner } = require ("../middleware/contact");

const { 
    index,
    createContact,
    showContact,
    editContact,
    deleteContact
} = require("../controllers/contacts");

router.get('/', isLoggedIn, catchAsync(index));
router.post('/new', isLoggedIn, catchAsync(createContact));
router.get('/:contactId/details', isLoggedIn, catchAsync(showContact));
router.put('/:contactId/edit', isLoggedIn, isContactOwner, catchAsync(editContact));
router.delete('/:contactId/delete', isLoggedIn, isContactOwner, catchAsync(deleteContact));

module.exports = router;