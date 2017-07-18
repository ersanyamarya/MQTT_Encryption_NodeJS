/*
 * Author: Sanyam Arya
 * PRN: 170240126013
 * RSA encryption and MQTT Publisher
 */
var mqtt = require('mqtt');

var NodeRSA = require('node-rsa');
var rsa_key = new NodeRSA(
  '-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEApMpqoojMH8wiGbRj9Heb5/A99MHUDX5B1WnszqrxubOrOkGwdYa/wpeYVn7R\nN4+dixIdoHYR+U1Y2tTg21f36x60xGYBDhd2fMOLfxV9Ref0BDhBxRmz9Wei8F6XjQ9ofuEU\nHP6WGbmq+QDyGoajZgFgl1HXlSaev8Sd3fnMDwA0WZWrE89TLlpZ9lmzaAai3LNKCi9rr1b2\n2KPnZlQlxhffQ1Qq8fTSyjNWLgeoskQvCtAp2HokEKmp03S1kLk3dHU8BxUHSrxBYvGPP21x\n73zRSBwnIkRW0uxaNC0TQl7J7DNVIZBZaxDr/pxkREcUU5B+pI8rXNjHbLwj+ouTuwIDAQAB\n-----END RSA PUBLIC KEY-----\n'
);


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
  var payload = rsa_key.encrypt("This is the message", 'base64');
  console.log('published', payload);
  client.publish('data', payload);
  client.end()
});
