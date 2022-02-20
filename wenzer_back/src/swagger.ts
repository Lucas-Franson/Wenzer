const swaggerAutogen = require('swagger-autogen')()

const outputFile = './src/swagger_output.json'
const endpointsFiles = ['./src/1-presentation/routes/index.ts']

const doc = {
    info: {
        version: "1.0.0",
        title: "Wenzer",
        description: "Documentação gerada para o sistema <b>Wenzer</b>."
    },
    host: "localhost:3333",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Login",
            "description": "Endpoints"
        },
        {
            "name": "Feed",
            "description": "Endpoints"
        }
    ],
    definitions: {
        Connections: {
            id: "GUID",
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        },
        EmailMarketing: {
            id: "GUID",
            email: "joao@gmail.com",
            emailValid: false,
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        },
        Followers: {
            id: "GUID",
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        },
        Interests: {
            id: "GUID",
            name: "Tecnologia",
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        },
        InterestsUser: {
            id: "GUID",
            idInterests: "GUID",
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        },
        Participants: {
            id: "GUID",
            active: false,
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        },
        Post: {
            id: "GUID",
            idUser: "GUID",
            countViews: 0,
            title: "Titulo",
            description: "Descrição...",
            photo: "base64",
            idProject: "GUID",
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        },
        Project: {
            id: "GUID",
            name: "Wenzer",
            description: "Descrição...",
            photo: "base64",
            active: false,
            public: false,
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        },
        React: {
            id: "GUID",
            type: "Curtiu",
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        },
        User: {
            id: "GUID",
            name: "João",
            email: "joao@gmail.com",
            emailValid: false,
            password: "*******",
            created_at: new Date().toString(),
            updated_at: new Date().toString()
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc)