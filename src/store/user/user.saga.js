import { takeLatest, all, call, put} from 'redux-saga/effects';
import { USER_ACTION_TYPES } from "./user.types";
import { signInSuccess, signInFailed, signUpFailed, signUpSuccess, signOutSuccess, signOutFailed } from './user.action';
import { getCurrentUser, createUserFromAuth, signInWithGooglePopup, signInAuthUserWithEmailndPassword, createAuthUserWithEmailndPassword, signOutUser } from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
  try {
    const userSnapshot = yield call(createUserFromAuth, userAuth, additionalInformation)
    yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
  } catch(error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user)
  } catch(error) {
    yield put(signInFailed(error));
  }
}

function* signInWithEmail({ payload: { email, password }}) {
  try {
    const { user } = yield call(signInAuthUserWithEmailndPassword, email, password);
    yield call(getSnapshotFromUserAuth, user)
  } catch(error) {
    yield put(signInFailed(error))
  }
}

export function * isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser)
    if(!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth)
  } catch(error) {
    console.log('@@@')
    yield put(signInFailed(error))
  }
}

export function* signUp({ payload: { email, password, displayName }}) {
  try {
    const { user } = yield call(createAuthUserWithEmailndPassword, email, password)
    yield put(signUpSuccess(user, { displayName }))
  } catch(error) {
    console.log('!!!')
    yield put(signUpFailed(error))
  }
}

export function* signOut() {
  try {
    yield call(signOutUser)
    yield put(signOutSuccess())
  } catch(error) {
    yield put(signOutFailed(error))
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails }}) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails)
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* userSagas() {
  
  yield all([
    call(onCheckUserSession), 
    call(onGoogleSignInStart), 
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart)
  ]);
}