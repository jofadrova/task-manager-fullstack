import { test, expect } from '@playwright/test';

test('un usuario puede iniciar sesión, crear una tarea y verla en la lista', async ({
  page,
  request,
}) => {
  const username = `e2e_${Date.now()}`;
  const password = 'e2e123456';

  // Preparar un usuario exclusivo para esta prueba
  const registro = await request.post('http://localhost:3000/register', {
    data: {
      nombre: 'Usuario E2E',
      username,
      password,
    },
  });

  expect(registro.ok()).toBeTruthy();

  // 1. Entrar a la aplicación
  await page.goto('/');

  // 2. Iniciar sesión
  await page
    .getByPlaceholder('Ingrese su usuario')
    .fill(username);

  await page
    .getByPlaceholder('Ingrese su contraseña')
    .fill(password);

  await page
    .getByRole('button', { name: 'Ingresar' })
    .click();

  // 3. Verificar que llegó al dashboard
  await expect(page).toHaveURL(/\/dashboard/);

  // 4. Crear una tarea
  const nombreTarea = `Tarea E2E ${Date.now()}`;

  await page
    .getByPlaceholder('Escriba una nueva tarea...')
    .fill(nombreTarea);

  await page
    .getByRole('button', { name: 'Agregar' })
    .click();

  // 5. Verificar que aparece en la lista
  await expect(
    page.getByText(nombreTarea)
  ).toBeVisible();
});