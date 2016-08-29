export function setProjects(data) {
    return {
        type: 'PROJECTS_SET',
        data
    };
}

export function addProject(data) {
    return {
        type: 'PROJECTS_ADD',
        data
    };
}
