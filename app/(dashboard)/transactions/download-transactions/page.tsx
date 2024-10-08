"use client";
import CustomDateRangePicker from "@/lib/components/DateRangePicker/DateRangePicker";
import { title } from "@/lib/components/primitives";
import CustomSelect from "@/lib/components/SelectOptions/SelectOptions";
import SelectOptionsData from "@/lib/constants/dropdownConstants/SelectOptionData";
import React, { useState } from "react";

const DownloadTransactions = () => {
  const [selectedMerchants, setSelectedMerchants] = useState<string | null>("");
  const handleSelection = (value: string | null) => {
    setSelectedMerchants(value);
  };
  return (
    <>
      <div className="flex items-center justify-between border border-purple-400 mx-4 my-4 px-4 py-4 rounded-md">
        <CustomSelect
          label="Select"
          placeholder="MerChant Id"
          value={selectedMerchants as any}
          onChange={(value) => handleSelection(value as any)}
          selectionData={SelectOptionsData}
        />
        <CustomDateRangePicker variant="bordered" />
      </div>
    </>
  );
};

export default DownloadTransactions;
