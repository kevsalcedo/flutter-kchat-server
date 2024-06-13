const { checkJWT } = require("../helpers/jwt");
const { io } = require("../index");
const { userConnected, userDisconnected, saveMessage } = require("../controllers/socket");

//mensajes io de socket.io
io.on("connection", (client) => {
  console.log("Cliente conectado :D");

  const [check, uid] = checkJWT(client.handshake.headers["x-token"]);

  //verificar auth
  if (!check) {
    return client.disconnect();
  }

  //Cliente autenticado
  userConnected(uid);

  //Ingresar al usuario a una sala privada
  client.join(uid);

  //Escuchar del cliente el mensaje privado
  client.on("private-msg", async (payload) => {
    //Grabar mensaje
    await saveMessage(payload);

    io.to(payload.for).emit("private-msg", payload);
  });

  client.on("disconnect", () => {
    userDisconnected(uid);
    console.log("Cliente desconectado :/");
  });

  /* client.on("mensaje", (payload) => {
      console.log("Mensaje: ", payload);
  
      io.emit("mensaje", { admin: "Hola admin :)" });
    }); */
});
