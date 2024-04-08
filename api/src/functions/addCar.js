const fs = require('fs').promises;
const path = require('path');
const { app } = require('@azure/functions');


const jsonFilePath = path.resolve(__dirname,'cars.json');


app.http('addCar', {
    methods: ['POST'],
    handler: async (request, context) => {
        const jsonData = await fs.readFile(jsonFilePath, 'utf8');
        const data = JSON.parse(jsonData);

        newCar = await request.json();

        data.push(newCar)

        return{
            body:JSON.stringify(data)
        }
    }
});
