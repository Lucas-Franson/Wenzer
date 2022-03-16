import { IPostProps } from '../Components/Post/interface';
import image1 from '../Utils/image/bg_about.svg';
import image2 from '../Utils/image/bg_business.svg';
import image3 from '../Utils/image/bg_home2.svg';


export const postMock: IPostProps[] = [
    {
        created_at: new Date(),
        description: 'Um projeto teste mockado',
        id: 1, 
        idProject: 12,
        idUser: 13,
        photo: image1,
        title: 'Um projeto teste',
        update_at: new Date()
    },
    {
        created_at: new Date(),
        description: 'Um projeto teste mockado 2',
        id: 2, 
        idProject: 22,
        idUser: 23,
        photo: image2,
        title: 'Um projeto teste 2',
        update_at: new Date()
    },
    {
        created_at: new Date(),
        description: 'Um projeto teste mockado 3',
        id: 3, 
        idProject: 32,
        idUser: 33,
        photo: image3,
        title: 'Um projeto teste 3',
        update_at: new Date()
    },
]