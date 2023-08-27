const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");

exports.register = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.create({ username, password })
        sendToken(user, 201, res)
    } catch (error) {
        return next(new ExpressError("Something went wrong. Try again!", 401))
    } 
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    if(!username || !password) {
        return next(new ExpressError("Please provide an username and password!", 401))
    }
    try {
        const user = await User.findOne({ username }).select("+password")
        if(!user) {
            return next(new ExpressError("Invalid credentials", 401))
        }
        const isMatch = await user.matchPasswords(password)
        if(!isMatch) {
            return next(new ExpressError("Invalid credentials", 401))
        }
        sendToken(user, 200, res)
    } catch (error) {
        next(error)
    }
}

exports.refreshToken = async (req, res, next) => {
    const { signedCookies = {}} = req;
    const { refreshToken} = signedCookies;
    if(refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
            const userId = payload.id;
            await User.findOne({_id: userId}).then(
                user => {
                    if(user) {
                        const tokenIndex = user.refreshToken.findIndex(item => item.refreshToken === refreshToken)
                        if(tokenIndex === -1) {
                            return next(new ExpressError("Unauthorized", 401))
                        }
                        else {
                            const token = user.getSignedJwtToken({ _id: userId})
                            const newRefreshToken = user.getSignedRefreshToken({ _id: userId})
                            user.refreshToken[tokenIndex] = {refreshToken: newRefreshToken}
                            user.save(err => {
                                if(err) {
                                    return next(new ExpressError("Something went wrong!", 500))
                                }
                                else {
                                    res.cookie("refreshToken", newRefreshToken, {
                                        httpOnly: true,
                                        signed: true,
                                        samesite: "None",
                                        secure: true,
                                        maxAge: 60 * 60 * 24 * 30 * 1000
                                    })
                                    res.status(200).json({
                                        success: true,
                                        token
                                    })
                                }
                            })
                            
                        }
                    } else {
                        return next(new ExpressError("Unauthorized", 401))
                    }
                }
            )
        } catch (error) {
            return next(new ExpressError("Unauthorized", 401))
        }
    } return next(new ExpressError("Unauthorized", 401))
}

exports.logout = async (req, res, next) => {
    const { signedCookies = {}} = req;
    const { refreshToken} = signedCookies;
    if(refreshToken) {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const userId = payload.id
        await User.findById(userId).then(
            user => {
                const tokenIndex = user.refreshToken.findIndex(item => item.refreshToken === refreshToken)  
                if(tokenIndex !== -1) {
                    // user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
                    // user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove()
                
                // user.save(err => {
                //     if(err) {
                //         return next(new ExpressError(err, 500))
                //     } else {
                        res.clearCookie("refreshToken")
                        res.send({ success: true})
                    }
                })            
            }
    else {
        return next(new ExpressError("Bad request!", 403))
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken({_id: user._id});
    const refreshToken = user.getSignedRefreshToken({_id: user._id});
    user.refreshToken.push({refreshToken})
    user.save();

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        signed: true,
        samesite: "None",
        secureTrue: true,
        maxAge: 60 * 60 * 24 * 30 * 1000,
    })

    res.status(statusCode).json({
        success: true,
        token, user
    })
}