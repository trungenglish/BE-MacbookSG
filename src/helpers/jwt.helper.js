const jwt = require('jsonwebtoken');

const generateToken = (payload, secretSignature, tokenLife) => {
    return new Promise ((resolve, reject ) => {
        if (!secretSignature || !tokenLife) {
            return reject(new Error("Secret signature or token life is missing"));
        }
        // sign and create a token
        jwt.sign(
            payload,
            secretSignature,
            {
                expiresIn: tokenLife
            },
            (error, token) => {
                if (error) {
                    return reject(error);
                }
                resolve(token);
            }
        )
    })
}

const verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
}

module.exports = {
    generateToken,
    verifyToken
}