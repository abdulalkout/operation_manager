const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wellSchema = new Schema(
  {
    name: { type: String, required: true },
    field: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    type: { type: String, default: "Well" },
    status: { type: String, enum: ["Working", "Standby"], required: true },
    operation: {
      type: String,
      enum: ["Production", "Development"],
      required: true,
    },
    rig: { type: Schema.Types.ObjectId, ref: "Rig" },
    operationActivities: [
      {
        name: { type: String, required: true },
        status: {
          type: String,
          enum: ["Planned", "On-going", "Finished"],
          required: true,
        },
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

wellSchema.path("operationActivities").required(false);

module.exports = mongoose.model("Well", wellSchema);
