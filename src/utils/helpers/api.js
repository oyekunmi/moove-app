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

	const {
		token: { access_token },
		user: {
			phone_number,
			first_name, 
			last_name
		},
	} = response.data.data;


	return {
		token: access_token,
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

export const resetNewPassword = async (email, token, password, password_confirmation) => {
	await axios.post(`${baseURL}/auth/password/reset`, {email, token, password, password_confirmation });
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
	const trip = response.data.data.trip;
	const mooveId = response.data.data.trip.moove_id;
	const date = response.data.data.trip.created_at;
	const  riderDetails  = response.data.data.rider;
	const  riderName = response.data.data.rider.profile.first_name + " "+ response.data.data.rider.profile.last_name;
	// console.log(trip + ' in api');
	return {mooveId, riderDetails, riderName, date, trip};  
}

export const cancelTrip = async (tripId, riderId)=>{
	
	await axios.post(`${baseURL}/cancel-trip/${tripId}/${riderId}`);
	
}

export const verifyOTP = async (token, email)=>{
	
	await axios.post(`${baseURL}/auth/token/validate`, {
		token,
		email
	  });
	
}

export const getRiderLocation = async(riderId, tripId)=>{
	const response = await axios.get(`${baseURL}/rider/current/location/${riderId}/${tripId}`)
	return response;
}