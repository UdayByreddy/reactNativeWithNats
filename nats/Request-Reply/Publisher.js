import { View,Text,Button } from 'react-native';
import React, { useState } from 'react'
import { initializeNATS } from '../NatsCilent';
import { StringCodec } from 'nats.ws';

export const Publisher = () => {
    const stringCodec = StringCodec();
    const publish = async()=>{
        const nats = await initializeNATS();
        if(nats){
          const response =  await nats.request('app.getStatus',stringCodec.encode('Requesting status'));
          console.log('received:',stringCodec.decode(response.data));

        }
    }
  return (
   <View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>
        Request-Reply with nats
    </Text>
   <Button title='Send Request' onPress={publish} />
   </View>

  )
}
