
const userModel = require("../config/models/userModels");
const bcrypt = require('bcrypt')


// create user register user 
exports.registerContoller = async (req, resp) => {

    try {
        const { username, password, email } = req.body
        // Validation
        if (!username || !email || !password) {
            return resp.status(400).send({
                success: false,
                message: "Please fill all the field "
            })
        }
        // existing user 
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return resp.status(401).send({
                success: false,
                message: "user already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)


        const user = new userModel({ username, email, password: hashedPassword })
        await user.save();

        return resp.status(201).send({
            success: true,
            message: "New User created"
        })


    } catch (error) {
        console.log(error)
        return resp.status(500).send({
            message: "Error in register callback",
            success: false,
            error
        })
    }

};

// get all users

exports.getAllUsers = async (req, resp) => {

    try {
        const users = await userModel.find({});
        return resp.status(200).send({
            userCount: (await users).length,
            success: true,
            message: "All users data",
            users
        });


    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Error in get user",
            error
        })

    }



};



// Login function

exports.loginController = async (req, resp) => {


    try {
        const { email, password } = req.body

        //validation
        if (!email || !password) {
            return resp.status(401).send({
                success: false,
                message: "Flease fill the field!"
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return resp.status(200).send({
                success: false,
                message: "Email is not registerd"
            })
        }
        //password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return resp.status(401).send({
                success: false,
                message: "Invalid username or password"
            })
        }

        return resp.status(200).send({
            success: true,
            message: "Login successfully",
            user
        })


    } catch (error) {
        console.log(error)
        resp.status(500).send({
            success: false,
            message: "Login page error ",
            error
        })


    }

};