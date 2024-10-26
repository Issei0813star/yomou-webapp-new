interface Config {
    API_BASE_URL: string;
}

const config: Config = {
    API_BASE_URL: process.env.VUE_APP_API_BASE_URL as string
};

export default config;
