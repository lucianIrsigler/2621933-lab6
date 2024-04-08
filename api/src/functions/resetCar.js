const fs = require('fs').promises;
const path = require('path');
const { app } = require('@azure/functions');


const jsonFilePath = path.resolve(__dirname,'cars.json');


app.http('resetCar', {
    methods: ['POST'],
    handler: async (request, context) => {
        const data = [
            {
                "make": "Toyota",
                "model": "Camry",
                "year": 2022,
                "price": 250000
            },
            {
                "make": "Honda",
                "model": "Accord",
                "year": 2021,
                "price": 200000
            },
            {
                "make": "Ford",
                "model": "Mustang",
                "year": 2020,
                "price": 300000
            }
            ]

        const newDataJson = JSON.stringify(data);
        await fs.writeFile(jsonFilePath, newDataJson, 'utf8');

        return{
            body:"data reset"
        }
    }
});
