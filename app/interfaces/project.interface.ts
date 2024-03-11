import {
    COLLABORATOR_ROLE,
    PROJECT_STATUS,
    PROJECT_VISIBILITY,
} from '../enums';

import { UserDetail } from './userDetail.interface';

export interface Project {
    id?: any;
    title?: any;
    name?: string;
    createdBy?: Collaborator;
    description?: string;
    status?: PROJECT_STATUS;
    liveLink?: string;
    github?: string;
    designLink?: string;
    visibility?: PROJECT_VISIBILITY;
    discordChannel?: string;
    collaborators?: UserDetail[];
    notes?: string;
    steps?: string;
    deliverables?: string;
    image?: string;
    scope?: string;
}

export interface Collaborator {
    id?: string;
    name?: string;
    email?: string;
    techSkill?: string;
    role?: COLLABORATOR_ROLE;
}
