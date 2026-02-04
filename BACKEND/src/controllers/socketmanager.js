import { Server } from "socket.io";

const connections = {};
const messages = {};
const timeOnline = {};

const connectTosocket = (server) => {

    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("something connected")
        

        socket.on("join-call", (path) => {

            if (!connections[path]) {
                connections[path] = [];
            }

            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();

            // connections[path].forEach(id => {
            //     io.to(id).emit("user-joined", socket.id, connections[path]);
            // });

            for(let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path]);
            }

            if (messages[path]) {
                messages[path].forEach(msg => {
                    io.to(socket.id).emit(
                        "chat-message",
                        msg.data,
                        msg.sender,
                        msg.socketIdSender
                    );
                });
            }
        });

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        socket.on("chat-message", (data, sender) => {

            let roomFound = null;

            for (const [room, users] of Object.entries(connections)) {
                if (users.includes(socket.id)) {
                    roomFound = room;
                    break;
                }
            }

            if (roomFound) {
                if (!messages[roomFound]) {
                    messages[roomFound] = [];
                }

                messages[roomFound].push({
                    sender,
                    data,
                    socketIdSender: socket.id
                });

                connections[roomFound].forEach(id => {
                    io.to(id).emit("chat-message", data, sender, socket.id);
                });
            }
        });

        socket.on("disconnect", () => {

            for (const [room, users] of Object.entries(connections)) {

                if (users.includes(socket.id)) {

                    connections[room] = users.filter(id => id !== socket.id);

                    connections[room].forEach(id => {
                        io.to(id).emit("user-left", socket.id);
                    });

                    if (connections[room].length === 0) {
                        delete connections[room];
                    }

                    delete timeOnline[socket.id];
                    break;
                }
            }
        });
    });

    return io;
};

export default connectTosocket;