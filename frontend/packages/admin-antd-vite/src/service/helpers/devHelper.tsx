import socketIO from "socket.io-client";
import HelperBase from "./_helperBase";

export class DevHelper extends HelperBase {
    socket: any;
    SocketSetup() {
        this.socket = socketIO("http://localhost:666");
    }
}
