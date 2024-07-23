import React, { useState } from 'react';
import {DateRangePicker} from "@nextui-org/date-picker";
import { Button, ButtonGroup } from '@nextui-org/button';
import { Radio, RadioGroup,  } from '@nextui-org/radio';
import { CalendarDate, CalendarDateTime, endOfMonth, endOfWeek, getLocalTimeZone, startOfMonth, startOfWeek, today, ZonedDateTime } from '@internationalized/date';
import {useLocale, useDateFormatter} from "@react-aria/i18n";
import { clsx } from 'clsx';


interface GenericDateRangePickerProps {
  value: ZonedDateTime | CalendarDate | CalendarDateTime | undefined | null;
  label?: React.ReactNode;
  variant:'flat' | 'bordered' | 'faded' | 'underlined';
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size:'sm' | 'md' | 'lg';
  radius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  defaultValue: string | undefined;
  placeholderValue: ZonedDateTime | CalendarDate | CalendarDateTime | undefined | null;
  description:React.ReactNode;
  onChange: ((value: ZonedDateTime | CalendarDate | CalendarDateTime) => void) | undefined
  initialRange?: { start: Date; end: Date };
  precisionOptions?: { value: string; label: string }[];
  predefinedRanges?: { label: string; range: { start: Date; end: Date } }[];
}

const  CustomDateRangePicker = () => {
  let defaultDate = {
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({days: 7}),
  };
  let [value, setValue] = React.useState(defaultDate);

  let {locale} = useLocale();
  let formatter = useDateFormatter({dateStyle: "full"});
  let now = today(getLocalTimeZone());
  let nextWeek = {
    start: startOfWeek(now.add({weeks: 1}), locale),
    end: endOfWeek(now.add({weeks: 1}), locale),
  };
  let nextMonth = {
    start: startOfMonth(now.add({months: 1})),
    end: endOfMonth(now.add({months: 1})),
  };

  const CustomRadio = (props) => {
    const {children, ...otherProps} = props;

    return (
      <Radio
        {...otherProps}
        classNames={{
          base: clsx(
            "flex-none m-0 h-8 bg-content1 hover:bg-content2 items-center justify-between",
            "cursor-pointer rounded-full border-2 border-default-200/60",
            "data-[selected=true]:border-primary",
          ),
          label: "text-tiny text-default-500",
          labelWrapper: "px-1 m-0",
          wrapper: "hidden",
        }}
      >
        {children}
      </Radio>
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <DateRangePicker
        CalendarBottomContent={
          <RadioGroup
            aria-label="Date precision"
            classNames={{
              base: "w-full pb-2",
              wrapper:
                "-my-2.5 py-2.5 px-3 gap-1 flex-nowrap max-w-[w-[calc(var(--visible-months)_*_var(--calendar-width))]] overflow-scroll",
            }}
            defaultValue="exact_dates"
            orientation="horizontal"
          >
            <CustomRadio value="exact_dates">Exact dates</CustomRadio>
            <CustomRadio value="1_day">1 day</CustomRadio>
            <CustomRadio value="2_days">2 days</CustomRadio>
            <CustomRadio value="3_days">3 days</CustomRadio>
            <CustomRadio value="7_days">7 days</CustomRadio>
            <CustomRadio value="14_days">14 days</CustomRadio>
          </RadioGroup>
        }
        CalendarTopContent={
          <ButtonGroup
            fullWidth
            className="px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
            radius="full"
            size="sm"
            variant="bordered"
          >
            <Button
              onPress={() =>
                setValue({
                  start: now,
                  end: now.add({days: 7}),
                })
              }
            >
              This week
            </Button>
            <Button onPress={() => setValue(nextWeek)}>Next week</Button>
            <Button onPress={() => setValue(nextMonth)}>Next month</Button>
          </ButtonGroup>
        }
        calendarProps={{
          focusedValue: value?.start,
          onFocusChange: (val) => setValue({...value, start: val}),
          nextButtonProps: {
            variant: "bordered",
          },
          prevButtonProps: {
            variant: "bordered",
          },
        }}
        value={value}
        onChange={setValue}
        label="Event date"
      />
      {/* <p className="text-default-500 text-sm">
        Selected date:{" "}
        {value
          ? formatter.formatRange(
              value.start.toDate(getLocalTimeZone()),
              value.end.toDate(getLocalTimeZone()),
            )
          : "--"}
      </p> */}
    </div>
  );
};
export default CustomDateRangePicker;

