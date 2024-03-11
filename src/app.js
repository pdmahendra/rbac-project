import express, { urlencoded } from 'express'
const app = express();

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.get('/', async (req, res) => {
res.send("welcome to home page")
})


export { app }