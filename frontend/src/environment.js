let IS_PROD = true; 
const server = IS_PROD ? 
"https://echolink-1.onrender.com" : 
"http://localhost:8080"
export default server;
