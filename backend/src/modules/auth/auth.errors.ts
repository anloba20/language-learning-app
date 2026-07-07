export class UserAlreadyExistsError extends Error {
    constructor() {
        super('Nickname or email already exists');
        this.name = 'UserAlreadyExistsError';
    }
}

export class InvalidCredentialsError extends Error {
    constructor() {
        super('Invalid nickname or password');
        this.name = 'InvalidCredentialsError';
    }
}

export class UserNotFoundError extends Error {
    constructor() {
        super('User not found');
        this.name = 'UserNotFoundError';
    }
}
