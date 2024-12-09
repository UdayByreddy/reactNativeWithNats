import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

import { initializeNATS } from '../NatsCilent';
import { StringCodec } from 'nats.ws';

export default function Subscriber() {
    const stringCodec = StringCodec();
    const [message, setMessage] = useState('');

    useEffect(() => {
        const subscribe = async () => {
            try {
                const nats = await initializeNATS();
                if (nats) {
                    const sub = await nats.subscribe('app.getStatus');
                    console.log('Subscribed to app.getStatus');

                    for await (const msg of sub) {
                        console.log('Message received:', stringCodec.decode(msg.data));
                        setMessage(stringCodec.decode(msg.data));
                    }
                }
            } catch (error) {
                console.error('Error in subscription:', error);
            }
        };

        subscribe();

       
        return () => {
            
        };
    }, []); 

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16 }}>Message: {message}</Text>
        </View>
    );
}
