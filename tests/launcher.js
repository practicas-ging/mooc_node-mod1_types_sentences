/*
  Checker launcher
 */

const Mocha = require("mocha");
const assignment_path = "./tests/checks.test.js";

let score = 0;
let score_total = 0;

new Mocha({
    timeout: 60 * 1000,
    reporter: function () {
    }
})
    .addFile(assignment_path)
    .run()
    .on('pass', function (test) {
        score += test.ctx.score;
        score_total += test.ctx.score;
        process.stdout.write(`\nTest: ${test.ctx.name}\n\tScore: ${test.ctx.score}/${test.ctx.score}\n\tRemarks: ${test.ctx.msg_ok}\n`);
    })
    .on('fail', function (test, err) {
        if ((test.title.indexOf('"after all" hook')<0) && (test.title.indexOf('"before all" hook')<0)) {
            score_total += test.ctx.score;
            process.stdout.write(`\nTest: ${test.ctx.name}\n\tScore: 0/${test.ctx.score}\n\tRemarks: ${test.ctx.msg_err}\n`);
        } else {
            console.error("Launcher Error: " + err);
        }
    })
    .on('end', function (test) {
        process.stdout.write(`Final Result: ${score}/${score_total}`);
    });