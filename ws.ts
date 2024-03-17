import ws from 'ws'
import mqtt from 'mqtt'
const websocket = new ws.Server({
  port: 8888,
host: 'localhost'
})
const client = mqtt.connect("mqtt://broker.hivemq.com:1883", {
	username: "ronandev",
	password: "@Ronan1605"
})
websocket.on('error', console.error)
client.on('connect', function () {
  client.on('message', (_, message) => console.log(message.toString()))
})