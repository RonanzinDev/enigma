import type { MqttClient } from "mqtt";
import mqtt from "mqtt";
import { useEffect, useState } from "react";

const Led = () => {
  const [client, setClient] = useState({} as MqttClient)
  useEffect(() => {
    const conn = mqtt.connect("wss://340d51b1159b45858ced69ee995802e6.s1.eu.hivemq.cloud:8884/mqtt", { username: "ronandev", password: "@Ronan1605" })
    conn.on('connect', () => {
      conn.subscribe("enigma")
      setClient(conn)
    })
  }, [client])
  const ligar = () => {
    client.publish("enigma", "L")
  }
  const desligar = () => client.publish("enigma", "D")

  return (
    <>
     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button style={{margin: "10px", borderRadius: "10px"}} onClick={ligar}>Ligar</button>
        <button style={{margin: "10px", borderRadius: "10px"}} onClick={desligar}>Desligar</button>
      </div>
    </div>

    </>
  )
}

export default Led;