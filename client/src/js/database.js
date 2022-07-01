import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

//PUT DB
export const putDb = async (content) => {
  try {
    const jateDB = await openDB("jate", 1);
    const tx = jateDB.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const request = store.put({ content });
    const result = await request;
  } catch (err) {
    console.error(err);
  }
};

//GET ALL DB
export const getDb = async () => {
  try {
    const jateDB = await openDB("jate", 1);
    const tx = jateDB.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const request = store.getAll();
    const result = await request;
    return result;
  } catch (err) {
    console.error(err);
  }
};

initdb();
