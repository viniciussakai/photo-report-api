import multer, { Options } from 'multer'
import path from 'path'
import crypto from 'crypto'

const multerOptions:Options = {
	dest: path.resolve(__dirname, '..', '..', 'uploads'),
	storage: multer.diskStorage({
		destination: path.resolve(__dirname, '..', '..', 'uploads'),
		filename: (req, file, callback) => {
			try {
				const hash = crypto.randomBytes(16).toString('hex')
				const filename = `${hash} - ${file.originalname}`
				callback(null, filename)
			} catch (err) {
				callback(err, '')
			}
		}
	}),
	limits: {
		fileSize: 3 * 1024 * 1024
	},
	fileFilter: (req, file, callback) => {
		const allowMimes = [
			'image/jpeg',
			'image/pjpeg',
			'image/jpg',
			'image/png'
		]
		if (allowMimes.includes(file.mimetype)) {
			callback(null, true)
		} else {
			callback(new Error('Invalid type'))
		}
	}

}

export default multerOptions
