# bleno-nrfuart

This code emulates a ble service which can be connected by nRF UART app. 
The uuid for the service can be changed to implement custom ble uart service.

To run this 
1. "cd \<this dir\>"  
2. "npm install"
3. "sudo node advertise-uartservice.js"

This creates ble uart service and advertises it as custom uart. 
"sudo" is required in the third step because bluetooth adapter because it gives permission to access bluetooth hardware.
