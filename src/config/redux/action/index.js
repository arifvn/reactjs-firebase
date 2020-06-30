import firebase, { database } from "../../firebase";

export const actionRegisterUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });

    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        console.log("register success: ", result);
        dispatch({ type: "CHANGE_LOADING", value: false });
        resolve(true);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        reject(false);
      });
  });
};

export const actionLoginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });

    return firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        const dataUser = {
          email: result.user.email,
          emailVerified: result.user.emailVerified,
          uid: result.user.uid,
        };
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: dataUser });
        resolve(true);
      })
      .catch(function (error) {
        // Handle Errors here.
        // Handle error from firebase: wrong password etc.
        // var errorCode = error.code;
        // console.log(errorCode, errorMessage);
        var errorMessage = error.message;

        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        reject(errorMessage);
      });
  });
};

export const addDataToAPI = (data) => (dispatch) => {
  database.ref("notes/" + data.uid).push({
    title: data.title,
    date: data.date,
    content: data.content,
  });
};

export const updateDataToAPI = (data) => (dispatch) => {
  let apiEndPoint = database.ref(`notes/${data.uid}/${data.noteId}`);

  return new Promise((resolve, reject) => {
    apiEndPoint.set(
      {
        title: data.title,
        date: data.date,
        content: data.content,
      },
      (error) => {
        if (error) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

export const deleteDataFromAPI = (uid, noteid) => (dispatch) => {
  let apiEndPoint = database.ref(`notes/${uid}/${noteid}`);
  return new Promise((resolve, reject) => {
    apiEndPoint.remove();
  });
};

export const getDataFromAPI = (uid) => (dispatch) => {
  let apiEndPoint = database.ref("notes/" + uid);

  return new Promise((resolve, reject) => {
    apiEndPoint.on("value", function (snapshot) {
      const userNotes = [];
      if (snapshot.val() !== null) {
        Object.keys(snapshot.val()).map((key) => {
          return userNotes.push({
            key: key,
            data: snapshot.val()[key],
          });
        });
        dispatch({ type: "SET_NOTES", value: userNotes });
        resolve(userNotes);
      }
    });
  });
};
