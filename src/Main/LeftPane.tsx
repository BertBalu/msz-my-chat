import React, { Component } from "react";
import { InboxDto, ConversationDto } from "../Service/chat";
import { TextInputAndButton } from "../Controller/TextInputAndButton";
import { proxy } from "../Service/proxy";
import { ConversationCard } from "./ConversationCard";

export class LeftPane extends Component<{
    inbox: InboxDto,
    selectedConversation: ConversationDto | undefined,
    onSelect: (c: ConversationDto) => void
}> {
    render() {
        return (
            <div className="left-pane">
                <p className="my-tag">My tag: {this.props.inbox.user.tag}</p>
                <TextInputAndButton type="text" placeholder="Add user by Tag (Name#123)"
                    buttonContent="Invite" onClick={text => this.sendContactRequest(text)} />
                <div className="conversations">
                    {this.props.inbox.conversations.map(x =>
                        <ConversationCard key={x.channelId}
                            conversation={x}
                            selected={x === this.props.selectedConversation}
                            onSelect={() => this.props.onSelect(x)}
                        />)
                    }
                </div>
            </div>
        )
    }

    sendContactRequest(email: string): boolean {
        proxy.sendPackage({ type: "contactRequest", email, firstMessage: "H: Hello" });
        return true;
    }

    componentDidMount() {
        proxy.addEventListener("conversation", c => this.forceUpdate(), this);
    }

    componentWillUnmount() {
        proxy.removeAllEventListener(this);
    }
}