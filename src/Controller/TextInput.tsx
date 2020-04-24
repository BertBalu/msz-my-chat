import { Component } from "react";
import React from "react";

import './TextInput.css'

export interface TextInputOptions {
    value?: string;
    onChange?: (value: string) => void;
    type?: "text" | "password" | "email";
    placeholder?: string;
    onEnter?: () => void;
    autofocus?: boolean;
}

export class TextInput extends Component<TextInputOptions> {
    state = { value: this.props.value, focus: false };

    render() {
        let attrs = {} as any;
        if(this.props.autofocus)
            attrs.autoFocus = true;
        if(this.props.onEnter)
            attrs.onKeyDown = e => {
                if(e.KeyCode === 13)
                    this.props.onEnter!();
            };

        return (
            <div className="text-input">
                <input {...attrs} type={this.props.type ?? "text"} value={this.state.value}
                    onChange={e => {
                        this.setState({ value: e.target.value });
                        this.props.onChange?.(e.target.value);
                    }}
                    onBlur={() => this.setState({ focus: false })}
                    onFocus={() => this.setState({ focus: true })} />
                <div className="focus-indicator"></div>
                <label className={this.state.value || this.state.focus ? "subsided" : ""}>
                    {this.props.placeholder}
                </label>
            </div>
        )
    }
}