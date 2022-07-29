const yup = require('./settings');

const schemaEmail = yup.object().shape({
    email: yup.string().email().required(),
});

module.exports = schemaEmail;