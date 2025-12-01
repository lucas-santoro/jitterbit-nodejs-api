const app = require('./src/app');
require('./src/database/postgres');

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
