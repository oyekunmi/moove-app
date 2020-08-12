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

export const userSignIn = async (phone, password) => {
	const response = axios.post(`${baseURL}/auth/login`, {
		phone_number: phone,
		password: password,
	});

	const { access_token } = (await response).data.data.token;

	return access_token;
};

export const resetPassword = async (email) => {
	return axios.post(`${baseURL}/auth/password/email`, {email});
}
