// ========== IApplication
// import all modules
import { Application } from 'express'

interface IApp {
	app: Application
	port: number
	listen(): void
}

export default IApp
