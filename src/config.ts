interface Config {
    API_BASE_URL: string;
    API_GOOGLE_BOOKS_BASE_URL: string;
}

const config: Config = {
    API_BASE_URL: process.env.VUE_APP_API_BASE_URL as string,
    API_GOOGLE_BOOKS_BASE_URL: "https://www.googleapis.com/books/v1/volumes"
};

export default config;
