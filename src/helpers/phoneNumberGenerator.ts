// ========== Phone Number Generator

export default (phoneNumber: string): string => {
	if (phoneNumber.startsWith('0')) {
		return `62${phoneNumber.substr(1)}`
	} else {
		return phoneNumber
	}
}
