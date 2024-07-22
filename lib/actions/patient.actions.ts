import { parseStringify } from "../utils";
import { users } from "./../appwrite.config";
import { ID, Query } from "node-appwrite";

export const createUser = async (user: CreateUserParams) => {
  console.log(user);
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log({ newUser });
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);
      return existingUser?.users[0];
    }
  }
};
