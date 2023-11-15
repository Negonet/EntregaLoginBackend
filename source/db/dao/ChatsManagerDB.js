import { chatsModel } from "../models/chats.model";

class ChatManager {

    async updateList(chat) {
        try {
            const createOne = await chatsModel.create(chat)
            return createOne
        } catch (err) {
            return err 
        }

    }

}

export const chats = new ChatManager();