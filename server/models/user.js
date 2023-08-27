const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Contact = require("./contact");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Session = new Schema(
    {
        refreshToken: {
            type: String,
            default:""
        }
    }
)

const userSchema = new Schema ({
    username: {
        type: String,
        required:[true,"Please provide username!"],
        unique:[true,"Username already taken"]
    },
    password: {
        type: String,
        required:[true,"Please provide password!"],
    },
    contacts:[
        {
            type: Schema.Types.ObjectId,
            ref: "Contact",
        }
    ],
    refreshToken: {
        type: [Session],
    }
});

// userSchema.set("toJSON", {
//     transform: function(doc, ret, options)
// })

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 12)
    next();
})

userSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
}

userSchema.methods.getSignedRefreshToken = function() {
    return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRE})
}

module.exports = mongoose.model("User", userSchema)