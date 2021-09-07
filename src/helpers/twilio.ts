// =========== Twilio SMS
// import all modules
import twilio from 'twilio'
import appConfig from '../config/appConfig'

export default (message: string, phoneNumber: string): any => {
	const client = twilio(appConfig.twilio.account_sid, appConfig.twilio.account_token)

	return client.messages.create({
		body: message,
		from: appConfig.twilio.account_phone_number,
		to: `+${phoneNumber}`
	})
		.then(message => console.log('MESSAGE_SID', message.sid))
		.catch(err => err)
}
