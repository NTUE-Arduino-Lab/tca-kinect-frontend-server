const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');

admin.initializeApp();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Take the text parameter passed to this HTTP endpoint and insert it into
// Cloud Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('messages').add({original: original});
    // Send back a message that we've succesfully written the message
    res.json({result: `Message with ID: ${writeResult.id} added.`});
});

exports.addImage = functions.https.onRequest(async (req, res) => {

    const imageURL = req.query.url;

    // console.log(data);
    // let response = await admin.storage().bucket("images").
    // let publicUrl = response.file.publicUrl();
    // console.log(publicUrl);

    const writeResult = await admin.firestore().collection('images').add({
        url: imageURL,
        timestamp: admin.firestore.Timestamp.now()
    });

    // Send back a message that we've succesfully written the message

    res.json({result: `image url with ID: ${writeResult.id} added.`});
});
