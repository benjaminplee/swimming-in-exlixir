// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const _ = require('underscore');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /scores/:pushId/score
exports.saveScore = functions.https.onRequest((req, res) => {
    // Grab the parameters.
    const username = req.query.username;
    const score = req.query.score;

    var data = {
        username: username,
        score: score
    };

    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    admin.database().ref('/scores').push(data).then(snapshot => {
      res.status(201).send(data);
    });
  });
  
exports.getScores = functions.https.onRequest((req, res) => {
    admin.database().ref('/scores').once('value', snapshot => {
        var allScores = [];

        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            allScores.push(childData);
        });

        res.status(200).send(allScores);
    });
});

const iconList = ["a", "b", "c", "d", "e"];

exports.getRandIcons = functions.https.onRequest((req, res) => {
    const count = 3;

    // Get a random starting location
    var startingIndex = Math.random() * (iconList - count);
    console.log("Starting Index ", startingIndex);

    res.status(200).send(iconList.slice(startingIndex, startingIndex + 3));
});