// imported connection
const connection = require("../config/connection.js");

// two functions that are helper code
function printQuestionMarks(num) {
    var arr = [];
    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(object) {
    var arr = [];
    for (const key in object) {
        var value = object[key];
        if (object.hasOwnProperty.call(object, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

// the object for all mysql queries

const orm = {
    selectAll: function (tableInput, cb) {
        var query = "SELECT * FROM " + tableInput + ";";
        connection.query(query, function(err, res) {
            if (err) throw err;
            cb(res);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        var query = "INSERT INTO " + table;
        query += " (";
        query += cols.toString();
        query += ") ";
        query += "VALUES (";
        query += printQuestionMarks(vals.length);
        query += ") ";

        console.log(query);

        connection.query(query, vals, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    },
    updateOne: function (table, objColVals, condition, cb) {
        var query = "UPDATE " + table;
        query += " SET ";
        query += objToSql(objColVals);
        query += " WHERE ";
        query += condition;

        console.log(query);
        connection.query(query, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    }
};

module.exports = orm;