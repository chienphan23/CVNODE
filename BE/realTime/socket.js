import {Server as socketIO} from 'socket.io';

const connectedUsers = [];

const createSocket = (server) => {
    const io = new socketIO(server, {   // kết nối socketio với máy chủ http
        cors: {
          origin: `http://localhost:5173`
        }
      });
    // io.emit sẽ gửi đến tất cả client
    io.on("connection", (socket) => { ///Handle khi có connect từ client tới // lắng nghe sự kiện được được gửi đến từ server theo tên connect
        // tham số socket đại diện cho kết nối giữa máy chủ và client

        socket.on('setIdUser', (idUser) => {
            const user = {
              id: socket.id,
              idUser: idUser.idUser
            };
            connectedUsers.push(user);
            console.log(`User ${idUser} connected`);
            console.log(`Total connected users: ${connectedUsers.length}`);
        });
        /////////////////////////
        socket.on('sendMessageToUser', () => {});
        /////////////////////
        
        console.log("New client connected" + socket.id); 
        socket.emit("getId", socket.id);  // socket.emit sẽ gửi cho client kết nối tương ứng
        // từ kết nối gửi sự kiện


        socket.on('joinRoom', (userData) => {
          const {nameRoom} = userData
          socket.join(nameRoom) // tạo ra 1 phòng
          console.log(`User $} joined room: ${nameRoom}`);
        })
        socket.on('leaveRoom', (userData) => {
          const {nameRoom} = userData
          socket.leave(nameRoom) // tạo ra 1 phòng
        })

        socket.on("message", (data) => {// nếu sử dụng socket.to.emit => sẽ gửi cho nhũng client khác trong room trừ chính nó (người tạo ra sự kiện message)
          console.log("alo", data)  // sử dụng io.to.emit để gửi cho tất cả mọi người trong room
          io.to(data.room).emit("sendDataServerRoom", {data: data.msg})// gửi tin lên client với phòng tương ứng
        })

        socket.on("Like", ({ recipient, message }) => { // nhận like
          const recipientUser = connectedUsers.find(user => user.idUser === recipient);
          if (!recipientUser) {
              console.log(`Recipient ${recipient} not found`);
              return;
          }
  
          io.to(recipientUser.id).emit('RefecthDataFromServer', { message });// gửi sign về để refetch thông báo
        }
        )

        socket.on("Comment", ({recipient, message}) => {
          const recipientUser = connectedUsers.find(user => user.idUser === recipient);
          if (!recipientUser) {
              console.log(`Recipient ${recipient} not found`);
              return;
          }
  
          io.to(recipientUser.id).emit('RefecthDataFromServer', { message });// gửi sign về để refetch thông báo
        })
        socket.on("Follow", ({recipient, message}) => {
          const recipientUser = connectedUsers.find(user => user.idUser === recipient);
          if (!recipientUser) {
              console.log(`Recipient ${recipient} not found`);
              return;
          }
  
          io.to(recipientUser.id).emit('RefecthDataFromServer', { message });// gửi sign về để refetch thông báo
        })

        // socket.on("message", (data) => {// nếu sử dụng socket.to.emit => sẽ gửi cho nhũng client khác trong room trừ chính nó (người tạo ra sự kiện message)
        //   console.log("alo", data)  // sử dụng io.to.emit để gửi cho tất cả mọi người trong room
        //   io.to(data.room).emit("sendDataServerRoom", {data: data.msg})// gửi tin lên client với phòng tương ứng
        // })

        // socket.on("sendDataClient", function(data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
        //   socket.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
        // })
      
        socket.on("disconnect", () => {
              const index = connectedUsers.findIndex(user => user.id === socket.id);
            if (index !== -1) {
                const disconnectedUser = connectedUsers.splice(index, 1)[0];
                console.log(`User ${disconnectedUser.idUser} disconnected`);
                console.log(`Total connected users: ${connectedUsers.length}`);
            }
        });
      });
}
export {createSocket}