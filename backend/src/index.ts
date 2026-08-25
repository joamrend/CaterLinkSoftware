import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({ origin: "http://localhost:4200" })); // Permite conexión desde Angular
app.use(express.json());

// Endpoint de prueba de salud
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor CaterLink Backend activo 🚀" });
});

// Endpoint: Obtener métricas y datos del Dashboard
app.get("/api/dashboard", async (req, res) => {
  try {
    const [totalUsuarios, totalOrdenes, totalPlatos, ordenesRecientes] =
      await Promise.all([
        prisma.usuario.count(),
        prisma.orden.count(),
        prisma.plato.count(),
        prisma.orden.findMany({
          take: 5,
          orderBy: { fecha: "desc" },
          include: {
            usuario: { select: { nombre: true, email: true } },
            detalles: { include: { plato: true } },
          },
        }),
      ]);

    res.json({
      metrics: {
        totalUsuarios,
        totalOrdenes,
        totalPlatos,
      },
      ordenesRecientes,
    });
  } catch (error) {
    console.error("Error al obtener dashboard:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Endpoint: Obtener menú semanal activo con sus platos
app.get("/api/menu-semanal", async (req, res) => {
  try {
    const menu = await prisma.menuSemanal.findFirst({
      include: { platos: true },
      orderBy: { fechaInicio: "desc" },
    });
    res.json(menu);
  } catch (error) {
    console.error("Error al obtener menú:", error);
    res.status(500).json({ error: "Error al consultar la base de datos" });
  }
});

app.listen(PORT, () => {
  console.log(`📡 Servidor Backend corriendo en http://localhost:${PORT}`);
});