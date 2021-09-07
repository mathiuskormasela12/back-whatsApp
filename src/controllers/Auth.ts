// =========== Auth Controlers
// import all modules
import { Request, Response } from 'express'
import response from '../helpers/response'
import randomNumbersGenerator from '../helpers/randomNumbersGenerator'
import phoneNumberGenerator from '../helpers/phoneNumberGenerator'
import twilio from '../helpers/twilio'
import db from '../core/database'

namespace AuthControllerModule {
	export class Auth {
		public static async login (req: Request, res: Response): Promise<Response> {
			const users: any = db.users

			try {
				const isExists: any = await users.findOne({
					where: {
						phone_number: phoneNumberGenerator(req.body.phone_number)
					}
				})

				const randomNumbers = randomNumbersGenerator()

				if (isExists) {
					users.update({
						otp: randomNumbers
					}, {
						where: {
							id: isExists.id
						}
					})
					try {
						await twilio(String(randomNumbers), phoneNumberGenerator(req.body.phone_number))
						return response(req, res, 200, 'The OTP code has sent to your phone number, please check', true)
					} catch (err: any) {
						console.log(err)
						return response(req, res, 500, err.message, false)
					}
				} else {
					try {
						await users.create({
							first_name: req.body.first_name,
							phone_number: phoneNumberGenerator(req.body.phone_number),
							otp: randomNumbers
						})
					} catch (err: any) {
						return response(req, res, 500, err.message, false)
					}
					try {
						await twilio(String(randomNumbers), req.body.phone_number)
						return response(req, res, 200, 'The OTP code has sent to your phone number, please check', true)
					} catch (err: any) {
						console.log(err)
						return response(req, res, 500, err.message, false)
					}
				}
			} catch (err: any) {
				console.log(err)
				return response(req, res, 500, err.message, false)
			}
		}
	}
}

export default AuthControllerModule
