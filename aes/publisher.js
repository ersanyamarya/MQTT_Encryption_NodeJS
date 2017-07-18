/*
 * Author: Sanyam Arya
 * PRN: 170240126013
 * AES encryption and MQTT Publisher
 */
var mqtt = require('mqtt');

const crypto = require('crypto');
const cipher = crypto.createCipher('aes192', 'a password');


var url = 'mqtt://localhost:1883';

// to send a PING request every 9 minutes
var opts = {
  keepalive: 540
};

//connecting to the MQTT Broker
var client = mqtt.connect(url, opts);

client.on('connect', function() {
  console.log('MQTT client connected');
  //Encrypt the message using RSA
  //encrypt(buffer, [encoding])
  var payload = cipher.update('This is the message', 'utf8', 'hex');
  payload += cipher.final('hex');
  console.log('published', payload);
  client.publish('data', payload);
  client.end()
});
