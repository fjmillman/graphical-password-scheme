const { PHASE_PRODUCTION_SERVER } = process.env.NODE_ENV === "development"
    ? {}
    : !process.env.NOW_REGION
        ? require("next/constants")
        : require("next-server/constants");

module.exports = {
    target: "serverless"
};
