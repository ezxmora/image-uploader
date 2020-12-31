// Required modules
const { port } = require('./src/config/config');
const app = require('./src/app');

// Server initialization
app.listen(port || 8001, () => {
    console.log(`Server running in ${port || 8001}`)
});
