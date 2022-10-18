import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
	statusCode = 500;
	reason = 'Database connection failed';

	constructor() {
		super('Database connection failed');

		// Only because we are extending a build in class
		Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
	}

	serializeErrors() {
		return [{ message: this.reason }];
	}
}
