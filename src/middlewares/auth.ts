// ========== Auth Middlewares
// import all modules
import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import response from '../helpers/response'

export const checkAuthForms: any[] = [
	body('phone_number', 'Phone number is required')
		.notEmpty(),
	body('phone_number', 'Incorrect phone number')
		.isMobilePhone('id-ID'),
	body('first_name', 'First name is required')
		.notEmpty(),
	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return response(req, res, 400, errors.array()[0].msg, false)
		}

		return next()
	}
]

export const checkOTP: any[] = [
	body('phone_number', 'OTP is required')
		.notEmpty(),
	body('phone_number', 'Incorrect OTP')
		.isNumeric()
		.isLength({
			min: 6,
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
