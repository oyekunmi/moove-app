import axios from 'axios';
import { State } from 'react-native-gesture-handler';
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

	const {
		token: { access_token },
		user: {
			phone_number,
			profile: { first_name, last_name }
		},
	} = response.data.data;


	return {
		access_token,
		name: `${first_name} ${last_name}`,
		phoneNo: phone_number,
	};
};

export const forgotPassword = async (email) => {
	return axios.post(`${baseURL}/auth/password/email`, { email });
}

export const resendOTP = async (email) => {
	return axios.post(`${baseURL}/auth/resend/${email}`);
}

export const resetNewPassword = async (otpCode, newPassword, confirmNewPassword) => {
	await axios.post(`${baseURL}/auth/password/reset/${otpCode}`, {'new_password': newPassword, 'new_password_confirmation': confirmNewPassword });
}

export const calculateCost = async (recipient_name, recipient_phone_number, package_description, who_pays = "REQUESTER", start_location, end_location, payment_method = "card", km, time) => {
	const { data: { data: cost } } = await axios.post(`${baseURL}/cost`, { recipient_name, recipient_phone_number, package_description, who_pays, start_location, end_location, payment_method, km, time });

	return cost;
}
export const mooveHistory = (token) => {
	const config = {
		headers: { Authorization: `Bearer ${token}` }
	};
	return axios.get(`${baseURL}/customer-history`, config);
}

export const findRider = async (recipient_name, recipient_phone_number, start_location, end_location,package_description, who_pays, latitude, longitude,paymentMethod, token)=>{
	// console.info(payLoad + ' in api');
	const config = {
		headers: { Authorization: `Bearer ${token}` }
	};
	const response = await axios.post(`${baseURL}/request-rider`,
	{	recipient_name: recipient_name,
		recipient_phone_number: recipient_phone_number, 
		start_location: start_location,
		end_location: end_location, 
		package_description: package_description,
		who_pays: who_pays, 
		latitude:latitude, 
		longitude : longitude, 
		payment_method: paymentMethod}, config
	);
	const mooveId = response.data.data.trip.moove_id;
	const  riderDetails  = response.data.data.rider;
	const  riderName = response.data.data.rider.profile.first_name + " "+ response.data.data.rider.profile.last_name;
	// console.log(mooveId + ' in api');
	return {mooveId, riderDetails, riderName};  
}

export const cancelTrip = (tripId, riderId, token)=>{
	const config = {
		headers: { Authorization: `Bearer ${token}` }
	};
	return axios.post(`${baseURL}/cancel-trip/${tripId}/${riderId}`, config);
	
}

export const verifyOTP = (otpCode)=>{
	
	return axios.post(`${baseURL}/auth/token/validate`, {
		otp: otpCode
	  });
	
}