const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.post('/submit-form', (req, res) => {
  const formData = req.body
  console.log('Received form data:', formData)
  res.json({ message: 'Data received successfully!' })
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
