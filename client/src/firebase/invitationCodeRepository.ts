import firebaseApp from 'firebase/app';

export const invitationCodeRepository = (db: firebaseApp.firestore.Firestore) => ({
    getCodeDocByUserInput: async (inputCode: string) => {
        const snapshot = await db
            .collection('invitation-code')
            .where('code', '==', inputCode)
            .get();

        return snapshot.docs.map(doc => doc.data());
    },
});
