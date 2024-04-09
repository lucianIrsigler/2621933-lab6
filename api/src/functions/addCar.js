const fs = require('fs').promises;
const path = require('path');
const { app } = require('@azure/functions');


const jsonFilePath = path.resolve(__dirname,'cars.json');


/**
 *  Adds a car to the cars array, and writes the new array to the cars.json file
 */
app.http('addCar', {
    methods: ['POST'],
    handler: async (request, context) => {
        try{
            const jsonData = await fs.readFile(jsonFilePath, 'utf8');
            const data = JSON.parse(jsonData);

            newCar = await request.json();

            data.push(newCar)

            const newDataJson = JSON.stringify(data);
            await fs.writeFile(jsonFilePath, newDataJson, 'utf8');

            return{
                status:200,
                body:"Added new car successfully"
            }
        }catch(error){
            return{
                status:500,
                body:'Internal Server Error. Failed to add car.'
            }
        }
    }
});
