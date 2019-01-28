'use strict';

var PORT;

if (process.env.NODE_ENV == 'test') {
    PORT = 8002;
} else if (process.env.NODE_ENV == 'dev') {
    PORT = 8001;
} else {
    PORT = 8000;
}


var SERVER = {
    APP_NAME: 'EEG',
    PORTS: {
        HAPI: PORT
    },
    TOKEN_EXPIRATION_IN_MINUTES: 600,
    JWT_SECRET_KEY: 'sUPerDuperSeCuREKeY&^$^&$^%$^%7782348723t4872t34Ends',
    COUNTRY_CODE : '+91',
    DOMAIN_NAME : 'http://localhost:8000/',
    SUPPORT_EMAIL : 'support@amitrana.com'
};

var DATABASE = {
    USER_ROLES: {
        ADMIN: 'ADMIN'
    }
};

var GOOGLE_AUTH = {
    clientID : "clientID",
    clientSecret : "clientSecret"
};

var STATUS_MSG = {
    ERROR: {
        INVALID_USER_PASS: {
            statusCode:401,
            type: 'INVALID_USER_PASS',
            customMessage : 'Invalid username or password'
        },
        TOKEN_ALREADY_EXPIRED: {
            statusCode:401,
            customMessage : 'Token Already Expired',
            type : 'TOKEN_ALREADY_EXPIRED'
        },
        DB_ERROR: {
            statusCode:400,
            customMessage : 'DB Error : ',
            type : 'DB_ERROR'
        },
        IMP_ERROR: {
            statusCode:500,
            customMessage : 'Implementation Error',
            type : 'IMP_ERROR'
        },
        APP_VERSION_ERROR: {
            statusCode:400,
            customMessage : 'One of the latest version or updated version value must be present',
            type : 'APP_VERSION_ERROR'
        },
        INVALID_TOKEN: {
            statusCode:401,
            customMessage : 'Invalid token provided',
            type : 'INVALID_TOKEN'
        },
        INVALID_CODE: {
            statusCode:400,
            customMessage : 'Invalid Verification Code',
            type : 'INVALID_CODE'
        },
        DEFAULT: {
            statusCode:400,
            customMessage : 'Error',
            type : 'DEFAULT'
        },
        PHONE_NO_EXIST: {
            statusCode:400,
            customMessage : 'Phone No Already Exist',
            type : 'PHONE_NO_EXIST'
        },
        EMAIL_EXIST: {
            statusCode:400,
            customMessage : 'Email Already Exist',
            type : 'EMAIL_EXIST'
        },
        DUPLICATE: {
            statusCode:400,
            customMessage : 'Duplicate Entry',
            type : 'DUPLICATE'
        },
        EMPTY_VALUE: {
            statusCode:400,
            customMessage : 'Empty String Not Allowed',
            type : 'EMPTY_VALUE'
        }

    },
    SUCCESS: {
        CREATED: {
            statusCode:201,
            customMessage : 'Created Successfully',
            type : 'CREATED'
        },
        DEFAULT: {
            statusCode:200,
            customMessage : 'Success',
            type : 'DEFAULT'
        },
        UPDATED: {
            statusCode:200,
            customMessage : 'Updated Successfully',
            type : 'UPDATED'
        },
        LOGOUT: {
            statusCode:200,
            customMessage : 'Logged Out Successfully',
            type : 'LOGOUT'
        },
        DELETED: {
            statusCode:200,
            customMessage : 'Deleted Successfully',
            type : 'DELETED'
        }
    }
};

var APP_CONSTANTS = {
    SERVER: SERVER,
    DATABASE: DATABASE,
    STATUS_MSG: STATUS_MSG
};

module.exports = APP_CONSTANTS;
