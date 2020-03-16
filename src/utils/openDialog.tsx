import React from 'react';
import * as ReactDOM from 'react-dom';

export interface ActionDialog {
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onAnswer: (value: any) => void;
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
              resolve({ cancel: true });
            }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onAnswer={(value: any) => {
              ReactDOM.unmountComponentAtNode(dialogElement);
              resolve({ answer: value, cancel: false });
            }}
          />
        }
      </>,
      dialogElement,
    );
  });
}
