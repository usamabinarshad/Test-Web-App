const config = {
  port: process.env.PORT || 4000,
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  },
};

export default config;
