
const getBaseUrl = (path) => {
    const url = new URL(path, process.env.MAIN_HOST)
    return url
};

export default getBaseUrl;