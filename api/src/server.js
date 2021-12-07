import express from 'express';
import routes from './routes';
import { Kafka, logLevel } from 'kafkajs';

const app = express();

const kafka = new Kafka({
    clientId: 'main-server',
    brokers: ['localhost:9092'],
    logLevel: logLevel.WARN,
    connectionTimeout: 3000,
    retry: {
        retries: 10,
        initialRetryTime: 100,
    }
});

const producer = kafka.producer();

app.use((req, res, next) => {
    req.producer = producer;
  
    return next();
});
  
app.use(routes);

async function run() {
    await producer.connect();

    app.listen(3000, () => console.log('Listening to PORT 3000'));
}

run().catch(console.error);