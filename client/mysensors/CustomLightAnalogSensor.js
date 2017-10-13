const LightAnalogSensor = require('node-grovepi').GrovePi.sensors.LightAnalog;
const helpers = require('../helpers');

function CustomLightAnalogSensor(pin) {
  LightAnalogSensor.apply(this, Array.prototype.slice.call(arguments));
}
CustomLightAnalogSensor.prototype = new LightAnalogSensor();

CustomLightAnalogSensor.prototype.read = function() {
  const res = LightAnalogSensor.prototype.read.call(this);
  if(res == null)
    return helpers.NOT_AVAILABLE;
  else
    return res;

  //TODO: check noisy values 
  // if(res == 0 || res == 5105 || res > 10000)
  //   return null;
    
}

module.exports = LightAnalogSensor;