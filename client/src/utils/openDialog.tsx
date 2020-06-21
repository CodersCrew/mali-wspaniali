import React from 'react';
import * as ReactDOM from 'react-dom';

export type Decision = {
    accepted: boolean;
};

export interface ActionDialog {
    onClose: () => void;
    makeDecision: (decision: Decision) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function openDialog<T>(Dialog: React.FC<any>, options: T) {
    return new Promise(resolve => {
        const dialogElement = document.createElement('div');
        const body = document.querySelector('body') as HTMLBodyElement;

        body.prepend(dialogElement);

        ReactDOM.render(
            <>
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
            </>,
            dialogElement,
        );
    });
}
