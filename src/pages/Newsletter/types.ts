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

export enum SidebarElementState {
    Inactive = 'INACTIVE',
    Ready = 'READY',
    Error = 'ERROR',
    Done = 'DONE',
    FileError = 'FILEERROR',
}

export enum PrimaryInputValues {
    parents = 'PARENTS',
    kindergartens = 'KINDERGARTENS',
}

export enum SecondaryInputValues {
    all = 'ALL',
    kindergarten = 'KINDERGARTEN',
    single = 'SINGLE',
}
