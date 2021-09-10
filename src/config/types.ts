// =========== Types
// import all modules
import { Request, Response, NextFunction } from 'express'
export type Middleware = (req: Request, res: Response, next: NextFunction) => Response | void
