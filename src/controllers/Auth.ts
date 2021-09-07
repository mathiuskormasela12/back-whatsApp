// =========== Auth Controlers
// import all modules
import { Request, Response } from 'express'
import response from '../helpers/response'

namespace AuthControllerModule {
	export class Auth {
		public static register (req: Request, res: Response): Response {
			return response(req, res, 200, 'This is register endpoint', true)
		}
	}
}

export default AuthControllerModule
