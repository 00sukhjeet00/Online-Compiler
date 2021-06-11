var express = require('express');
var path = require('path');
const cors=require('cors')
var bodyParser = require('body-parser');
var compiler = require('compilex');
var app = express();
app.use(cors())
app.use(bodyParser.json());
var option = { stats: true };
compiler.init(option);
app.post('/compile', function (req, res) {

    var code = req.body.code;
    var takeinput = req.body.takeinput;
    var inputRadio = req.body.input;
    var lang = req.body.lang;
    if (lang === "cpp") {
        if (inputRadio === "Yes") {
            const envData = {
                OS:'windows',cmd:'g++',options:{timeout:2000}
            }
            compiler.compileCPPWithInput(envData, code, takeinput, function (data) {
                if (data.error) {
                    res.send(data.error);
                }
                else {
                    res.send(data.output);
                }
            });
        }
        else {

            var envData = { OS: "windows", cmd: "g++" ,options:{timeout:2000}};
            compiler.compileCPP(envData, code, function (data) {
                if (data.error) {
                    res.send(data.error);
                }
                else {
                    res.send(data.output);
                }

            });
        }
    }
    if (lang === "python") {
        if (inputRadio === "Yes") {
            var envData = { OS: "windows"};
            compiler.compilePythonWithInput(envData, code, input, function (data) {
                res.send(data);
            });
        }
        else {
            var envData = { OS: "windows" };
            compiler.compilePython(envData, code, function (data) {
                res.send(data);
            });
        }
    }

});
app.get('/fullStat', function (req, res) {
    compiler.fullStat(function (data) {
        res.send(data);
    });
});

app.listen(5000, () => { console.log('Server Started') });
