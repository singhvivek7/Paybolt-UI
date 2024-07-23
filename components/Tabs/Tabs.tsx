"use client";
import React, { useEffect, useState } from "react";
import { Tabs,Tab } from "@nextui-org/tabs";
import { tabsProps } from "@/constants/TransactionTabs/TransactionsTabs";
import { useRouter } from "next/navigation";
interface TabsComponentProps {
  tabsData: tabsProps[];
}

export default function TabsComponent({ tabsData }: TabsComponentProps) {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("/transactions");

  useEffect(() => {
    router.push(selectedTab);
  }, [selectedTab]);

  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Dynamic tabs"
        items={tabsData}
        fullWidth={true}
        classNames={{
          base: "px-4",
        }}
        selectedKey={selectedTab}
        onSelectionChange={key => setSelectedTab(key as string)}>
        {item => (
          <Tab key={item.id} title={item.label} className="py-6">
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
