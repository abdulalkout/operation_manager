// rigSeeds.js

require("dotenv").config();
require("./config/database");

const Rig = require("./models/rig");

(async function () {
  await Rig.deleteMany({});

  const rigs = await Rig.create([
    {
      name: "Rig 1",
      well: null,
      type: "Rig",
      condition: "Working",
    },
    {
      name: "Rig 2",
      well: null,
      type: "Workover",
      condition: "Standby",
    },
    // Add more rigs as needed
  ]);

  console.log("Rigs:", rigs);

  process.exit();
})();
