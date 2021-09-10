// =========== User Controlers
// import all modules
import { Request, Response } from 'express'
import response from '../helpers/response'

namespace UserControllerModule {
	export class User {
		public static editUser (req: Request, res: Response): Response {
			return response(req, res, 200, 'This is send message endpoint', true)
		}
	}
}

export default UserControllerModule
