const GrovePi = require('node-grovepi').GrovePi;
const DigitalSensor = require('node-grovepi').GrovePi.sensors.base.Digital;
const commands = GrovePi.commands;
const helpers = require('../helpers');

function DustDigitalSensor(pin) {
    DigitalSensor.apply(this, Array.prototype.slice.call(arguments));
    this.results = new Array();
}
DustDigitalSensor.prototype = new DigitalSensor();

DustDigitalSensor.prototype.read = function () {
    const write = this.board.writeBytes(commands.dustSensorRead.concat([this.pin, commands.unused, commands.unused]));
    if (write) {
        const bytes = this.board.readBytes();
        //console.log((bytes instanceof Buffer) + ' ' + bytes[0] + ' ' + bytes[1] + ' ' + bytes[2] + ' ' + bytes[3]);
        if (bytes instanceof Buffer && bytes[1] != 0)
            //[0]: new values?, [1]: concentration
            return [bytes[0], (bytes[3] * 256 * 256 + bytes[2] * 256 + bytes[1])];
        else
            return false;
    } else {
        return false;
    }
}
DustDigitalSensor.prototype.enable = function () {
    const write = this.board.writeBytes(commands.dustSensorEn.concat([commands.unused, commands.unused, commands.unused]));
    if (write) {
        this.board.wait(200);
        return true;
    } else {
        return false;
    }
}
DustDigitalSensor.prototype.disable = function () {
    const write = this.board.writeBytes(commands.dustSensorDis.concat([commands.unused, commands.unused, commands.unused]));
    if (write) {
        this.board.wait(200);
        return true;
    } else {
        return false;
    }
}

DustDigitalSensor.prototype.start = function () {
    if (!this.enable())
        throw new Error('cannot enable dust sensor');
    this.enable();
    setInterval(loop.bind(this), 30 * 1000); //every 30 seconds
}

DustDigitalSensor.prototype.stop = function () {
    this.disable();
    clearInterval(loop);
}

function loop() {
    let currentResult = this.read();
    if (currentResult[1] > 10000) {
        console.log('Error: trying to get value from dust sensor again since the previous one was ' + currentResult[1])
        currentResult = this.read();
    }
    this.results.push(currentResult[1]);
}

DustDigitalSensor.prototype.readAvgMax = function () {

    if (this.results.length === 0) return {
        avg: helpers.NOT_AVAILABLE,
        max: helpers.NOT_AVAILABLE
    };

    const sum = this.results.reduce((acc, cur) => acc + cur, 0);
    const avg = sum / this.results.length;

    const max = this.results.reduce((a, b) => Math.max(a, b));

    //reset the array
    this.results = new Array();

    return {
        avg: helpers.round(avg, 2),
        max: helpers.round(max, 2)
    };
}

module.exports = DustDigitalSensor;