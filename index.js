var SerialPort = require("serialport");

var ttyPath  = process.env.TTY_PATH ||  "/dev/cu.usbserial-A800eG6R";
var interval = process.env.INTERVAL || 60*1000;

var port = new SerialPort(ttyPath, {
  baudRate: 9600,
  parser: SerialPort.parsers.readline('\n'),
});

function shouldLightsBeOn(){
  var now = new Date;
  var hour = now.getHours();
  return (hour >= 7 && hour < 11)
}

port.on('open', function () {
  setInterval(function () {
    port.write(shouldLightsBeOn() ? '0' : '1');
  }, interval);
})

port.on('data', function(data) {
  try {
    console.log('data', JSON.parse(data))
  } catch(e){
    console.log("Could not read data:, ", data);
    return
  }
})
