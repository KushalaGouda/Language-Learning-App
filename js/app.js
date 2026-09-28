// ==========================================
// FIREBASE + FIRESTORE
// ==========================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// ==========================================
// FIREBASE CONFIGURATION
// ==========================================

const firebaseConfig = {

    apiKey: "AIzaSyCMITTQttGEu37pAt0hv44X1el6m0ToODM",

    authDomain: "lingualearn-8d330.firebaseapp.com",

    projectId: "lingualearn-8d330",

    storageBucket: "lingualearn-8d330.firebasestorage.app",

    messagingSenderId: "855220695531",

    appId: "1:855220695531:web:8a5b414ace6dd93a0ce9ae",

    measurementId: "G-1XRFXQ5PST"

};


// ==========================================
// INITIALIZE FIREBASE
// ==========================================

const app =
    initializeApp(firebaseConfig);


const db =
    getFirestore(app);


const auth =
    getAuth(app);


console.log(
    "Firebase initialized successfully!"
);

console.log(
    "Firestore initialized successfully!"
);


// ==========================================
// SAVE LEARNING PROGRESS
// ==========================================

window.saveLearningProgress = async function(
    wordsLearned,
    language
) {
    try {

        const user = auth.currentUser;

        if (!user) {
            console.log("No logged-in user.");
            return;
        }

        await addDoc(
            collection(db, "progress"),
            {
                userId: user.uid,

                language:
                    language || "kannada",

                wordsLearned:
                    wordsLearned,

                updatedAt:
                    serverTimestamp()
            }
        );

        console.log(
            "Learning progress saved for:",
            language
        );

    } catch (error) {

        console.error(
            "Error saving learning progress:",
            error
        );

    }
};

// ==========================================
// SAVE QUIZ RESULT
// ==========================================

window.saveQuizResult = async function(
    score,
    totalQuestions,
    language
) {

    try {

        const user = auth.currentUser;


        if (!user) {

            console.log(
                "No logged-in user."
            );

            return;

        }


        const percentage =
            Math.round(
                (score / totalQuestions) * 100
            );


        await addDoc(
            collection(
                db,
                "quizResults"
            ),
            {

                userId:
                    user.uid,

                language:
                    language || "kannada",

                score:
                    score,

                totalQuestions:
                    totalQuestions,

                percentage:
                    percentage,

                completedAt:
                    serverTimestamp()

            }
        );


        console.log(
            "Quiz result saved for user:",
            user.uid
        );


        console.log(
            "Quiz language:",
            language || "kannada"
        );


    }

    catch (error) {

        console.error(
            "Error saving quiz result:",
            error
        );

    }

};

// ==========================================
// EXPORT
// ==========================================

export {
    app,
    db
};