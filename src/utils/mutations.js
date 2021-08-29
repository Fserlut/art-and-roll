export default {
	getClearPhone(phone) {
		return ('+' + phone.replace(/\D/g, ''));
	},

	getClearCode(code) {
		return (code.split(' ').join(''));
	}
}
