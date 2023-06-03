//function to create token and save in cookie 

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();// function to create token
    // option for cookie 
    const options = {
        expies: new Date(
            Date.now + process.env.COOKIE_EXIPRE * 24 * 60 * 60 * 1000
        )
        // httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    })
}

module.exports = sendToken;