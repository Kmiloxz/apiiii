const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let usuarios = [
  { id: 1, nombre: "Camilo", email: "camilo@sena.edu.co" },
  { id: 2, nombre: "Daniel", email: "daniel@sena.edu.co" },
  { id: 3, nombre: "Rosa", email: "rosa@sena.edu.co" }
];

app.get("/api/v1/usuarios", (req, res) => {
  res.status(200).json({
    message: "Lista de usuarios",
    data: usuarios
  });
});

app.get("/api/v1/usuarios/:id", (req, res) => {
  const { id } = req.params;
  try {
    const myId = parseInt(id);
    if (!isNaN(myId)) {
      const usuario = usuarios.find(u => u.id === myId);
      if (usuario) {
        res.status(200).json({
          message: "Usuario encontrado",
          data: usuario
        });
      } else {
        res.status(404).json({
          message: "Usuario no encontrado"
        });
      }
    } else {
      res.status(400).json({
        message: "ID no tiene el formato correcto"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al buscar el usuario"
    });
  }
});

app.post("/api/v1/usuarios", (req, res) => {
  try {
    const { nombre, email } = req.body;
    if (!nombre || !email) {
      return res.status(400).json({
        message: "Nombre y email son obligatorios"
      });
    }

    const nuevoUsuario = {
      id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
      nombre,
      email
    };

    usuarios.push(nuevoUsuario);

    res.status(201).json({
      message: "Usuario creado exitosamente",
      data: nuevoUsuario
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el usuario"
    });
  }
});

app.put("/api/v1/usuarios/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email } = req.body;
    const usuario = usuarios.find(u => u.id == id);

    if (!nombre || !email) {
      return res.status(400).json({
        message: "Nombre y email son obligatorios"
      });
    }

    if (usuario) {
      usuario.nombre = nombre;
      usuario.email = email;
      res.status(200).json({
        message: "Usuario actualizado correctamente",
        data: usuario
      });
    } else {
      res.status(404).json({
        message: "Usuario no encontrado"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar el usuario"
    });
  }
});


app.delete("/api/v1/usuarios/:id", (req, res) => {
  try {
    const { id } = req.params;
    const myId = parseInt(id);

    if (isNaN(myId)) {
      return res.status(400).json({
        message: "ID no tiene el formato correcto"
      });
    }

    const usuario = usuarios.find(u => u.id === myId);
    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado"
      });
    }

    usuarios = usuarios.filter(u => u.id !== myId);

    res.status(200).json({
      message: "Usuario eliminado correctamente"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar el usuario"
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor funcionando en el puerto ${PORT}`);
});
