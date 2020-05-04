class ContactDTO {
    constructor(id, username, name, password = null) {
        this.id = id;
        this.username = username;
        this.name = name;

        if (password) {
            this.password = password;

        }
    }
}

module.exports = ContactDTO;
