import firebase from "./firebaseClient";

export const auth = firebase.auth();

export const signIn = async (email, password) => {
  return await auth.signInWithEmailAndPassword(email, password);
};
