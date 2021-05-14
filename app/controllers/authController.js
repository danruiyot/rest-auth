const router = require('express').Router()
const bcrypt = require("bcryptjs")
const db = require('../../config/db');
const jwt = require("jsonwebtoken")

var user = db.Auth;

router.get('/', async(req, res) => {
    console.log(user.findAll())

    user.findAll()
        .then(users => {
            res.status(200).json({
                message: "Get all users' Infos Successfully!",
                users: users
            });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });

});

router.post('/register', async(req, res) => {
    const saltRounds = 10;
    const new_user = {};
    let password = req.body.password;
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    });

    new_user.email = req.body.email;
    new_user.firstName = req.body.firstName;
    new_user.lastName = req.body.lastName;
    new_user.password = hashedPassword;

    user.create(new_user);

    console.log(new_user);

    res.status(200).send({
        message: "Registration success"
    });
})

router.post('/login', async(req, res) => {
    var input_email = req.body.email;
    var password = req.body.password;

    theUser = await user.findOne({ where: { email: input_email } });

    let savedPassword = theUser.password;
    // var 

    if (!await bcrypt.compare(password, savedPassword)) {
        return res.status(400).send({
            message: "wrong user name or password"
        });
    }
    var token = jwt.sign({ id: 1 }, "secret");

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(200).send({
        message: "login success !"
    });

});

router.get('/logout', async(req, res) => {

    res.cookie("jwt", "", {
        maxAge: 0
    })


    res.status(200).send({
        message: "Logout success"
    });
});

module.exports = router;