/**
 * Types-sentences assignment checker
 */

// IMPORTS
const should = require('chai').should();
const path = require('path');
const fs = require('fs-extra');
const Utils = require('./utils');
const to = require('./to');
const execFile = require("child_process").execFile;

// PATHS
const path_assignment = path.resolve(path.join(__dirname, "../"));
const path_file = path.join(path_assignment, 'mod1_types_sentences.js');

// CRITICAL ERRORS
let error_critical = null;

// EXPECTED OUTPUT
let output = "";
const EXPECTED = `
Good morning, its 11 hours

Número PI con 6 decimales: 3.141593

0 dec = 0 hex = 0 oct = 0 bin
1 dec = 1 hex = 1 oct = 1 bin
2 dec = 2 hex = 2 oct = 10 bin
3 dec = 3 hex = 3 oct = 11 bin
4 dec = 4 hex = 4 oct = 100 bin
5 dec = 5 hex = 5 oct = 101 bin
6 dec = 6 hex = 6 oct = 110 bin
7 dec = 7 hex = 7 oct = 111 bin
8 dec = 8 hex = 10 oct = 1000 bin
9 dec = 9 hex = 11 oct = 1001 bin
10 dec = a hex = 12 oct = 1010 bin
11 dec = b hex = 13 oct = 1011 bin
12 dec = c hex = 14 oct = 1100 bin
13 dec = d hex = 15 oct = 1101 bin
14 dec = e hex = 16 oct = 1110 bin
15 dec = f hex = 17 oct = 1111 bin
16 dec = 10 hex = 20 oct = 10000 bin
17 dec = 11 hex = 21 oct = 10001 bin
18 dec = 12 hex = 22 oct = 10010 bin
19 dec = 13 hex = 23 oct = 10011 bin
20 dec = 14 hex = 24 oct = 10100 bin

1 dec = 1 hex = 1 oct = 1 bin
3 dec = 3 hex = 3 oct = 11 bin
5 dec = 5 hex = 5 oct = 101 bin
7 dec = 7 hex = 7 oct = 111 bin
9 dec = 9 hex = 11 oct = 1001 bin

Hola in chino se escribe así:  嗨，你好吗

The programa ha acabado de ejecutar: Tue Sep 04 2018 11:07:56 GMT+0200 (Romance Daylight Time)
`;
const EXPECTED_OUTPUT_LENGTH = EXPECTED.split(/\r?\n\r?\n/).length;

//TESTS
describe("mooc_node-mod1_types_sentences", function () {

    it('', async function () {
        this.name = `1: Checking that the assignment file exists...`;
        this.score = 0.5;
        this.msg_ok = `The directory '${path_assignment}' has been found`;
        this.msg_err = `The directory '${path_assignment}' has NOT been found`;
        const [error_path, path_ok] = await to(fs.pathExists(path_assignment));
        if (error_path) {
            error_critical = this.msg_err;
        }
        path_ok.should.be.equal(true);
    });

    it('', async function () {
        this.name = `2: Running 'mooc_node-mod1_types_sentences.js'`;
        this.score = 0.5;
        if (error_critical) {
            this.msg_err = error_critical;
            should.not.exist(error_critical);
        } else {
            this.msg_ok = "The file has been successfully run";
            [error_exe, output] = await to(new Promise((resolve, reject) => {
                execFile('node', [path_file], {encoding: 'utf8'}, (err, stdout) =>
                    err ? reject(err) : resolve(stdout))
            }));
            if (error_exe) {
                this.msg_err = `Error running the file.\n\t\t\tReceived: ${error_exe}`;
                error_critical = this.msg_err;
            } else {
                output = output.split(/\r?\n\r?\n/);
            }
            should.not.exist(error_exe);
        }
    });

    it('', async function () {
        this.name = `3: Checking the output length`;
    this.score = 1.5;
    if (error_critical) {
        this.msg_err = error_critical;
        should.not.exist(error_critical);
    } else {
        this.msg_ok = "The output length is OK";
        const output_length = output.length;
        this.msg_err = `Unexpected output length.\n\t\t\tExpected: ${EXPECTED_OUTPUT_LENGTH} blocks\n\t\t\tRead: ${output_length} blocks`;
        output_length.should.be.equal(EXPECTED_OUTPUT_LENGTH)
    }
});

it('', async function () {
    this.name = `4: Checking the initial greeting`;
    this.score = 1.5;
    if (error_critical) {
        this.msg_err = error_critical;
        should.not.exist(error_critical);
    } else {
        console.log(output[0]);
        this.msg_ok = "The initial greeting has been found";
        let hour = new Date().getHours();
        if ((6 < hour) && (hour <= 12)) {
            this.expected = /[días|morning]/i;
        } else if (hour < 22) {
            this.expected = /[tardes|afternoon]/i;
        } else {
            this.expected = /[noches|night]/i;
        }
        this.msg_err = `The initial greeting has NOT been found.\n\t\t\tExpected: ${this.expected}\n\t\t\tReceived: ${output[0].trim()}`;
        Utils.search(this.expected, output[0]).should.be.equal(true);
    }
});

it('', async function () {
    this.name = `5: Checking that the PI value is printed`;
    this.score = 1.25;
    if (error_critical) {
        this.msg_err = error_critical;
        should.not.exist(error_critical);
    } else {
        this.msg_ok = "6 decimals of the PI value have been found";
        this.expected = "3.141593";
        this.msg_err = `6 decimals of the PI value have NOT been found.\n\t\t\tExpected: ${this.expected}\n\t\t\tReceived: ${output[1].trim()}`;
        Utils.search(this.expected, output[1]).should.be.equal(true);
    }
});

it('', async function () {
    this.name = `6: Checking the equivalence table`;
    this.score = 1.25;
    if (error_critical) {
        this.msg_err = error_critical;
        should.not.exist(error_critical);
    } else {
        this.msg_ok = "All the values have been found";
        this.error = false;
        this.lines = output[2].split(/\r?\n/);
        for (let d in this.lines) {
            this.myreg = `.+?${d}.+?${(d >>> 0).toString(16)}.+?${(d >>> 0).toString(8)}.+?${(d >>> 0).toString(2)}.+?`;
            this.expected = new RegExp(this.myreg);
            let ok = Utils.search(this.expected, this.lines[d]);
            if (!ok) {
                this.error = true;
                this.msg_err = `The element ${d} has not been found.\n\t\t\tExpected: ${this.expected}\n\t\t\tReceived: ${this.lines[d].trim()}`;
            }
        }
        this.error.should.be.equal(false);
    }
});

it('', async function () {
    this.name = `7: Checking the equivalence table for odd numbers between 10 and 20`;
    this.score = 1.25;
    if (error_critical) {
        this.msg_err = error_critical;
        should.not.exist(error_critical);
    } else {
        this.msg_ok = "All the values have been found";
        this.error = false;
        this.lines = output[3].split(/\r?\n/);
        let i = 0;
        for (let d = 0; d <= 22; ++d) {
            if (((d % 2) === 1) && ((d < 10) || (d > 20))) {
                this.myreg = `.+?${d}.+?${(d >>> 0).toString(16)}.+?${(d >>> 0).toString(8)}.+?${(d >>> 0).toString(2)}.+?`;
                this.expected = new RegExp(this.myreg);
                let ok = Utils.search(this.expected, this.lines[i]);
                if (!ok) {
                    this.error = true;
                    this.msg_err = `The element ${i} has not been found.\n\t\t\tExpected: ${this.expected}\n\t\t\tReceived: ${this.lines[i]}`;
                }
                i++;
                this.error.should.be.equal(false);
            }
        }
    }
});

it('', async function () {
    this.name = `8: Checking that unicode characters are printed correctly`;
    this.score = 1.25;
    if (error_critical) {
        this.msg_err = error_critical;
        should.not.exist(error_critical);
    } else {
        this.msg_ok = "'hello' in chinese has been found";
        this.expected = "\u55e8\uff0c\u4f60\u597d\u5417";
        this.msg_err = `'hello' in chinese has NOT been found.\n\t\t\tExpected: ${this.expected}\n\t\t\tReceived: ${output[4].trim()}`;
        Utils.search(this.expected, output[4]).should.be.equal(true);
    }
});

it('', async function () {
    this.name = `9: Checking that the farewell sentence is printed`;
    this.score = 1.5;
    if (error_critical) {
        this.msg_err = error_critical;
        should.not.exist(error_critical);
    } else {
        this.msg_ok = "The farewell sentence has been found";
        this.expected = /The program has finished/i;
        this.msg_err = `The farewell sentence has NOT been found.\n\t\t\tExpected: ${this.expected}\n\t\t\tReceived: ${output[5].trim()}`;
        Utils.search(this.expected, output[5]).should.be.equal(true);
    }
});
})
;
