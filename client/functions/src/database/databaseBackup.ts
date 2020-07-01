import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { setFileName } from './utils';

const fileName = setFileName();
const storageFolder = 'gs://mal-wsp-dev.appspot.com/backup';
const backupUrl = `${storageFolder}/${fileName}`;
const createBackup = () => {
    const client = new admin.firestore.v1.FirestoreAdminClient();

    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
    const databaseName = client.databasePath(projectId, '(default)');

    return client
        .exportDocuments({
            name: databaseName,
            outputUriPrefix: backupUrl,
            collectionIds: [],
        })
        .then(responses => {
            const response = responses[0];
            console.log(`Operation Name: ${response.name}`);
            return response;
        })
        .catch(err => {
            console.error(err);
            throw new Error('Export operation failed');
        });
};
export const databaseBackup = functions.https.onCall(async (data, context) => {
    if (context.auth) {
        try {
            await createBackup();
            return { backupUrl, fileName };
        } catch (error) {
            throw new functions.https.HttpsError('internal', error);
        }
    } else {
        throw new functions.https.HttpsError('unauthenticated', 'Not signed in');
    }
});
