import { model, Schema, Types } from "mongoose";

export interface IMessage {
  id?: string;
  chat: typeof Types.ObjectId;
  role: string;
  content: string;
}

const messageSchema = new Schema<IMessage>(
  {
    chat: {
      type: Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Remove the chat field from the message object
 */
messageSchema.methods.toJSON = function () {
  const message = this.toObject();
  delete message.chat;
  message.id = message._id.toString();
  delete message._id;
  delete message.__v;
  return message;
};

const Message = model<IMessage>("Message", messageSchema);

export default Message;
