const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

let data = {
	'materials' : []
}
let idCounter = 1;

app.get('/materials', (req, res) => {
	res.status(200).json(data)
})

app.post('/materials', (req, res) => {
    const material = req.body.material;
    material.id = idCounter++;
    data.materials.push(material);
    res.status(201).json({ message: 'Material added successfully', material });
})

app.get('/materials/:id', (req, res) => {
    let idMaterial = parseInt(req.params.id)
    let material = data.materials.find(material => material.id === idMaterial)
    
    if (material) {
        res.status(200).json({material: material})
    } else {
        res.status(404).json({ message: 'Material not found' })
    }
})

app.put('/materials/:id', (req, res) => {
    let idMaterial = parseInt(req.params.id)
    let material = data.materials.find(material => material.id === idMaterial)
    
    if (material) {
        const updatedMaterial = req.body.material;
        Object.assign(material, { ...updatedMaterial });
        res.json({ message: 'Material updated successfully', material })
    } else {
        res.status(404).json({ message: 'Material not found' })
    }
})

app.delete('/materials/:id', (req, res) => {
    let idMaterial = parseInt(req.params.id)
    let indexMaterial = data.materials.findIndex(material => material.id === idMaterial)
    
    if (indexMaterial !== -1) {
        data.materials.splice(indexMaterial, 1)
        res.json({ message: 'Material deleted successfully' })
    } else {
        res.status(404).json({ message: 'Material not found' })
    }
})

app.listen(port, () => {
    console.log('Example app listening on port: ' + port)
})