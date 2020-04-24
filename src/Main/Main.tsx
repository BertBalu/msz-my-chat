import React, { Component } from "react";

import { ConversationDto } from "../Service/chat";
import { proxy } from "../Service/proxy";
import { LeftPane } from "./LeftPane";
import {RightPane} from "./RightPane"

export class Main extends Component {
    state = { selectedConversation: undefined as (ConversationDto | undefined) };
    render() {
        return (
            <div className={"main row " + (this.state.selectedConversation? "right": "left")}>
                <LeftPane
                    inbox={proxy.inbox!}
                    selectedConversation={this.state.selectedConversation}
                    onSelect={c => this.setState({ selectedConversation: c })} />
                <RightPane conversation={this.state.selectedConversation} onBack={() => this.setState({selectedConversation: undefined})} />
            </div>
        )
    }
}