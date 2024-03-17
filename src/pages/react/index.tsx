import mqtt, { type IClientOptions } from "mqtt"
import { useEffect, useState } from "react"
const React = () => {
  const [status, setStatus] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  const [count, setCount] = useState(0)
  useEffect( () => {
    const client = mqtt.connect("wss://340d51b1159b45858ced69ee995802e6.s1.eu.hivemq.cloud:8884/mqtt", {username: "ronandev", password: "@Ronan1605"}) 
    client.on('connect', () => {
      console.log("connected")
      client.subscribe("enigma")
      setStatus(true)
    })
    client.on('error', console.error)
    client.on('message', (topic, message) => {
      let msg = message.toString()
      if(msg === "C") setCount(count + 1)
      if(msg == "S") setCount(count -1)
      setMessages(prevMessages => [...prevMessages, message.toString()]);
    })
    return () => {
      client.end(() => {console.log("end")})
    }
  }, [])
  return (
    <>
      <h1>{status ? "On" : "off"}</h1>
      <p>{count}</p>
    </>
  )
}

export default React