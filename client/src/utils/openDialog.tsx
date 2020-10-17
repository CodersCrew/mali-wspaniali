import React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from '../theme/ThemeProvider';

export type Decision = {
    accepted: boolean;
};

export interface ActionDialog {
    onClose: () => void;
    makeDecision: (decision: Decision) => void;
}

export interface DialogResult {
    close?: boolean;
    decision?: Decision;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function openDialog<T>(Dialog: React.FC<any>, options: T): Promise<DialogResult> {
    return new Promise(resolve => {
        const dialogElement = document.createElement('div');
        const body = document.querySelector('body') as HTMLBodyElement;

        body.prepend(dialogElement);

        ReactDOM.render(
            <ThemeProvider>
                {
                    <Dialog
                        {...options}
                        onClose={() => {
                            ReactDOM.unmountComponentAtNode(dialogElement);
                            resolve({ close: true });
                        }}
                        makeDecision={(decision: Decision) => {
                            ReactDOM.unmountComponentAtNode(dialogElement);
                            resolve({ decision, close: false });
                        }}
                    />
                }
            </ThemeProvider>,
            dialogElement,
        );
    });
}
