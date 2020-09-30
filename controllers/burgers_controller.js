const express = require("express");

const router = express.Router();

// importing model
const burger = require("../models/burger.js");

// get route
router.get("/", function(req, res){
    burger.selectAll(function(data){
        const burg = {
            burgers: data
        };
        console.log(burg);
        res.render("index", burg);
    });
});

// post route
router.post("/api/burgers", function(req, res){
    console.log(req.body)
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.name, false
    ], function(result){
        res.json({ id: result.insertId});
    });
});

// put route
router.post("/api/burgers/:id", function(req, res){
    const condition = "id = " + req.params.id;
    console.log("condition", condition);
    const burgObject = {
        devoured: true
    }
    burger.updateOne(burgObject, condition, function(res){
        if (res.changedRows == 0) {
            return res.status(404).end();
        }else{
            res.status(200).end();
        }
    });
});

module.exports = router