const app = require('./app');

const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';

app.listen(PORT, () => console.log(`Server running on port ${PORT} (${isProd ? 'production' : 'development'})`));
