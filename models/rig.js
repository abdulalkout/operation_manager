const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rigSchema = new Schema(
  {
    name: { type: String, required: true },
    well: { type: Schema.Types.ObjectId, ref: "Well" },
    type: { type: String, enum: ["Rig", "Workover"], required: true },
    condition: { type: String, enum: ["Working", "Standby"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rig", rigSchema);
