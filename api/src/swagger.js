import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const initSwagger = async (app) => {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'My API',
                version: '1.0.0',
            },
        },
        apis: ['./*.js'], // Шляхи до вашого коду, які мають Swagger анотації.
    };
    const specs = swaggerJsdoc(options);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default initSwagger ;




