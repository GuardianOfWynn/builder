export class Workspace {

    collections: WorkspaceCollection[];

    constructor() {
        this.collections = [];
    }

}

export class WorkspaceCollection {
    uuid: string;
    name: string;
    elements: WorkspaceElement[];
}

export class WorkspaceElement {

    name: string;
    type: ElementType;
    hash: string;
    uuid: string;

}

export enum ElementType {
    BUILD = "build", RECIPE = "recipe"
}