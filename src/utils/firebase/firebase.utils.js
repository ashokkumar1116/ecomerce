import { initializeApp } from 'firebase/app'
import { 
          getAuth, 
          signInWithPopup, 
          GoogleAuthProvider, 
          createUserWithEmailAndPassword, 
          signInWithEmailAndPassword, 
          signOut, 
          onAuthStateChanged 
        } from 'firebase/auth'
import { 
  getFirestore,
  doc, 
  getDoc, 
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCglo8-sWilXdMguPVCeTcAbZIqOwkc3Go",
    authDomain: "crwn-clothing-db-118fb.firebaseapp.com",
    projectId: "crwn-clothing-db-118fb",
    storageBucket: "crwn-clothing-db-118fb.appspot.com",
    messagingSenderId: "1080233801049",
    appId: "1:1080233801049:web:fd25a9deca122cd6208848"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
      prompt: 'select_account'
  })

  export const auth = getAuth();

  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object)
    });

    await batch.commit();
    console.log('done')
  };

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapShot = await getDocs(q);
    return querySnapShot.docs.map(docSnapshot => docSnapshot.data());
  };

  export const db = getFirestore()

  export const createUserFromAuth = async (userAuth, additionalInformation={}) => {
    if(!userAuth) return
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapShot = await getDoc(userDocRef)

    if(!userSnapShot.exists())
    {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
            
        } catch (error) {
            console.log(`Error Creating The User: ${error}`)
        }
    }

    return userDocRef
  }

  export const createAuthUserWithEmailndPassword = async (email, password) => {
    if(!email || !password) return 

    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailndPassword = async (email, password) => {
    if(!email || !password) return 

    return await signInWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut(auth)

  export const  onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);