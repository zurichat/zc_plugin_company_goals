let baseUrl;
if (process.NODE_ENV === 'development') {
    baseUrl = 'localhost:4000'
} else {
    baseUrl = 'https://goals.zuri.chat'
}

export default baseUrl;