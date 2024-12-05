import { connect } from 'nats.ws';

const NATS_SERVER_URL = 'ws://192.168.0.192:8080';


let natsConnection = null;

export const initializeNATS = async () => {
  try {
    if (!natsConnection) {
      natsConnection = await connect({ servers: NATS_SERVER_URL });
      console.log('Connected to NATS server');
    }
    return natsConnection;
  } catch (error) {
    console.error('Error connecting to NATS:', error);
  }
};

export const getNATSConnection = () => natsConnection;
