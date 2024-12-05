import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { initializeNATS, getNATSConnection } from "./NatsCilent";

const Subscriber = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscribeToNATS = async () => {
      const nats = await initializeNATS();
      if (nats) {
        const subscription = nats.subscribe("my.subject");
        (async () => {
          for await (const msg of subscription) {
            console.log("Raw message:", msg.data);
            console.log("Data type:", typeof msg.data);

            const utf16Decoder = new TextDecoder("utf-8");
            const messageData = utf16Decoder.decode(msg.data);
            console.log(messageData);

            setMessages((prev) => [...prev, messageData]);
          }
        })();
      }
    };

    subscribeToNATS();

    return () => {
      const nats = getNATSConnection();
      if (nats) {
        nats.close();
        console.log("NATS connection closed");
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Received Messages:</Text>
      {messages.map((msg, index) => (
        <Text key={index} style={styles.message}>
          {msg}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  message: { fontSize: 16, marginVertical: 5 },
});

export default Subscriber;
