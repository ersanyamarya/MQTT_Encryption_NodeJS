/*
 * Author: Sanyam Arya
 * PRN: 170240126013
 * MQTT Subscriber and RSA decryption
 */
var mqtt = require('mqtt')
var NodeRSA = require('node-rsa');
var key = new NodeRSA(
  '-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEApMpqoojMH8wiGbRj9Heb5/A99MHUDX5B1WnszqrxubOrOkGwdYa/wpeY\nVn7RN4+dixIdoHYR+U1Y2tTg21f36x60xGYBDhd2fMOLfxV9Ref0BDhBxRmz9Wei8F6XjQ9o\nfuEUHP6WGbmq+QDyGoajZgFgl1HXlSaev8Sd3fnMDwA0WZWrE89TLlpZ9lmzaAai3LNKCi9r\nr1b22KPnZlQlxhffQ1Qq8fTSyjNWLgeoskQvCtAp2HokEKmp03S1kLk3dHU8BxUHSrxBYvGP\nP21x73zRSBwnIkRW0uxaNC0TQl7J7DNVIZBZaxDr/pxkREcUU5B+pI8rXNjHbLwj+ouTuwID\nAQABAoIBADkTbsmqzeB5iJoUk8Y5o0M7P4pFlBe0UkMDtCSEqsKiCz1bQS4DpOlWLkpPFFHF\nKVDgzmgkXOdXNd5deyAdoN3LvdqEZfsmf0CJTgiPPdt3klnfzk/hLiZiZdoROTZ/TrcbaCb+\nuqhgWWpzPGeZmICdG4Jts1iSjstm4zLd8SKEZGqvNqEEz/ksnZXOSQpmMYXwH54Ow8yDB6RQ\nyLAeOyZqgVrAw9rCrPBdeg8wn9YwCd8ryX/h8eEBJ8Xgon2mOCcuDOybKUrMOVEa3/IqIt93\nSuo6oKf0uT0SqM72m9NE5mNViIH8e/x1ZGLCr+BMuDPs60uk7SfbKA7KJrI5BfkCgYEA8gDS\naD92Ld0EeCxcfe021kfUnL8DjZQQpMyQsZJerA2+KOcaahclbFrLfjklye/QvX9c4nJf6YQk\n0SxC0CXeEURJoCym4hGCeitjhzqwg79ytZXWjeXH2wpF9N+FhJ57hh3muQZif+Z2upvI+PQV\njm078TEOkO9iwwuXeY+GLR0CgYEArlJcacUYaPPELCyVRbZeTEUX0QJVYjbZ9Z6sYIzc9Dnf\nCFN49bhfUo0yj7aY6YsiNQwI9A7T+wU0afV4mvID5h/cKkmQIJPT23rcJHMxsQJClZJ5FYZd\nRmg8Oc0+7AjxJuit8ON3OY/0fJBMTRxgHkI2BTqRf/6MoWpVHFJqZLcCgYEA3ht9ASrFl0BT\nWsw0M2skujQA4b+6ThWH1Qje/+q7syOF1NqOdrI5qaIHRBjFIvpUVadwI3EfsB2VANmjlJA8\nqRJIlJaGr9OsMd5ioXlvCewLJreXzHIJJHLgU+dWDqq56hTFbil6+7IUZB6YrEyxACAnNK12\nlfTvat3XrzzXw80CgYA3LJxRYe+68ETMEoRgnzszer7yCYIK5v+PrVwz5wHcTyDXmsvzQhrx\nnv083XeCm+YE0j1XOgZAMkKHswksSaOQR89Aly4GEaQBmN5qrwcwVl3Kx6SJepC1QzKkvODI\nhoAFZ6n+T5Ch6H1im616zpthmGVOvF3nHCNYx7YOk8tW+wKBgQDraijFRCq3LfVNh2i6YFwB\nk3fz6GgUIO8VP7dIQnbVlFVs3g5koSEIN0YnBPJLTaQvNI5LNXvfzQ3TgqhxdYKS5w+3dRHV\nMZGDw3Ay3Be1Vf79bsjfRvJxuBD1Vee0gukJNzd1SjjKLgNXGyN/EbR8LcwOCYJ93tydkBg7\nT48axQ==\n-----END RSA PRIVATE KEY-----\n'
);

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
  var payload = key.decrypt(message.toString(), 'utf8');
  console.log('\nRecieved after decryption:\n', payload);
});

client.on('close', () => {
  console.log('MQTT connection closed, now exiting.');
  process.exit(0);
});
