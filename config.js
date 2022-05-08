const apiUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/api' // development api
    : 'http://localhost:3000/api'; // production api

const apiDados = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000' // development api
    : 'http://localhost:5000'; // production api

export {
    apiUrl,
    apiDados
};