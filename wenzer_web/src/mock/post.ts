import { IPostProps } from '../Components/Post/interface';
import image1 from '../Utils/image/bgFgtsDescktop.jpg';
import image2 from '../Utils/image/got.png';
import image3 from '../Utils/image/bg_home2.svg';


export const postMock: IPostProps[] = [
    {
        created_at: new Date(),
        description: 'Um projeto teste mockado',
        id: 1, 
        idProject: 12,
        idUser: 13,
        photo: image3,
        title: 'Um projeto teste',
        updated_at: new Date(),
        goodIdea: false,
        user: { name: '', photo: null }
    },
    {
        created_at: new Date(),
        description: 'Um projeto teste mockado 2 lorem ipsum asd asd sd asd asdsd sda sdsadasdas asds dadsdasd sdsd adasdasda asd sdsd as sdads asd asd asds dads dasdsd asdasd asd  as sdads asd asd asds dads dasdsd asdasd asd  as sdads asd asd asds dads dasdsd asdasd asd  as sdads asd asd asds dads dasdsd asdasd asd  as sdads asd asd asds dads dasdsd asdasd asd  as sdads asd asd asds dads dasdsd asdasd asd asdasds dasd asdasd asdsd ',
        id: 2, 
        idProject: 22,
        idUser: 23,
        photo: new Buffer(''),
        title: 'Um projeto teste 2',
        updated_at: new Date(),
        goodIdea: false,
        user: { name: '', photo: null }
    },
    {
        created_at: new Date(),
        description: 'Um projeto teste mockado 3',
        id: 3, 
        idProject: 32,
        idUser: 33,
        photo: new Buffer(''),
        title: 'Um projeto teste 3',
        updated_at: new Date(),
        goodIdea: false,
        user: { name: '', photo: null }
    },
]