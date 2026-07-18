export const authErrorCodes = {
    invalidCredentials: 'AUTH_INVALID_CREDENTIALS',
    userAlreadyExists: 'AUTH_USER_ALREADY_EXISTS',
    validationFailed: 'AUTH_VALIDATION_FAILED',
    unauthorized: 'AUTH_UNAUTHORIZED',
    userNotFound: 'AUTH_USER_NOT_FOUND',
} as const;

export class UserAlreadyExistsError extends Error {
    readonly code = authErrorCodes.userAlreadyExists;

    constructor() {
        super('Nickname or email already exists');
        this.name = 'UserAlreadyExistsError';
    }
}

export class InvalidCredentialsError extends Error {
    readonly code = authErrorCodes.invalidCredentials;

    constructor() {
        super('Invalid nickname or password');
        this.name = 'InvalidCredentialsError';
    }
}

export class UserNotFoundError extends Error {
    readonly code = authErrorCodes.userNotFound;

    constructor() {
        super('User not found');
        this.name = 'UserNotFoundError';
    }
}
