import { ProjectCreateViewModel } from '../viewmodel/ProjectCreateViewModel';

export default class ProjectController {

    async create(req: any, res: any, next: any) {
        const project: ProjectCreateViewModel = req.body;
        try {
            await req.service.projectService.create(req.session.userId, project);

            res.status(201).json();
        } catch(err) {
            next(err);
        }
    }

    async update(req: any, res: any, next: any) {
        const project: ProjectCreateViewModel = req.body;
        try {
            await req.service.projectService.update(req.session.userId, project);

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }

    async delete(req: any, res: any, next: any) {
        const {projectId} = req.params;
        try {
            await req.service.projectService.delete(req.session.userId, projectId);

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }

}