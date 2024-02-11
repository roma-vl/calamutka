export default class UserHandlers {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
    this.users = {};
    this.roomId = socket.roomId;
    this.userName = socket.userName;

    if (!this.users[this.roomId]) {
      this.users[this.roomId] = [];
    }
  }

  updateUserList() {
    this.io.to(this.roomId).emit('user_list:update', this.users[this.roomId]);
  }

  handleUserAdd() {
    this.socket.on('user_add', (user) => {
      this.socket.to(this.roomId).emit('log', ` ${this.userName} connected`);
      user.socketId = this.socket.id;
      this.users[this.roomId].push(user);
      this.updateUserList();
    });
  }

  handleDisconnect() {
    this.socket.on('disconnect', () => {
      if (!this.users[this.roomId]) return;
      this.socket.to(this.roomId).emit('log', `${this.userName} disconnected`);
      this.users[this.roomId] = this.users[this.roomId].filter((u) => u.socketId !== this.socket.id);
      this.updateUserList();
    });
  }
}
