import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    toUserRef: {
      type: String,
      required: true,
    },
    fromUserRef: {
      type: String,
      required: true,
    },
    fromName: {
      type: String,
      required: true,
    },
    fromEmail: {
      type: String,
      required: true,
    },
    listingId: {
      type: String,
      required: true,
    },
    listingTitle: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message; 