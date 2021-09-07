// ========== Socket Middleare
// import all modules
import { Request, Response, NextFunction } from 'express'

export default (io: any) => {
	return (req: Request, res: Response, next: NextFunction) => {
		req.socket = io
		next()
	}
}
