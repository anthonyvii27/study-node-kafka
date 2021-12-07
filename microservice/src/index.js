import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    brokers: ['localhost:9092'],
    clientId: 'microservice-1'
});

const topic = 'message-topic';
const consumer = kafka.consumer({ groupId: 'message-group' });

let count = 0;

async function run() {
    await consumer.connect();
    await consumer.subscribe({ topic });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            count++;

            const prefix = `${count} | ${message.timestamp}} - ${topic}[${partition}]`
            const payload = Buffer.from(message.value);

            console.log(`${prefix} - ${payload.toString()}`);
        },
    });
}

run().catch(console.error)