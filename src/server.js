const app = require('./app');

/**
 * Starts the Product API server.
 * @returns {Promise<void>}
 */
async function startServer() {
  const PORT = process.env.PORT || 3000;
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
