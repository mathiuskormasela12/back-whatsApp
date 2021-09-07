// ========== Auth Middlewares
// import all modules
import { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'
import response from '../helpers/response'

export const checkAuthForms: any[] = [
	body('phone_number', 'Phone number is required')
		.notEmpty(),
	body('phone_number', 'Incorrect phone number')
		.isMobilePhone('id-ID'),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return response(req, res, 400, errors.array()[0].msg, false)
		}

		return next()
	}
]

export const checkOTP: any[] = [
	param('id', 'Incorrect id')
		.isInt(),
	body('otp', 'OTP is required')
		.notEmpty(),
	body('otp', 'Incorrect OTP')
		.isNumeric()
		.isLength({
			min: 5,
			max: 5
		}),

	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return response(req, res, 400, errors.array()[0].msg, false)
		}

		return next()
	}
]
