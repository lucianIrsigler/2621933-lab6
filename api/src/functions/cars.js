const fs = require('fs').promises;
const path = require('path');
const { app } = require('@azure/functions');


const jsonFilePath = path.resolve(__dirname,'cars.json');


app.http('cars', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const jsonData = await fs.readFile(jsonFilePath, 'utf8');
        const data = JSON.parse(jsonData);

        return {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
    }
});

