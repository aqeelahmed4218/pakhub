import mongoose from 'mongoose';

const visitRequestSchema = new mongoose.Schema(
  {
    listingId: { type: String, required: true },
    listingTitle: { type: String, required: true },
    ownerUserRef: { type: String, required: true },
    visitorUserRef: { type: String, required: true },
    visitorName: { type: String, required: true },
    visitorEmail: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    message: { type: String },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

const VisitRequest = mongoose.models.VisitRequest || mongoose.model('VisitRequest', visitRequestSchema);

export default VisitRequest; 