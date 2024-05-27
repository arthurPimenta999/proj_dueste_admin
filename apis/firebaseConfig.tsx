import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDy2KiQXzy0Ce5CuR83G_LE6UxJLYsWFiA",
  authDomain: "projetodueste.firebaseapp.com",
  databaseURL: "https://projetodueste-default-rtdb.firebaseio.com",
  projectId: "projetodueste",
  storageBucket: "projetodueste.appspot.com",
  messagingSenderId: "989713015226",
  appId: "1:989713015226:web:2185390e6f3eeb4ac93d83",
  measurementId: "G-BH2VJ1FDZN",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

// ========== funções exemplo pra ler/gravar dados ==========

async function readData() {
  const querySnapshot = await getDocs(collection(db, "cardapioURL"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}

async function writeData() {
  try {
    const docRef = await addDoc(collection(db, "oirsrs"), {
      first: "Allan",
      middle: "Diniz Raposo Moreira",
      last: "de Góes",
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

//Deletar QUALQUER documento do BD ~~Rafinha
async function DeleteData(colecao: string, id: string) {
  try {
    const docRef = await deleteDoc(doc(db, colecao, id));
    console.log("Documento deletado com sucesso");
  } catch (e) {
    console.error("Erro ao deletar documento do ID:", id);
  }
}
