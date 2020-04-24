import { InboxDto, IncomingPacket, OutgoingPacket, MessageDto } from "./chat";
import { EventProducer } from "../Helpers/events";

interface ProxyEventMap {
    "login": () => void;
    "message": (channelId: string, message: MessageDto) => void;
    "conversation": (channelId: string) => void;
}

class Proxy extends EventProducer<ProxyEventMap> {
    private ws: WebSocket
    inbox: InboxDto | null = null;

    constructor() {
        super();

        this.ws = new WebSocket("wss://raja.aut.bme.hu/chat/");
        this.ws.addEventListener("message", e => {
            let p = <IncomingPacket>JSON.parse(e.data);
            console.log(p);

            switch (p.type) {
                case "error":
                    alert(p.message);
                    break;
                case "login":
                    this.inbox = p.inbox;
                    this.dispatch("login");
                    break;
                case "message":
                    let cid = p.channelId;
                    this.inbox!.conversations.find(x => x.channelId === cid)?.lastMessages.push(p.message);
                    this.dispatch("message", cid, p.message);
                    break;
                case "conversationAdded":
                    this.inbox!.conversations.push(p.conversation);
                    this.dispatch("conversation", p.conversation.channelId);
                    break;
            }
        });
    }

    sendPackage(packet: OutgoingPacket) {
        let p = JSON.stringify(packet);
        console.log(p);
        this.ws.send(p);
    }
}

export var proxy = new Proxy();