/*
 * Author: Sanyam Arya
 * PRN: 170240126013
 * MQTT Subscriber and AES decryption
 */
var mqtt = require('mqtt')
const crypto = require('crypto');
const decipher = crypto.createDecipher('aes192', 'a password');

var url = 'mqtt://localhost:1883';

// to send a PING request every 9 minutes
var opts = {
  keepalive: 540
};

//connecting to the MQTT Broker
var client = mqtt.connect(url, opts);

//Subscribing MQTT topic
client.on('connect', () => {
  console.log('MQTT client connected');
  client.subscribe('data'); //topic is "data"
});

client.on('message', (topic, message) => {
  console.log('Recieved over the network:\n', message.toString());
  //Decrypting the message
  var payload = decipher.update(message.toString(), 'hex', 'utf8');
  payload += decipher.final('utf8');
  console.log('\nRecieved after decryption:\n', payload);
});

client.on('close', () => {
  console.log('MQTT connection closed, now exiting.');
  process.exit(0);
});
