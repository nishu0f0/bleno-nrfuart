const bleno = require('bleno');
const {UARTService, UART_UUID} = require('./uartservice.js');


console.log("Starting Bleno UART Service");

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('CustomUART', [UART_UUID], function(err) {
        console.log(err);
    });
  } else {
    console.log("will stopAdvertising");
    bleno.stopAdvertising();
  }
});

var uartservice = null;

bleno.on('advertisingStart', function(error) {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
  
    if (!error) {
        uartservice = new UARTService(dataCallback);
        result = bleno.setServices([uartservice]);

    }

});

function dataCallback(data) {
    console.log('dataCallback() data: ', data );
    uartservice.rx._updateValueCallback(new Buffer(data));
}

