// =========== Auth Controlers
// import all modules
import { Request, Response } from 'express'
import response from '../helpers/response'

namespace AuthControllerModule {
	export class Auth {
		public static register (req: Request, res: Response): Response {
			return response(req, res, 200, 'Hello', true, [{
				nama: 'mathius'
			}], 20, 2, 1)
		}
	}
}

export default AuthControllerModule
