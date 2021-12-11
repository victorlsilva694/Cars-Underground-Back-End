const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const passport = require('passport');
const UsersModel = require('../Model/UsersModel');
const jwt = require("jsonwebtoken");
const carsModel = require("../Model/CarsModel");

const secret = '{ebd**husebdhuaw**bdahuw**yhdbawhd}';

router.post('/login/auth', (req, res, next) => {
    const { email, password } = req.body.user;

    UsersModel.findOne({ where: { email: email } }).then((user) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, success) => {
                if (success) {
                    const token = jwt.sign({
                        User_id: user.id
                    },
                    secret,{
                            expiresIn: '7h',
                        }
                    );
                    res.send({
                        token
                    });
                }
            });
        }
    });

});

router.post('/register/save', (req, res, next) => {

    let { name, lastName,
        cpf, rg, email, password } = req.body;

    var Salt = bcrypt.genSaltSync(10);
    var Hash = bcrypt.hashSync(password, Salt);

    if (name !== '' && lastName !== '' && cpf !== ''
        && rg !== '' && email !== '' && Hash !== '') {
        UsersModel.create({
            name: name,
            lastName: lastName,
            cpf: cpf,
            rg: rg,
            email: email,
            password: Hash
        }).then((e) => {
            res.status(301).send(e)
        })
    }
    else {
        res.status(404)
    }
});

function returnJson(){

    api.map((values) => {
        console.log(values)
    });

}


router.get('/api/CarsEnv', (req, res, next) => {

    carsModel.create({

    })

})


module.exports = router;