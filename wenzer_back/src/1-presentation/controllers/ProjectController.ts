import PostCreateViewModel from '../viewmodel/PostCreateViewModel';
import { ProjectCreateViewModel } from '../viewmodel/ProjectCreateViewModel';

export default class ProjectController {

    async get(req: any, res: any, next: any) {
        const { _id } = req.params;
        try {
            let project = await req.service.projectAppService.get(req.session.userId, _id);

            res.status(200).json(project);
        } catch(err) {
            next(err);
        }
    }

    async create(req: any, res: any, next: any) {
        const project: ProjectCreateViewModel = req.body;
        try {
            if (req.files) {
                project.photo = req.files.photo;
            }
            if (typeof project.tags === 'string' && project.tags != '') {
                project.tags = JSON.parse(project.tags);
            }
            await req.service.projectAppService.create(req.session.userId, project);

            res.status(201).json();
        } catch(err) {
            next(err);
        }
    }

    async update(req: any, res: any, next: any) {
        const project: ProjectCreateViewModel = req.body;
        try {
            if (req.files) {
                project.photo = req.files.photo;
            }
            if (typeof project.tags === 'string' && project.tags != '') {
                project.tags = JSON.parse(project.tags);
            }
            await req.service.projectAppService.update(req.session.userId, project);

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }

    async delete(req: any, res: any, next: any) {
        const {projectId} = req.params;
        try {
            await req.service.projectAppService.delete(projectId);

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }

    async getByUser(req: any, res: any, next: any) {
        const { idUser } = req.params;
        try {
            const projects = await req.service.projectAppService.getByUser(idUser);

            res.status(200).json(projects);
        } catch(err) {
            next(err);
        }
    }

    async highProjects(req: any, res: any, next: any) {
        try {
            const projects = await req.service.projectAppService.highProjects();

            res.status(200).json(projects);
        } catch(err) {
            next(err);
        }
    }

    async follow(req: any, res: any, next: any) {
        const { idProject } = req.body;
        try {
            await req.service.projectAppService.follow(req.session.userId, idProject);

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }

    async createPost(req: any, res: any, next: any) {
        const post: PostCreateViewModel = req.body;
        try {
            if (req.files) {
                post.photo = req.files.photo;
            }
            await req.service.projectAppService.createPost(req.session.userId, post);

            res.status(201).json();
        } catch(err) {
            next(err);
        }
    }

}