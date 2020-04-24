import React, { Component } from "react";
import { ConversationDto } from "../Service/chat";
import { proxy } from "../Service/proxy";
import { TextInputAndButton } from "../Controller/TextInputAndButton";
import { MessageCard } from "./MessageCard";

export class RightPane extends Component<{
    conversation?: ConversationDto,
    onBack: () => void
}> {
    componentDidMount() {
        proxy.addEventListener("message", (cid, m) => {
            if (cid === this.props.conversation?.channelId)
                this.forceUpdate();
        }, this);
    }

    componentWillUnmount() {
        proxy.removeAllEventListener(this);
    }

    onSend(text: string) {
        proxy.sendPackage({
            type: "message", channelId: this.props.conversation!.channelId,
            referenceTo: 0, contentType: 0, content: "H: " + text
        });

        return true;
    }

    render() {
        return (
            <div className="right-pane column">
                {this.props.conversation &&
                    <>
                        <div className="conversation-header row">
                            <button type="button" className="only-narrow" onClick={() => this.props.onBack()}>Back</button>
                            <p>{this.props.conversation?.name}</p>
                        </div>
                        <div className="messages">
                            {this.props.conversation?.lastMessages.map(x =>
                                <MessageCard key={x.id} message={x} own={x.senderId === proxy.inbox?.user.id} />)}
                        </div>
                        <div className="send-message row">
                            <TextInputAndButton type="text" placeholder="Type something awesome here..." buttonContent="Send" onClick={x => this.onSend(x)} />
                        </div>
                    </>
                }
            </div>);
    }
}