import { Component, createRef } from "react";
import React from "react";
import { proxy } from "../Service/proxy";
import { TextInput } from "../Controller/TextInput";

export class Login extends Component {
    state = { email: "", password: "", displayName: "", register: false };
    name = createRef<TextInput>();

    render() {
        return (
            <div className="login">
                <img src="logo512.png" width="256" />
                <TextInput type="email" placeholder="Email (someone@example.com)" value={this.state.email} onChange={e => {
                    this.setState({ email: e });
                    if (e === "hnn9ga" || e === "HNN9GA") {
                        this.setState({ displayName: "Bálint" });
                        this.name.current?.setState({value: "Bálint"});
                    }
                }} onEnter={() => this.onClick()} autofocus={true} />
                <TextInput type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({ password: e })} onEnter={() => this.onClick()} autofocus={false} />
                {this.state.register && <TextInput type="text" ref={this.name} placeholder="Display Name (AgentSmith)" value={this.state.displayName} onChange={e => this.setState({ displayName: e })} onEnter={() => this.onClick()} autofocus={false} />}

                <button type="button" onClick={() => this.onClick()}>{this.state.register ? "Register" : "Login"}</button>
                <p>
                    {this.state.register ? "Switch back to " : "Have no account yet? Go and "}
                    <a href="" onClick={e => { e.preventDefault(); this.setState({ register: !this.state.register }); }}>
                        {this.state.register ? "Login" : "Register"}
                    </a>
                </p>
                <a href="https://www.google.hu/search?q=privacy">Privacy Policy</a>
            </div>
        );
    }

    onClick() {
        if (this.state.register) {
            proxy.sendPackage({ type: "register", email: this.state.email, password: this.state.password, displayName: this.state.displayName, staySignedIn: false });
        } else {
            proxy.sendPackage({ type: "login", email: this.state.email, password: this.state.password, staySignedIn: false });
        }
    }
}