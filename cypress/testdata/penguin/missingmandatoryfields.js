import appdata from "../../fixtures/penguin/appdata.json";

const defaultRecordValueType =
  "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib";

export const data = {
  applicationId: `${appdata.appID}`,
  values: {
    $type:
      "System.Collections.Generic.Dictionary`2[[System.String, mscorlib],[System.Object, mscorlib]], mscorlib",
    RecordName: "Record Value",
  },
};
