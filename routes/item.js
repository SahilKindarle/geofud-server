var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');


var sequelize = new Sequelize('geofud', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // SQLite only
    //storage: 'path/to/database.sqlite',

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});

var Item = sequelize.define('items', {
    name: Sequelize.STRING,
    protein: Sequelize.INTEGER,
    carbohydrate: Sequelize.INTEGER,
    calcium: Sequelize.INTEGER,
    iron: Sequelize.INTEGER,
    fat: Sequelize.INTEGER
});



/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


router.post('/new', function (req, res) {
    sequelize.sync()
        .then(() => Item.create({
            name: req.body.name,
            protein: parseFloat(req.body.protein),
            carbohydrate: parseFloat(req.body.carbohydrate),
            calcium: parseFloat(req.body.calcium),
            iron: parseFloat(req.body.iron),
            fat: parseFloat(req.body.fat)
        }))
        .then(jane => {
            console.log(jane.toJSON());
            res.send(true);
        });

    //res.send(false);

});

router.get("/:name", function (req, res) {
    sequelize.sync()
        .then(() => Item.findOne({
            where: {
                name: req.params.name
            }
        }))
        .then(function (listItems) {
            if(listItems){
                res.send(listItems);
            }
        });
});





module.exports = router;