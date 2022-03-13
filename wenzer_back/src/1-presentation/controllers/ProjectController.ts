import { ProjectCreateViewModel } from '../viewmodel/ProjectCreateViewModel';

export default class ProjectController {

    async create(req: any, res: any, next: any) {
        const project: ProjectCreateViewModel = req.body;
        try {
            await req.service.projectAppService.create(req.session.userId, project);

            res.status(201).json();
        } catch(err) {
            next(err);
        }
    }

    async update(req: any, res: any, next: any) {
        const project: ProjectCreateViewModel = req.body;
        try {
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

}