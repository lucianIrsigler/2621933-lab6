const fs = require('fs').promises;
const path = require('path');
const { app } = require('@azure/functions');


const jsonFilePath = path.resolve(__dirname,'cars.json');


/**
 * Returns the cars array from the cars.json file
 */
app.http('cars', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        try{
        const jsonData = await fs.readFile(jsonFilePath, 'utf8');
            const data = JSON.parse(jsonData);

            return {
                status:200,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
        }catch(error){
            return{
                status:500,
                body:'Internal Server Error. Failed to get cars.'
            }
        }
    }
});

