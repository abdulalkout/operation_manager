require("dotenv").config();
require("./config/database");

const Well = require("./models/well");
const Rig = require("./models/rig");

(async function () {
  try {
    await Well.deleteMany({});
    await Rig.deleteMany({});

    const wells = await Well.create([
      {
        name: "Well 1",
        field: "Field 1",

        latitude: 1,
        longitude: 1,
        type: "Well",
        status: "Working",
        operation: "Production",
        rig: null,
        operationActivities: [
          {
            name: "Activity 1",
            status: "Status 1",
            operationText: "Operation Text 1",
            request: "Approved",
            requester: "User 1",
            approval: "Manager 1",
            production: 100,
          },
        ],
      },
      {
        name: "Well 2",
        field: "Field 2",

        latitude: 2,
        longitude: 2,
        type: "Well",
        status: "Standby",
        operation: "Development",
        rig: null,
        operationActivities: [
          {
            name: "Drilling",
            status: "Done",
            operationText:
              "wirline activity was in this </br> wirline activity was in this </br>wirline activity was in this </br>wirline activity was in this </br>wirline activity was in this </br>wirline activity was in this </br>wirline activity was in this </br>wirline activity was in this </br>wirline activity was in this </br>wirline activity was in this </br>wirline activity was in this </br>",
            request: "Pending",
            requester: "User 2",
            approval: "Manager 2",
            production: 200,
          },
          // ... rest of the data
        ],
      },
      {
        name: "Well 3",
        field: "Field 3",

        latitude: 3,
        longitude: 3,
        type: "Well",
        status: "Working",
        operation: "Production",
        rig: null,
        operationActivities: [
          {
            name: "Activity 3",
            status: "Status 3",
            operationText: "Operation Text 3",
            request: "Approved",
            requester: "User 3",
            approval: "Manager 3",
            production: 300,
          },
        ],
      },
      {
        name: "Well 4",
        field: "Field 4",

        latitude: 1,
        longitude: 1,
        type: "Well",
        status: "Standby",
        operation: "Development",
        rig: null,
        operationActivities: [
          {
            name: "Activity 4",
            status: "Status 4",
            operationText: "Operation Text 4",
            request: "Pending",
            requester: "User 4",
            approval: "Manager 4",
            production: 400,
          },
        ],
      },
      {
        name: "Well 5",
        field: "Field 5",

        latitude: 5,
        longitude: 5,
        type: "Well",
        status: "Working",
        operation: "Production",
        rig: null,
        operationActivities: [],
      },
    ]);

    const rigs = await Rig.create([
      {
        name: "Rig 1",
        well: wells[0]._id, // Assign Rig 1 to Well 1
        type: "Rig",
        status: "Working",
      },
      {
        name: "Rig 2",
        well: wells[2]._id, // Assign Rig 2 to Well 3
        type: "Workover",
        status: "Standby",
      },
      {
        name: "Rig 3",
        well: wells[4]._id, // Assign Rig 3 to Well 5
        type: "Rig",
        status: "Working",
      },
      {
        name: "RigLess",
        well: wells[1]._id, // Assign Rig 3 to Well 5
        type: "Rigless",
        status: "Working",
      },
    ]);

    // Update wells with assigned rigs
    await Well.findByIdAndUpdate(wells[0]._id, { rig: rigs[0]._id });
    await Well.findByIdAndUpdate(wells[2]._id, { rig: rigs[1]._id });
    await Well.findByIdAndUpdate(wells[4]._id, { rig: rigs[2]._id });

    console.log("Wells:", wells);
    console.log("Rigs:", rigs);

    process.exit();
  } catch (error) {
    console.error("Error in seed:", error.message);
    process.exit(1); // Exit with error status
  }
})();
