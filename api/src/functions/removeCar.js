const fs = require('fs').promises;
const path = require('path');
const { app } = require('@azure/functions');

const jsonFilePath = path.resolve(__dirname, 'cars.json');



app.http('getCarById', {
    methods: ['DELETE'],
    route: 'cars/{carID}', // Define route with route parameter {carId}
    handler: async (request, context) => {
        try{
            const jsonData = await fs.readFile(jsonFilePath, 'utf8');
            let cars = JSON.parse(jsonData);

            id = request.params.carID //index

            cars.splice(id, 1);
            
            const newDataJson = JSON.stringify(cars);

            await fs.writeFile(jsonFilePath, newDataJson, 'utf8');

            return{ body: 
                newDataJson
            };
        }catch(error){
            return{
                status:500,
                body:'Internal Server Error. Failed to delete car.'
            }
        }

    }
});
