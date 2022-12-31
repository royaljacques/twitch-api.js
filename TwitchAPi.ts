import {EventEmitter} from "node:events";
import {Events} from "./src/Events";
import {WebSocket} from "ws";
import {Intents} from "./src/utils/Intents";
import {SocketManager} from "./src/sockets/SocketManager";

const client = new WebSocket("wss://eventsub-beta.wss.twitch.tv/ws");

export declare interface TwitchAPi{
    on<U extends keyof Events>(event: U, listener: Events[U]): this;
    emit<U extends keyof Events>(event: U, ...args: Parameters<Events[U]>): boolean;
}

export class TwitchApi extends EventEmitter{
    public sessionId;
    private readonly Intents: Array<any>;
    constructor(props) {
        super(props);
        this.Intents = props.Intents;
    }

    login(option: {token: string, clientId: string, userId: string}){
        client.on("open", open=>{
            console.log("Session open")
        })
        client.on("message", async (data) =>{
            const parseData = JSON.parse(data.toString());
            if (parseData.metadata.message_type === "session_welcome") {
                this.sessionId = parseData.payload.session.id;
                let socketManager = new SocketManager({intents: this.Intents, token: option.token, clientId: option.clientId, userId: option.userId, sessionId: this.sessionId})
                socketManager.connectToEvents();
            }else {
                this.emit(parseData.metadata.message_type, parseData);
            }
        })
    }

}
