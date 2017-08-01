const AnalogSensor = require('node-grovepi').GrovePi.sensors.base.Analog;
const helpers = require('../helpers');
const FULL_ANGLE = 300;

function RotaryAngleSensor(pin, watchDelay, samplesize) {
    AnalogSensor.apply(this, Array.prototype.slice.call(arguments));
    this.watchDelay = watchDelay || 10;
    this.samplesize = samplesize || 10;
    //watchDelay * samplesize equals the miliseconds interval that the sensor will report data
}
RotaryAngleSensor.prototype = new AnalogSensor();

RotaryAngleSensor.prototype.read = function () {
    const value = AnalogSensor.prototype.read.call(this);
    return value;
}

const convertDHTToDegrees = function (value) {
    //http://wiki.seeed.cc/Grove-Rotary_Angle_Sensor/
    const adc_ref = 5;
    const grove_vcc = 5;

    const voltage = helpers.round((value) * adc_ref / 1023, 2);

    //Calculate rotation in degrees(0 to 300)
    return helpers.round((voltage * FULL_ANGLE) / grove_vcc, 2);
}

RotaryAngleSensor.prototype.start = function () {
    setInterval(loop.bind(this), this.watchDelay);
}

RotaryAngleSensor.prototype.stop = function () {
    clearInterval(loop);
}

//new array initialized to zero
let tempArray = new Array();
let timesRun = 0;

let previousData = null;

function loop() {
    const reading = this.read();
    if (reading < 0 || reading > 1024) throw new Error('improper reading');

    const readingEntry = tempArray.find(x => x.reading === reading);

    if (readingEntry === undefined) {
        tempArray.push({
            times: 1,
            reading
        });
    } else {
        readingEntry.times++;
    }

    if (++timesRun === this.samplesize) {

        //find max number of times
        const maxTimes = Math.max.apply(Math, tempArray.map(readingEntry => readingEntry.times));
        //find max result based on this max times
        const result = tempArray.find(readingEntry => readingEntry.times === maxTimes);

        //reset the array
        timesRun = 0;
        tempArray = new Array();

        //convert to degrees
        const degrees = convertDHTToDegrees(result.reading);

        //Calculate result (0 to 100) from degrees(0 to 300)
        const finalResult = Math.floor(degrees / FULL_ANGLE * 100);

        //compare current data to previous data
        if (Math.abs(finalResult - previousData) != 0) {
            //there are new data
            this.emit('data', finalResult);
            previousData = finalResult;
        }
    }
}

module.exports = RotaryAngleSensor;