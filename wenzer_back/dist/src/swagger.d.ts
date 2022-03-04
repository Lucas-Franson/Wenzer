declare const swaggerAutogen: any;
declare const outputFile = "./src/swagger_output.json";
declare const endpointsFiles: string[];
declare const doc: {
    info: {
        version: string;
        title: string;
        description: string;
    };
    host: string;
    basePath: string;
    schemes: string[];
    consumes: string[];
    produces: string[];
    tags: {
        name: string;
        description: string;
    }[];
    definitions: {
        Connections: {
            id: string;
            created_at: string;
            updated_at: string;
        };
        EmailMarketing: {
            id: string;
            email: string;
            emailValid: boolean;
            created_at: string;
            updated_at: string;
        };
        Followers: {
            id: string;
            created_at: string;
            updated_at: string;
        };
        Interests: {
            id: string;
            name: string;
            created_at: string;
            updated_at: string;
        };
        InterestsUser: {
            id: string;
            idInterests: string;
            created_at: string;
            updated_at: string;
        };
        Participants: {
            id: string;
            active: boolean;
            created_at: string;
            updated_at: string;
        };
        Post: {
            id: string;
            idUser: string;
            countViews: number;
            title: string;
            description: string;
            photo: string;
            idProject: string;
            created_at: string;
            updated_at: string;
        };
        Project: {
            id: string;
            name: string;
            description: string;
            photo: string;
            active: boolean;
            public: boolean;
            created_at: string;
            updated_at: string;
        };
        React: {
            id: string;
            type: string;
            created_at: string;
            updated_at: string;
        };
        User: {
            id: string;
            name: string;
            email: string;
            emailValid: boolean;
            password: string;
            created_at: string;
            updated_at: string;
        };
    };
};
