var bleno = require('bleno');
var PrimaryService = bleno.PrimaryService;
var Characteristic = bleno.Characteristic;
var Descriptor = bleno.Descriptor;

const UART_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"; // SERVICE
const TX_UUID   = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"; // CHARACTERISTIC
const RX_UUID   = "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"; // CHARACTERISTIC
const CCCD      = "00002902-0000-1000-8000-00805f9b34fb"; // DESCRIPTOR

class UARTService extends PrimaryService {

    constructor(dataCallback) {
        console.log('creating instance of UARTService')
        
        var tx = new TxCharacteristic(dataCallback);
        var rx = new RxCharacteristic();
        
        super({
            uuid: UART_UUID,
            characteristics: [
                tx, rx
            ]
        });
        this.tx = tx;
        this.rx = rx;
    }
}

class TxCharacteristic extends Characteristic {

    constructor(dataCallback) {
        console.log('creating instance of TxCharacteristic')
        super({
            uuid: TX_UUID,
            properties: ['write']
        });
        this.dataCallback = dataCallback;
    }

    onWriteRequest(data, offset, withoutResponse, callback) {
        console.log('TxCharacteristic --> onWriteRequest() data: ', data.toString('hex'));
        this.dataCallback(data.toString());
        callback(this.RESULT_SUCCESS);
    }
}

class RxCharacteristic extends Characteristic {

    constructor() {
        console.log('creating instance of RxCharacteristic');
        super({
            uuid: RX_UUID,
            properties: ['notify'],
            descriptors: [new RxDescriptor()]
        });
    }

    onSubscribe(maxValueSize, updateValueCallback) {
        console.log('RxCharacteristic --> onSubscribe() ')
        this.maxValueSize = maxValueSize;    
        this._updateValueCallback = updateValueCallback;
    }

    onUnsubscribe() {
        console.log('RxCharacteristic --> onUnsubscribe() ')
        this._updateValueCallback = null;
    }

}

class RxDescriptor extends Descriptor {

    constructor() {
        console.log('creating instance of RxDescriptor');
        super({
            uuid: CCCD,
            value: '01'
        });
    }
}

module.exports = {UARTService, UART_UUID};