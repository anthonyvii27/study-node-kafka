import express from 'express';
import { CompressionTypes } from 'kafkajs';

const routes = express.Router();

routes.post('/message', async (req, res) => {
    const message = {
        user: { id: 1, name: 'Anthony Vinicius' },
        message: 'Hello World!',
    };

    await req.producer.send({
        topic: 'message-topic',
        compression: CompressionTypes.GZIP,
        messages: [
            { value: JSON.stringify(message) }
        ],
    });

    return res.json({ status: 'ENVIADO!' });
});

export default routes;