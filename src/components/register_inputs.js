class RegisterInputs {
	name = '';

	surname = '';

	email = '';

	pswd = '';

	constructor(_name, _surname, _email, _pswd) {
		this.name = _name;
		this.surname = _surname;
		this.email = _email;
		this.pswd = _pswd;
	}
}

export { RegisterInputs };
