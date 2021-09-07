// ========== Boostraping
// import all modules
import fs from 'fs'
import path from 'path'
import appConfig from '../config/appConfig'

export default (filePath: string): Promise<any[] | Error> => {
	return new Promise((resolve: any, reject: any) => {
		const basename: any = path.basename(__filename)

		const results: any[] = []

		if (filePath.length > 0) {
			fs
				.readdirSync(path.join(__dirname, filePath))
				.filter(file => {
					return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === `${(appConfig.nodeEnv === 'development' ? '.ts' : '.js')}`)
				})
				.forEach((file: any): void => {
					const files: any = require(path.join(__dirname, `${filePath}/${file}`))
					results.push(files)
				})

			return resolve(results)
		} else {
			return reject(new Error('Failed'))
		}
	})
}
