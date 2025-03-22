import express from 'express' 

const app = express() 
const port = 3000;

app.use(express.json())

let teaData = []
let nextId = 1 

// Add a new tea
app.post('/teas', (req,res) => {
    const {name,price} = req.body 
    const newTea = {id: nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// List all the teas
app.get('/teas', (req,res) => {
    res.status(200).send(teaData)
})

// Get a tea by it's id
app.get('/teas/:id', (req,res) => {
    const teaId = parseInt(req.params.id)
    const tea = teaData.find(t => t.id === teaId)

    if (!tea) {
        return res.status(404).send('Tea not found..')
    } 
    res.status(201).send(tea)
})

// Update tea 
app.put('/teas/:id', (req,res) => {
    const teaId = parseInt(req.params.id)
    const tea = teaData.find(t => t.id === teaId) 

    if (!tea) {
        return res.status(404).send('Tea not found..')
    } 
    const {name, price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(201).send(tea)
})


// Delete tea 
app.delete('/teas/:id', (req,res) => {
    const findIndex = teaData.findIndex (t => t.id === parseInt(req.params.id))
    if(findIndex ===  -1){
        return res.status(404).send("tea not found")
    }
    teaData.splice(findIndex, 1)
    return res.status(200).send('deleted...')
}) 

app.listen(port, () => {
    console.log(`Server is running at port: ${port}...`)
})
