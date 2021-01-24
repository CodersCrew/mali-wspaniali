import React from 'react';
import * as ReactDOM from 'react-dom';

import { ThemeProvider } from '../theme/ThemeProvider';

export type Decision<T = {}> = {
    accepted: boolean;
} & T;

export interface ActionDialog<T = {}> {
    onClose: () => void;
    makeDecision: (decision: Decision<T>) => void;
}

export interface DialogResult<T = {}> {
    close?: boolean;
    decision?: Decision<T>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function openDialog<T, G = {}>(Dialog: React.FC<any>, options: T): Promise<DialogResult<G>> {
    return new Promise((resolve) => {
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
                        makeDecision={(decision: Decision<G>) => {
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
