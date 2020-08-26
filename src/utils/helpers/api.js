import axios from 'axios';
import { baseURL } from '../constants';

export const userSignUp = async (
	firstname,
	lastname,
	email,
	phone,
	password,
	confirmPassword,
) => {
	const response = await axios.post(`${baseURL}/auth/register`, {
		phone_number: phone,
		password: password,
		email: email,
		password_confirmation: confirmPassword,
		first_name: firstname,
		last_name: lastname,
	});

	const { access_token } = response.data.data.token;

	return access_token;
};

export const userSignIn = async (email, password) => {
	const response = await axios.post(`${baseURL}/auth/login`, {
		email,
		password,
	});

	console.log('RESPONSE FROM LOGIN CONTROLLER ------>', response);

	const {
		token: { access_token },
		user: {
			phone_number,
			profile: { first_name, last_name}
		},
	} = response.data.data;


	return {
		access_token,
		name: `${first_name} ${last_name}`,
		phoneNo: phone_number,
	};
};

export const forgotPassword = async (email) => {
	return axios.post(`${baseURL}/auth/password/email`, {email});
}

export const resetNewPassword = async (email, newPassword, confirmNewPassword) => {
	await axios.post(`${baseURL}/auth/password/reset`, {email, 'new_password': newPassword, 'new_password_confirmation': confirmNewPassword });
}

export const calculateCost = async (recipient_name,recipient_phone_number,package_description, who_pays ="RECIPIENT",start_location, end_location, payment_method = "card", km, time) => {
	const { data: { data: cost } } = await axios.post(`${baseURL}/cost`, { recipient_name, recipient_phone_number, package_description, who_pays, start_location, end_location, payment_method, km, time});

	return cost;
}
