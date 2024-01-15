// wellSeeds.js

require("dotenv").config();
require("./config/database");

const Well = require("./models/well");
const Rig = require("./models/rig");

(async function () {
  await Well.deleteMany({});
  await Rig.deleteMany({});

  const wells = await Well.create([
    {
      name: "Well 1",
      field: "Field A",
      location: ["Latitude 1", "Longitude 1"],
      status: "Working",
      operation: "Production",
      rig: null,
      operationActivities: [
        {
          name: "Activity 1",
          status: "InProgress",
          operationText: "Working on maintenance",
          request: "Approved",
          requester: "Company Man 1",
          approval: "Manager 1",
        },
        // Add more activities as needed
      ],
    },
    {
      name: "Well 2",
      field: "Field B",
      location: ["Latitude 2", "Longitude 2"],
      status: "Not Working",
      operation: "Development",
      rig: null,
      operationActivities: [],
    },
    // Add more wells as needed
  ]);

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

  console.log("Wells:", wells);
  console.log("Rigs:", rigs);

  process.exit();
})();
