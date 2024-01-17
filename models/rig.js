// models/rig.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rigSchema = new Schema(
  {
    name: { type: String, required: true },
    well: { type: Schema.Types.ObjectId, ref: "Well" },
    type: {
      type: String,
      enum: ["Rig", "Workover", "Rigless"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Working", "Standby", "Rigless"],
      required: true,
    },
    operationActivities: [
      {
        name: { type: String, required: true },
        status: { type: String, required: true },
        operationText: { type: String },
        request: {
          type: String,
          enum: ["Approved", "Pending", "Declined"],
          required: true,
        },
        requester: { type: String, required: true },
        approval: { type: String, required: true },
        production: Number,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rig", rigSchema);
