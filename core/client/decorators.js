export function initialData(url, stateProperty) {
    return (target, property, descriptor) => {
        target.asyncLoad = url;
        return target;
    };
}
