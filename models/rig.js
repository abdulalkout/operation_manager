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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rig", rigSchema);
