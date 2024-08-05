export class UniversityAlreadyExistError extends Error {
    constructor() {
        super("University already exist");
    }
}