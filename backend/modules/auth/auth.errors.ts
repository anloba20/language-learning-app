export class UserAlreadyExistsError extends Error {
    constructor() {
        super('Nickname or email already exists');
        this.name = 'UserAlreadyExistsError';
    }
}