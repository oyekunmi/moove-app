import validation from 'validate.js';

const validate = (fieldName, value) => {
	var constraints = {
		firstName: {
			presence: { allowEmpty: false, message: 'cannot be blank' },
			length: {
				minimum: 3,
				message: 'needs to have 3 letters or more',
			},
		},
		lastName: {
			presence: { allowEmpty: false, message: 'cannot be blank' },
			length: {
				minimum: 3,
				message: 'needs to have 3 letters or more',
			},
		},
		email: {
			presence: { allowEmpty: false, message: 'cannot be blank' },
			format: {
				pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				message: '^Please enter a valid email address',
			},
		},
		password: {
			presence: { allowEmpty: false, message: 'cannot be blank' },
			length: {
				minimum: 6,
				message: '^Invalid Password',
			},
		},
		confirmPassword: {
			presence: { allowEmpty: false, message: 'cannot be empty' },
			equality: 'password',
		},
		phone: {
			presence: { allowEmpty: false, message: 'cannot be blank' },
			numericality: true,
			length: {
				minimum: 11,
				maximum: 13,
				message: 'needs to have 11 - 13 number of digits',
			},
		},
	};

	var formValues = {};
	formValues[fieldName] = value;

	var formFields = {};
	formFields[fieldName] = constraints[fieldName];

	let result = null;

	fieldName === 'confirmPassword'
		? (result = validation(formValues[fieldName], formFields))
		: (result = validation(formValues, formFields));

	if (result) return result[fieldName][0];

	return result;
};

export const checkErrorHandler = (field, value, errorHandler) => {
	errorHandler((prevState) => ({
		...prevState,
		[field]: validate(field, value),
	}));
};
