// ========== Auth Middlewares
// import all modules
import { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import { Middleware } from '../config/types'
import response from '../helpers/response'
import appConfig from '../config/appConfig'

const { secretKey } = appConfig

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

export const isLogin: Middleware = (req: Request, res: Response, next: NextFunction): Response | void => {
	const token = req.headers.authorization

	if (token) {
		try {
			const results = jwt.verify(token, secretKey)
			req.app.locals.token = results
			next()
		} catch (err: any) {
			return response(req, res, 400, err.message, false)
		}
	} else {
		return response(req, res, 400, 'Forbidden', false)
	}
}
