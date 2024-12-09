import 'react-native-url-polyfill/auto';
import 'text-encoding-polyfill';
import '@azure/core-asynciterator-polyfill'

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import Subscriber from './nats/Subscriber';
// import Publisher from './nats/Publisher';

import Subscriber from './nats/Request-Reply/Subscriber';
import { Publisher } from './nats/Request-Reply/Publisher';

export default function App() {
  return (
       <View style={styles.container}>
      {/* <Subscriber />
      <Publisher /> */}
      <Subscriber />
      <Publisher />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});