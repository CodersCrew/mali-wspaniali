import { DocumentSnapshot } from '@google-cloud/firestore';

interface Document {
    id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [field: string]: any;
}

export const getDocumentFromSnapshot = (snapshot: DocumentSnapshot): Document | undefined => {
    if (!snapshot.exists) {
        return undefined;
    }

    const data = snapshot.data();

    return {
        ...data,
        id: snapshot.id
    };
};