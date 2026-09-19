
const app = require("./app");

const PORT = 3000;

app.get('/health', (_req: any, res: any) => {
  res.status(200).json({ status: 'ok' });
});

throw new Error('fallo simulado');

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

