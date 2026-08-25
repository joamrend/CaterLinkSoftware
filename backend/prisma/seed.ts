import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Iniciando seed de la base de datos...");

  // Limpiar datos previos si existen
  await prisma.detalleOrden.deleteMany();
  await prisma.orden.deleteMany();
  await prisma.plato.deleteMany();
  await prisma.menuSemanal.deleteMany();
  await prisma.asistencia.deleteMany();
  await prisma.usuario.deleteMany();

  const passwordHash = await bcrypt.hash("123456", 10);

  // Crear Usuarios
  const admin = await prisma.usuario.create({
    data: {
      nombre: "Administrador General",
      email: "admin@caterlink.com",
      password: passwordHash,
      rol: "ADMIN",
      cedula: "0999999999",
    },
  });

  const proveedor = await prisma.usuario.create({
    data: {
      nombre: "Servicios de Catering Express",
      email: "proveedor@caterlink.com",
      password: passwordHash,
      rol: "PROVEEDOR",
      cedula: "0988888888",
    },
  });

  const empleado = await prisma.usuario.create({
    data: {
      nombre: "Empleado Demo",
      email: "empleado@caterlink.com",
      password: passwordHash,
      rol: "EMPLEADO",
      cedula: "0977777777",
    },
  });

  // Crear Menú Semanal con Platos
  const hoy = new Date();
  const inicioSemana = new Date(hoy.setDate(hoy.getDate() - hoy.getDay() + 1));
  const finSemana = new Date(hoy.setDate(inicioSemana.getDate() + 4));

  await prisma.menuSemanal.create({
    data: {
      fechaInicio: inicioSemana,
      fechaFin: finSemana,
      platos: {
        create: [
          { nombre: "Pollo al Horno con Puré", descripcion: "Almuerzo ejecutivo", diaSemana: 1 },
          { nombre: "Carne Guisada con Arroz", descripcion: "Opción tradicional", diaSemana: 2 },
          { nombre: "Pescado al Vapor con Ensalada", descripcion: "Opción ligera", diaSemana: 3 },
          { nombre: "Lasaña de Carne", descripcion: "Plato especial", diaSemana: 4 },
          { nombre: "Seco de Pollo con Maduros", descripcion: "Comida típica", diaSemana: 5 },
        ],
      },
    },
  });

  console.log("Seed completado con éxito:");
  console.log(`- Admin: ${admin.email}`);
  console.log(`- Proveedor: ${proveedor.email}`);
  console.log(`- Empleado: ${empleado.email}`);
  console.log("Contraseña para todos: 123456");
}

main()
  .catch((e) => {
    console.error("Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });