/*
 * jwt-simple
 *
 * JSON Web Token encode and decode module for node.js
 *
 * Copyright(c) 2011 Kazuhito Hokamura
 * MIT Licensed
 */

/**
 * module dependencies
 */
const crypto = require('crypto');


/**
 * support algorithm mapping
 */
const algorithmMap = {
    HS256: 'sha256',
    HS384: 'sha384',
    HS512: 'sha512',
    RS256: 'RSA-SHA256'
};

/**
 * Map algorithm to hmac or sign type, to determine which crypto function to use
 */
const typeMap = {
    HS256: 'hmac',
    HS384: 'hmac',
    HS512: 'hmac',
    RS256: 'sign'
};


/**
 * expose object
 */
const jwt = module.exports;


/**
 * version
 */
jwt.version = '0.5.1';

/**
 * Decode jwt
 *
 * @param {Object} token
 * @param {String} key
 * @param {Boolean} noVerify
 * @param {String} algorithm
 * @return {Object} payload
 * @api public
 */
jwt.decode = function jwt_decode(token, key, noVerify=false, algorithm='HS256') {
    // check token
    if (!token) {
        throw new Error('No token supplied');
    }
    // check segments
    let segments = token.split('.');
    if (segments.length !== 3) {
        throw new Error('Not enough or too many segments');
    }

    // All segment should be base64
    let headerSeg = segments[0];
    let payloadSeg = segments[1];
    let signatureSeg = segments[2];

    // base64 decode and parse JSON
    let header = JSON.parse(base64urlDecode(headerSeg));
    let payload = JSON.parse(base64urlDecode(payloadSeg));

    if (!noVerify) {
        let signingMethod = algorithmMap[algorithm || header.alg];
        let signingType = typeMap[algorithm || header.alg];
        if (!signingMethod || !signingType) {
            throw new Error('Algorithm not supported');
        }

        // verify signature. `sign` will return base64 string.
        let signingInput = [headerSeg, payloadSeg].join('.');
        if (!verify(signingInput, key, signingMethod, signingType, signatureSeg)) {
            throw new Error('Signature verification failed');
        }

        // Support for nbf and exp claims.
        // According to the RFC, they should be in seconds.
        if (payload.nbf && Date.now() < payload.nbf * 1000) {
            throw new Error('Token not yet active');
        }

        if (payload.exp && Date.now() > payload.exp * 1000) {
            throw new Error('Token expired');
        }
    }

    return payload;
};


/**
 * Encode jwt
 *
 * @param {Object} payload
 * @param {String} key
 * @param {String} algorithm
 * @param {Object} options
 * @return {String} token
 * @api public
 */
jwt.encode = function jwt_encode(payload, key, algorithm='HS256', options=null) {
    // Check key
    if (!key) {
        throw new Error('Require key');
    }

    // Check algorithm, default is HS256
    if (!algorithm) {
        algorithm = 'HS256';
    }

    let signingMethod = algorithmMap[algorithm];
    let signingType = typeMap[algorithm];
    if (!signingMethod || !signingType) {
        throw new Error('Algorithm not supported');
    }

    // header, typ is fixed value.
    let header = {typ: 'JWT', alg: algorithm};
    if (options && options.header) {
        assignProperties(header, options.header);
    }

    // create segments, all segments should be base64 string
    let segments = [];
    segments.push(base64urlEncode(JSON.stringify(header)));
    segments.push(base64urlEncode(JSON.stringify(payload)));
    segments.push(sign(segments.join('.'), key, signingMethod, signingType));

    return segments.join('.');
};

/**
 * private util functions
 */

function assignProperties(dest, source) {
    for (let attr in source) {
        if (source.hasOwnProperty(attr)) {
            dest[attr] = source[attr];
        }
    }
}

function verify(input, key, method, type, signature) {
    if (type === "hmac") {
        return (signature === sign(input, key, method, type));
    }
    else if (type === "sign") {
        return crypto.createVerify(method)
            .update(input)
            .verify(key, base64urlUnescape(signature), 'base64');
    }
    else {
        throw new Error('Algorithm type not recognized');
    }
}

function sign(input, key, method, type) {
    let base64str;
    if (type === "hmac") {
        base64str = crypto.createHmac(method, key).update(input).digest('base64');
    }
    else if (type === "sign") {
        base64str = crypto.createSign(method).update(input).sign(key, 'base64');
    }
    else {
        throw new Error('Algorithm type not recognized');
    }

    return base64urlEscape(base64str);
}

function base64urlDecode(str) {
    return new Buffer(base64urlUnescape(str), 'base64').toString();
}

function base64urlUnescape(str) {
    str += new Array(5 - str.length % 4).join('=');
    return str.replace(/\-/g, '+').replace(/_/g, '/');
}

function base64urlEncode(str) {
    return base64urlEscape(new Buffer(str).toString('base64'));
}

function base64urlEscape(str) {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
