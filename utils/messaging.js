// utils/messaging.js

const amqp = require('amqplib/callback_api');

const connectRabbitMQ = (queueName, callback) => {
  amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) throw error0;

    connection.createChannel((error1, channel) => {
      if (error1) throw error1;

      channel.assertQueue(queueName, { durable: false });

      console.log(`Waiting for messages in ${queueName}`);
      channel.consume(queueName, (msg) => {
        console.log(`Received: ${msg.content.toString()}`);
        callback(JSON.parse(msg.content.toString()));
      });
    });
  });
};

module.exports = connectRabbitMQ;
