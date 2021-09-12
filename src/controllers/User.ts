// =========== User Controlers
// import all modules
import { Request, Response } from 'express'
import response from '../helpers/response'

// import models
import db from '../core/database'

namespace UserControllerModule {
	export class User {
		public static async editUsername (req: Request, res: Response): Promise<Response> {
			const users: any = db.users
			const { id } = req.params
			const { username } = req.body

			try {
				const isExist: any = await users.findOne({ where: { id } })

				if (!isExist) {
					return response(req, res, 400, 'Unkown user id', false)
				}

				const splitUsername: string[] = username.split(' ')
				const firstName: string = splitUsername.slice(0, 1).join('')
				const lastName: string | null = splitUsername.slice(1).join('').length > 0 ? splitUsername.slice(1).join('') : null

				const data: any = {
					first_name: firstName,
					last_name: lastName
				}
				await users.update(data, {
					where: { id }
				})

				return response(req, res, 200, 'Successfully to edit username', true, data)
			} catch (err: any) {
				console.log(err)
				return response(req, res, 500, err.message, false)
			}
		}
	}
}

export default UserControllerModule
