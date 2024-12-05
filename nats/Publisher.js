import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { initializeNATS } from './NatsCilent';

const Publisher = () => {
  const [message, setMessage] = useState('');

  const publishMessage = async () => {
    const nats = await initializeNATS();
    if (nats) {
      nats.publish('your.subject', message); 
      console.log('Published message:', message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Publish" onPress={publishMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default Publisher;
