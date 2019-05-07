import DeviceInfo from 'react-native-device-info';

const appFetch = (endpoint, method, body) => {

	let data =  {
		method: method,
		headers: { "Content-Type": "application/json" },
	};
	if(body) {
		data = {
			...data,
			body: JSON.stringify(body)
		}
	}
	const url = `http://vecinulvirtual.ro/bigbrother${endpoint}`;
	return fetch(url, data)
		.then(function(response) {
			return response.json();
		})
		//.then(json => (json))
		.catch(e => {
			console.log('error ', e);
	})

};


export const register = (userName) => {
	console.log(DeviceInfo.getUniqueID());
	const body = {
		managerID: 12,
		name: userName,
		id: DeviceInfo.getUniqueID(),
	};
	appFetch('/user.php', 'POST', body).then(response => {console.log('user.php: ', response, ' ', new Date())})
};

export const sendLocation = (lattitude, longitude) => {
	const body = {
		userID: DeviceInfo.getUniqueID(),
		lattitude,
		longitude
	};
	appFetch('/location.php','POST', body).then(response => {console.log('location.php: ', response, ' ', new Date())})
};

export const getLatestPositions = () => {
	return appFetch('/locations/last.php?managerID=12','GET');
};


