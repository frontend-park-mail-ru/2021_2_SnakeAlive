class ValidationError extends Error {
    errorField = ''

    constructor(message, field) {
        super(message);
        this.errorField = field;
    };
}

export {ValidationError};