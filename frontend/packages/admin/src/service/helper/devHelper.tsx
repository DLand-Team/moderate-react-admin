import socketIO from "socket.io-client";
export class DevHelper {
	static socket: any;
	static SocketSetup() {
		DevHelper.socket = socketIO("http://localhost:666");
	}
}
