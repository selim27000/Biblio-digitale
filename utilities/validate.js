module.exports.validateRegisterInput = (
    username, 
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = "L'username ne peut pas être vide"
    }
    if(email.trim() === ''){
        errors.username = "L'email ne peut pas être vide"
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)){
            errors.email = "l'Email doit avoir un format valide";
        }
        if(password === ''){
            errors.password = "Le mot de passe ne peut pas être vide"
        }else {
            if(password !== confirmPassword){
                errors.confirmPassword = "Les mots de passe doivent être identiques"
            }
            return {
                errors,
                valid: Object.keys(errors).length < 1
            }
        }
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = "L'username ne peut pas être vide"
    }
    if(password.trim() === ''){
        errors.password = "le mot de passe ne peut pas être vide"
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}