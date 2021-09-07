// =========== Auth Controlers
// import all modules
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import response from '../helpers/response'
import randomNumbersGenerator from '../helpers/randomNumbersGenerator'
import phoneNumberGenerator from '../helpers/phoneNumberGenerator'
import twilio from '../helpers/twilio'
import db from '../core/database'
import appConfig from '../config/appConfig'

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
						return response(req, res, 200, 'The OTP code has sent to your phone number, please check', true, { id: isExists.id })
					} catch (err: any) {
						console.log(err)
						return response(req, res, 500, err.message, false)
					}
				} else {
					try {
						const results: any = await users.create({
							phone_number: phoneNumberGenerator(req.body.phone_number),
							otp: randomNumbers
						})

						try {
							await twilio(String(randomNumbers), phoneNumberGenerator(req.body.phone_number))
							return response(req, res, 200, 'The OTP code has sent to your phone number, please check', true, { id: results.id })
						} catch (err: any) {
							console.log(err)
							return response(req, res, 500, err.message, false)
						}
					} catch (err: any) {
						return response(req, res, 500, err.message, false)
					}
				}
			} catch (err: any) {
				console.log(err)
				return response(req, res, 500, err.message, false)
			}
		}

		public static async verifyOtp (req: Request, res: Response): Promise<Response> {
			const { otp } = req.body
			const { id } = req.params

			const users: any = db.users

			try {
				const isExists: any = await users.findOne({
					where: { id }
				})

				if (isExists) {
					if (isExists.otp === otp) {
						const token: string = jwt.sign({ id }, appConfig.secretKey, {
							expiresIn: '1h'
						})

						try {
							await users.update({ otp: null }, {
								where: { id }
							})
							return response(req, res, 200, 'Successfully to login', true, { token })
						} catch (err: any) {
							console.log(err)
							return response(req, res, 500, err.message, false)
						}
					} else {
						return response(req, res, 400, 'Incorrect otp code', false)
					}
				} else {
					return response(req, res, 400, 'Incorrect user id', false)
				}
			} catch (err: any) {
				console.log(err)
				return response(req, res, 500, err.message, false)
			}
		}
	}
}

export default AuthControllerModule
