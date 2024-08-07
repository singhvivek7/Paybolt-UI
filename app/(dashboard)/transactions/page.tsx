"use client";

import Input from "@/components/InputContainer/Input";
import { SearchIcon } from "@/public/assests/Icon/SearchIcon";
import { useRef, useState } from "react";
import CustomDateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import CustomSelect from "@/components/SelectOptions/SelectOptions";
import CustomTable from "@/components/CustomTable/Table";
import Services from "@/services/Services";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { TransactionColumns } from "@/constants/CustomTable/CustomTable";
import SelectOptionsData from "@/constants/dropdownConstants/SelectOptionData";

const Transactions = () => {
  const inputRef = useRef(null);
  const [inputField, setInputField] = useState("");
  const [selectedMerchants, setSelectedMerchants] = useState<string | null>("");
  const handleSelection = (value: string | null) => {
    setSelectedMerchants(value);
  };

  const { hasMore, isLoading, list } = Services.paginatedData();
  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: list.loadMore,
  });


  const handleChange = (e: string) => {
    console.log("text", e);
    list.setFilterText(e);
  };

  const SerchIcon = () => {
    return (
      <SearchIcon
        className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
        height={12}
        width={12}
      />
    );
  };

  

  const TableTopContent = () => {
    return (
      <div className="flex items-center justify-between px-4 py-4 shadow-large rounded-md">
        <Input
          ref={inputRef}
          label="Search Merchants"
          placeholder="Type to search..."
          type="search"
          startContent={<SerchIcon />}
          inputValue={list.filterText}
          onInputChange={list.setFilterText}
          loadingState={list.loadingState}
        />
        <CustomDateRangePicker />
        <CustomSelect
          label="Merchants"
          placeholder="Select Merchants"
          value={selectedMerchants}
          onChange={(value) => handleSelection(value)}
          selectionData={SelectOptionsData}
        />
      </div>
    );
  };

  
  return (
    <>
      <CustomTable
        columns={TransactionColumns}
        TableTopContent={<TableTopContent />}
        hasMore={hasMore}
        isLoading={isLoading}
        list={list}
        scrollRef={scrollerRef}
        loaderRef={loaderRef}
        data={list.items}
      />
    </>
  );
};

export default Transactions;
