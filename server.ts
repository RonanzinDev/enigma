import mqtt from 'mqtt'
import cors from 'cors'
import http from 'http'
import express, { type Request, type Response } from 'express'
const app = express()
const server = http.createServer(app)

const client = mqtt.connect("mqtt://broker.hivemq.com:1883", {
	username: "ronandev",
	password: "@Ronan1605"
})
// app.use(cors({origin: "*"}))
client.on('connect', function () {
	client.on('message', (_, message) => {
		console.log(message)
	})
	// app.post("/ligar", (req: Request, res: Response) => {
	// 	client.publish("enigma", "L")
	// 	res.status(200).end()
	// })
	// app.post("/desligar", (req: Request, res: Response) => {
	// 	client.publish("enigma", "D")
	// 	res.status(200).end()
	// })

});
// server.listen(8080, () => {
// 	console.log("Running")
// })