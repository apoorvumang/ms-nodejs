/*
 * Serve JSON to our AngularJS client
 */
var mysql = require('../connection-settings.js');

function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate());
};

exports.name = function (req, res) {
    mysql.connection.query('SELECT * FROM doctors', function (err, rows, fields) {
        if (err) throw err;
        console.log('The name is: ', rows[0].name);
        res.json({
            name: "a"
        });
    });
};

exports.getPatient = function (req, res) {
    mysql.connection.query('SELECT * FROM patients WHERE id = ' + req.params.id, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json({});
        }
        else {
            console.log('Got patient, number of rows: ', rows.length);
            res.json(rows[0]);
        }
    });
};

exports.getPatientAndSiblings = function (req, res) {
    mysql.connection.query('SELECT * FROM patients WHERE id = ' + req.params.id, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json(err);
        }
        else {
            console.log('Got patient, number of rows: ', rows.length);
            if(rows.length == 0)
                res.json({});
            else {
                var patient = rows[0];
                mysql.connection.query('SELECT name, dob, sex, s_id FROM patients, siblings WHERE p_id = ' + req.params.id + ' AND patients.id = siblings.s_id', function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        res.json(err);
                    }
                    else {
                        console.log('Got siblings, number of rows: ', rows.length);
                        patient.siblings = rows;
                        res.json(patient);
                    }
                });
            }
        }
    });
};

exports.getSiblings = function (req, res) {
    mysql.connection.query('SELECT name, dob, sex, s_id FROM patients, siblings WHERE p_id = ' + req.params.id + ' AND patients.id = siblings.s_id;', function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json({});
        }
        else {
            console.log('Got siblings, number of rows: ', rows.length);
            res.json(rows);
        }
    });
};

exports.getPatientRange = function (req, res) {
// console.log('SELECT * FROM patients WHERE id BETWEEN '+req.params.startID + ' AND ' + req.params.endID);
    mysql.connection.query('SELECT * FROM patients WHERE id BETWEEN ' + req.params.startID + ' AND ' + req.params.endID + ' LIMIT 50', function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json([]);
        }
        else {
            console.log('Got patient range, number of rows: ', rows.length);
            res.json(rows);
        }

    });
};

exports.getPatientDOB = function (req, res) {
    var dob = new Date(req.params.dob);
    // console.log('SELECT * FROM patients WHERE DAY(dob) = '+ dob.getDate() + ' AND MONTH(dob) = ' + (dob.getMonth()+1));
    mysql.connection.query('SELECT * FROM patients WHERE DAY(dob) = ' + dob.getDate() + ' AND MONTH(dob) = ' + (dob.getMonth() + 1), function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json([]);
        }
        else {
            console.log('Got patient from DOB, number of rows: ', rows.length);
            res.json(rows);
        }
    });
};

exports.getPatientName = function (req, res) {
    mysql.connection.query('SELECT * FROM patients WHERE name LIKE \"%' + req.params.name + '%\" LIMIT 50', function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json([]);
        }
        else {
            console.log('Got patient from Name, number of rows: ', rows.length);
            res.json(rows);
        }
    });
};

exports.getSchedule = function(req, res) {
    mysql.connection.query('SELECT vs.given, v.name, vs.date, vs.date_given, v.lower_limit, v.upper_limit, vm.name as make from vac_schedule vs, vaccines v, vac_make vm WHERE vs.p_id = ' + req.params.id + ' AND vs.v_id = v.id AND vm.id = vs.make ORDER BY vs.date LIMIT 50', function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json([]);
        }
        else {
            console.log('Got schedule from id, number of rows: ', rows.length);
            res.json(rows);
        }
    });
}

exports.getAppointments = function(req, res) {
    var date = new Date(req.params.date);
    mysql.connection.query("SELECT p.id, p.name, p.phone, p.phone2, group_concat(v.name separator ', ') as vaccines, vs.date from vac_schedule vs, vaccines v, patients p WHERE vs.p_id = p.id AND vs.v_id = v.id AND vs.date = '" + date.toMysqlFormat() + "' AND vs.given = 'N' group by p.id ORDER BY p.id LIMIT 100", function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.json([]);
        }
        else {
            console.log('Got appointments from date, number of rows: ', rows.length);
            res.json(rows);
        }
    });
}

exports.postSMS = function (req, res) {
    console.log(req.body);
    res.json({numSent: req.body.smsList.length});
};
