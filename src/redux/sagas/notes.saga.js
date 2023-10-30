import axios from "axios";
import { put, takeLatest, call } from "redux-saga/effects";

// Function to add a note
function* addNote(action) {
  try {
    const { recipeID, noteDescription } = action.payload;
    yield call(axios.post, `/api/notes/${recipeID}`, { noteDescription });
    yield put({ type: "FETCH_NOTES", payload: recipeID }); // Refresh the notes after adding
  } catch (error) {
    console.log("ERROR in addNote", error);
    alert("Failed to add note.");
  }
}

// Function to delete a note
function* deleteNote(action) {
  try {
    const { recipeID, noteID } = action.payload;
    yield call(axios.delete, `/api/notes/${recipeID}/${noteID}`);
    yield put({ type: "FETCH_NOTES", payload: recipeID }); // Refresh the notes after deleting
  } catch (error) {
    console.log("ERROR in deleteNote", error);
    alert("Failed to delete note.");
  }
}

// Function to get notes
function* getNotes(action) {
  try {
    const recipeID = action.payload;
    let response = yield axios.get(`/api/notes/${recipeID}`);
    yield put({ type: "SET_NOTES", payload: response.data });
  } catch (error) {
    console.log("ERROR in getNotes", error);
    alert("Failed to retrieve notes.");
  }
}

// Function to edit a note
function* editNote(action) {
  try {
    const { recipeID, noteID, noteDescription } = action.payload;
    yield call(axios.put, `/api/notes/${recipeID}/${noteID}`, { noteDescription });
    yield put({ type: "FETCH_NOTES", payload: recipeID }); // Refresh the notes after editing
  } catch (error) {
    console.log("ERROR in editNote", error);
    alert("Failed to edit note.");
  }
}

function* notesSaga() {
  yield takeLatest("FETCH_NOTES", getNotes);
  yield takeLatest("ADD_NOTE", addNote); // Listen for adding note
  yield takeLatest("DELETE_NOTE", deleteNote); // Listen for deleting note
  yield takeLatest("EDIT_NOTE", editNote); // Listen for editing note
}

export default notesSaga;
