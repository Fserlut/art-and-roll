import { isPlatform } from "@ionic/core";

const getApiUrl = () => {
	if (isPlatform('mobileweb')) {
		return 'http://localhost:5000/api';
	}
	return 'https://art-and-roll.ru/api'
}

export default {
	baseUrl: getApiUrl()
}
