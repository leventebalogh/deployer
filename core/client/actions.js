export function setConfig(config) {
    return { type: 'SET_CONFIG', config };
}

export function startLoading() {
    return { type: 'START_LOADING' };
}

export function stopLoading() {
    return { type: 'STOP_LOADING' };
}
