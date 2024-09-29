import { Client, Account ,Databases} from "appwrite";
const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("66f7e5f30022fdc8c63f");

export const account = new Account(client);
///database
export const databases = new Databases(client,"66f7e6810015f15e3964");