const app = require("./app");

const PORT = 3000;

app.get('/health', (_req: any, res: any) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor ejecutándose en http://0.0.0.0:${PORT}`);
});