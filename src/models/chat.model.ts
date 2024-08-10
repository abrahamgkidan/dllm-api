import { model, Schema, Types } from "mongoose";
import { IMessage } from "./message.model";

export interface IChat {
  id?: string;
  user?: string;
  title: string;
  messages?: IMessage[];
}

const chatSchema = new Schema<IChat>(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      //   required: true,
    },
    title: {
      type: String,
    },
    messages: [
      {
        type: Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);


/**
 * Remove the user field from the chat object
 */
chatSchema.methods.toJSON = function () {
  const chat = this.toObject();
  delete chat.user;
  chat.id = chat._id.toString();
  delete chat._id;
  delete chat.__v;
  return chat;
};

const Chat = model<IChat>("Chat", chatSchema);

export default Chat;
