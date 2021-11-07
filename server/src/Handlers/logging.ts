const loggedAt = (): string => {
    return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any) => {
    if (object) {
        console.log(`[${loggedAt()}] [INFO] [${namespace}] ${message}`, object);
    } else {
        console.log(`[${loggedAt()}] [INFO] [${namespace}] ${message}`);
    }
};

export default {
    info,
};
