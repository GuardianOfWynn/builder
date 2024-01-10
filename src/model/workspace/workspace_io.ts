import { ElementType, Workspace, WorkspaceElement } from "./collection";
import {v4 as uuidv4} from 'uuid';

export function getWorkspace(): Workspace  {
    if(localStorage.getItem("workspace") == null) {
        return new Workspace();
    }
    return JSON.parse(localStorage.getItem("workspace")!) as Workspace;
}

export function createCollection(name: string, elements: WorkspaceElement[]) {
    let id = uuidv4();
    let workspace = getWorkspace();
    workspace.collections.push({
        elements: elements,
        name: name,
        uuid: id
    });
    saveWorkspace(workspace);
}

export function insertInCollection(collectionId: string, name: string, hash: string, type: ElementType) {
    let workspace = getWorkspace();
    let collection = workspace.collections.filter(x => x.uuid === id)[0];
    if(collection === undefined) {
        return;
    }
    let id = uuidv4();
    collection.elements.push({
        hash: hash,
        name: name,
        type: type,
        uuid: id
    });
    saveWorkspace(workspace);
}

export function saveWorkspace(workspace: Workspace) {
    localStorage.setItem("workspace", JSON.stringify(workspace));
}

