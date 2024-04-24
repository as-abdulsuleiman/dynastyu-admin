/** @format */

"use client";

import { FC, useMemo } from "react";
import {
  QueryMode,
  SchoolWhereInput,
  SortOrder,
  useGetFindFirstSchoolQuery,
  useGetSchoolsQuery,
} from "@/services/graphql";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebouncedValue } from "@mantine/hooks";
import { ScrollArea } from "../ui/scroll-area";
import { observer } from "mobx-react-lite";
import {
  CheckIcon,
  ChevronsUpDownIcon,
  Loader2Icon,
  SchoolIcon,
} from "../Icons";
import UserAvatar from "../user-avatar";

interface SchoolDropdownProps {
  scrollAreaClass?: string;
  id: string;
  whereClause: SchoolWhereInput;
  error?: string;
  label?: string;
  isOpen: boolean;
  placeholder?: string;
  hasSearch?: boolean;
  onClose: () => void;
  selectedValue: any;
  onSelectValue: (item: any | null) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  side?: "top" | "right" | "bottom" | "left" | undefined;
  buttonClass?: string;
  schoolId?: number;
}

const SchoolDropdown: FC<SchoolDropdownProps> = ({
  whereClause,
  id,
  schoolId,
  error,
  label,
  isOpen,
  placeholder,
  hasSearch,
  onClose,
  selectedValue,
  onSelectValue,
  onBlur,
  buttonClass,
  side = "top",
  scrollAreaClass,
}) => {
  const [search, setSearch] = React.useState("");
  const [debounced] = useDebouncedValue(search, 300);

  const { data: selectedSchoolData } = useGetFindFirstSchoolQuery({
    variables: {
      where: {
        id: { equals: schoolId },
      },
    },
    skip: !schoolId,
  });

  const { data: schooldata, loading } = useGetSchoolsQuery({
    variables: {
      where: {
        ...whereClause,
        OR: [{ name: { contains: debounced, mode: QueryMode.Insensitive } }],
      },
      take: 20,
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const isObjectEmpty = (obj: any) => {
    return Object?.keys(obj || {}).length > 0 ?? false;
  };

  const schools = useMemo(() => {
    let newSchool = [];
    const oldSchool = schooldata?.schools || [];
    const IscoachSchoolFound = isObjectEmpty(
      selectedSchoolData?.findFirstSchool || {}
    );
    const coachSchool = IscoachSchoolFound
      ? selectedSchoolData?.findFirstSchool
      : {};
    if (IscoachSchoolFound) {
      newSchool = [coachSchool, ...oldSchool];
    } else {
      newSchool = [...oldSchool];
    }

    return (
      newSchool?.map((school: any) => {
        let schoolLoaction;
        if (school) {
          if (school?.city) {
            schoolLoaction = school?.city;
          }
          if (school?.state) {
            schoolLoaction = `${schoolLoaction}, ${school?.state}`;
          }
        }
        return {
          label: `${school?.name}${schoolLoaction ? "," : ""} ${
            schoolLoaction || ""
          }`,
          value: school?.name,
          id: school?.id,
          logo: school?.logo,
          city: school?.city,
          state: school?.state,
        };
      }) || []
    );
  }, [selectedSchoolData?.findFirstSchool, schooldata?.schools]);

  return (
    <div className="w-full relative" onBlur={onBlur} tabIndex={0}>
      {label ? (
        <label
          htmlFor={id}
          className="font-semibold text-left text-[14px] mb-11 d-flex"
          id={id}
        >
          {label}
        </label>
      ) : null}
      <Popover open={isOpen} onOpenChange={onClose}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className={`${buttonClass} w-[200px]w-[100%] max-w-[100%] min-w-[100%] justify-between mt-1.5 h-[40px]`}
          >
            <div className="truncate">
              {selectedValue?.id ? (
                schools?.find((school) => school?.id === selectedValue?.id)
                  ?.label
              ) : (
                <>{placeholder || "Select school..."}</>
              )}
            </div>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent side={side} className="PopoverContent p-0">
          <ScrollArea className={`h-72 rounded-md border ${scrollAreaClass}`}>
            <Command shouldFilter={false}>
              {hasSearch ? (
                <CommandInput
                  placeholder="Search school..."
                  value={search}
                  onValueChange={(e) => {
                    setSearch(e);
                  }}
                />
              ) : null}
              {!loading && <CommandEmpty>No result found.</CommandEmpty>}
              <CommandGroup className="cursor-pointer">
                {loading ? (
                  <div className="flex items-center justify-center py-3">
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </div>
                ) : (
                  <>
                    {schools?.map((school) => {
                      return (
                        <CommandItem
                          className={`cursor-pointer `}
                          key={school?.id}
                          value={school?.label}
                          onSelect={(currentValue) => {
                            onSelectValue(
                              currentValue ===
                                selectedValue?.label?.toLowerCase()
                                ? ""
                                : school
                            );
                            onClose();
                          }}
                        >
                          <div className="flex flex-col w-full h-full">
                            <div className="flex flex-row justify-start items-center">
                              <UserAvatar
                                className="h-[55px] w-[55px] shadow"
                                fallbackType="icon"
                                avatar={school?.logo as string}
                                icon={<SchoolIcon className="h-5 w-5" />}
                                fallback={`${school?.label?.charAt(0)}`}
                              />
                              <div className="ml-3 mb-1">
                                <div>{school?.label}</div>
                                <div className="text-sm text-primary">
                                  {school?.city ? `${school?.city},` : ""} {""}
                                  {school?.state}
                                </div>
                              </div>
                              <div className="ml-auto">
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedValue?.id === school?.id
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </CommandItem>
                      );
                    })}
                  </>
                )}
              </CommandGroup>
            </Command>
          </ScrollArea>
        </PopoverContent>
      </Popover>
      {error ? (
        <div className=" absolute bottom-[-20px] ml-[2px] w-full flex flex-nowrap">
          <small className="text-red-500 font-medium text-xs"> {error}</small>
        </div>
      ) : null}
    </div>
  );
};

export default observer(SchoolDropdown);
