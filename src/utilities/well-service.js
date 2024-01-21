export const sumProduction = (well) => {
  try {
    return well.operationActivities.reduce((total, activity) => {
      return total + activity.production;
    }, 0);
  } catch (e) {
    console.log("summition data was not done");
    return 0;
  }
};

// Get production data for one well
export async function getWellProductionData(well) {
  try {
    const productionData = {
      productionData: well.operationActivities.map((activity) => ({
        production: activity.production,
      })),
      productionTime: well.operationActivities.map((activity) => ({
        createdAt: activity.createdAt,
      })),
    };
    console.log(productionData);
    return productionData;
  } catch (e) {
    console.log("data was not prepared to display");
    return 0;
  }
}
