import Http from "http";

import SocketIo from "socket.io";

export default class SocketService {
  private io?: SocketIo.Server;

  constructor() {
    this.io = undefined;
  }

  public readonly deferredInit = (
    httpServer: Http.Server,
    socketLoader: (io: SocketIo.Server) => void,
  ): void => {
    this.io = SocketIo(httpServer);
    socketLoader(this.io);
  };

  public async broadcastRoom<TData>(
    room: string,
    event: string,
    data?: TData,
  ): Promise<void> {
    if (!this.io) {
      throw new Error("Socket server not ready");
    }

    this.io.to(room).emit(event, data);
  }
}
