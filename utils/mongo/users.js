import clientPromise from "./mongo";
import bcrypt from "bcrypt";

let client;
let db;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db();
  } catch (error) {
    throw new Error("Unable to connect to database");
  }
}

(async function () {
  await init();
})();

export async function createUser(email, password, lastname, firstname, uid) {
  await init();
  try {
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) throw new Error("User already exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    const { acknowledged, insertedId } = await db
      .collection("users")
      .insertOne({
        email,
        lastname,
        firstname,
        password: hashedPassword,
        uid,
      });
    if (acknowledged) {
      const result = await db.collection("users").findOne({ _id: insertedId });
      return result;
    } else {
      throw new Error("User creation failed");
    }
  } catch (error) {
    // throw new Error(error);
    throw new Error("User creation failed");
  }
}

export async function signIn(email, password) {
  await init();
  try {
    const user = await db.collection("users").findOne({ email });
    if (!user) throw new Error("User not found");
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Incorrect password");
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

export async function githubSignInAndSignup(
  email,
  password,
  lastname,
  firstname,
  uid
) {
  await init();
  try {
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) return existingUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    const { acknowledged, insertedId } = await db
      .collection("users")
      .insertOne({
        email,
        lastname,
        firstname,
        password: hashedPassword,
        uid,
      });
    if (acknowledged) {
      const result = await db.collection("users").findOne({ _id: insertedId });
      return result;
    } else {
      throw new Error("User creation failed");
    }
  } catch (error) {
    throw new Error("User creation failed");
  }
}

export async function googleSignInAndSignup(email, lastname, firstname, uid) {
  await init();
  try {
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return existingUser;
    } else {
      const { acknowledged, insertedId } = await db
        .collection("users")
        .insertOne({
          email,
          lastname,
          firstname,
          uid,
        });
      if (acknowledged) {
        const result = await db
          .collection("users")
          .findOne({ _id: insertedId });
        return result;
      } else {
        throw new Error("User creation failed");
      }
    }
  } catch (error) {
    throw new Error("User creation failed");
  }
}

export async function updateUserBalance(email, balance) {
  await init();
  try {
    const { acknowledged } = await db.collection("users").updateOne();
  } catch (error) {
    throw new Error("User balance update failed");
  }
}
