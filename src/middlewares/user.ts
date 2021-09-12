// ========== User Middlewares
// import all modules
import { Request, Response, NextFunction } from 'express'
import { param, body, validationResult } from 'express-validator'
import response from '../helpers/response'

export const checkEditUsernameForm: any[] = [
	param('id', 'Incorrect user id')
		.isInt({
			min: 1
		}),
	body('username', 'Username is required')
		.notEmpty(),
	body('username', 'Username too short')
		.isLength({
			min: 2
		}),
	(req: Request, res: Response, next: NextFunction) => {
		const errors: any = validationResult(req)

		if (!errors.isEmpty()) {
			return response(req, res, 400, errors.array()[0].msg, false)
		}

		return next()
	}
]
