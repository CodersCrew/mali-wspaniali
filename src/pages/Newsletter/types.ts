export type Message = string;

export type Newsletter = {
    recipients: string[];
    type: string;
    topic: string;
    message: Message;
};

export type WorkspaceProps = {
    message: string;
    setMessage: (value: string | ((prevState: string) => string)) => void;
};

export enum ProgressBarStates {
    Inactive = 'INACTIVE',
    Ready = 'READY',
    Error = 'ERROR',
    Done = 'DONE',
    FileError = 'FILEERROR',
}

export enum GeneralRecipientInputValues {
    parents = 'PARENTS',
    kindergartens = 'KINDERGARTENS',
}

export enum SpecificRecipientInputValues {
    all = 'ALL',
    kindergarten = 'KINDERGARTEN',
    single = 'SINGLE',
}
