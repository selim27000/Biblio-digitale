const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server');

const {validateRegisterInput, validateLoginInput} = require('../../utilities/validate')
const {SECRET_KEY}=require('../../config');
const User = require('../../models/User');

function generateToken(user){
    return jwt.sign({

        id:user._id,
        email:user.email,
        username:user.username

    }, 
    
    SECRET_KEY, { expiresIn: '1h'});
}

module.exports = {

    Mutation:{
        async login(_, { username, password }){
            const {errors, valid} = validateLoginInput(username, password);

            if(!valid){
                throw new UserInputError('Errors', {errors});
            }

            const user = await User.findOne({username});

            if (!user){
                errors.general= 'User non trouvé'
                throw new UserInputError('User non trouvé', {errors});
            }

            const match= await bcrypt.compare(password, user.password);
            if(!match){
                errors.general= 'Mauvais credentials'
                throw new UserInputError('Mauavais credentials', {errors});
            }
            
            const token = generateToken(user)
            console.log(token + " token user")
            return {
                ...user._doc,
                id: user._id,
                token
            };

        }, 
        async register(_, 
            {registerInput : 
            {username, email, password, confirmPassword }
        }, 
        context,
        info)

            {
            //VALIDER LES DATA DE L'USER
            const { valid,errors } = validateRegisterInput(username, email, password, confirmPassword);
            if(!valid){
                throw new UserInputError('Errors', { errors })
            }

            //ETRE SUR QUE L'USER N'EXISTE PAS

            const user = await User.findOne({username});
            if(user){
                throw new UserInputError('Username déjà utilisé', {
                    errors : {
                        username: 'Cet username est déjà utilisé'
                    }
                })

            }


            //HASH DU MOT DE PASSE ET CREATION D'UN TOKEN
            password = await bcrypt.hash(password,12);

            const newUser = new User({

                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });
            const res = await newUser.save();

            const token = generateToken(res); 
            return {
                ...res._doc,
                id: res._id,
                token
                
            };
        }
    }
}