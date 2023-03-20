const amqp = require('amqplib');
import { logger } from '../utils/logger';

const connectToMessageBroker = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        logger.info('Connected to message broker');
        return channel;
    } catch (error) {
        logger.error('Error connecting to message broker', error);
    }
};

const publishMessage = async (channel, queue, message) => {
    try {
        const queue = 'leaderboard';
        await channel.assertQueue(queue, { durable: true });
        await channel.sendToQueue(queue, Buffer.from(message));
        logger.info('Message sent to message broker');
    } catch (error) {
        logger.error('Error sending message to message broker', error);
    }
};

const consumeMessage = async (channel, queue, callback) => {
    try {
        await channel.assertQueue(queue, { durable: true });
        await channel.consume(queue, (message) => {
            logger.info('Message received from message broker', message.content.toString());
            channel.ack(message);
        });
        logger.info('Consuming messages from message broker');
    } catch (error) {
        logger.error('Error receiving message from message broker', error);
    }
};

module.exports = { 
    connectToMessageBroker, 
    publishMessage, 
    consumeMessage,
};