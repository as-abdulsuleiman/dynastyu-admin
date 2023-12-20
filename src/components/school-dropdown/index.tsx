/** @format */

"use client";

import {
  QueryMode,
  SchoolWhereInput,
  useGetSchoolsQuery,
} from "@/services/graphql";
import { FC, useMemo } from "react";
import * as React from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn, noSchool } from "@/lib/utils";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface SchoolDropdownProps {
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
}

const SchoolDropdown: FC<SchoolDropdownProps> = ({
  whereClause,
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
}) => {
  const [search, setSearch] = React.useState("");
  const [debounced] = useDebouncedValue(search, 300);

  const {
    data: schooldata,
    loading,
    refetch,
    fetchMore,
  } = useGetSchoolsQuery({
    variables: {
      where: {
        ...whereClause,
      },
      take: 10,
    },
  });
  const schools = useMemo(
    () =>
      schooldata?.schools?.map((school) => ({
        label: school.name,
        value: school.name,
        id: school.id,
        logo: school.logo,
        city: school.city,
      })) || [],
    [schooldata?.schools]
  );

  React.useEffect(() => {
    refetch({
      where: {
        ...whereClause,
        OR: [{ name: { contains: debounced, mode: QueryMode.Insensitive } }],
      },
    });
  }, [search, debounced, refetch, whereClause]);

  return (
    <div className="w-full relative" onBlur={onBlur}>
      {label ? (
        <span className="font-semibold text-left text-[14px] mb-11 d-flex">
          {label}
        </span>
      ) : null}
      <Popover open={isOpen} onOpenChange={onClose}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className={`${buttonClass} w-[200px]w-[100%] max-w-[100%] min-w-[100%] justify-between h-[40px]`}
          >
            {selectedValue?.value ? (
              schools?.find((school) => school?.value === selectedValue?.value)
                ?.label
            ) : (
              <>{placeholder || "Select school..."}</>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent side={side} className="PopoverContent p-0">
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
            <CommandGroup>
              {loading ? (
                <div className="flex items-center justify-center py-3">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : (
                <>
                  {schools?.map((school, id) => {
                    return (
                      <CommandItem
                        className="cusor-pointer"
                        key={id}
                        value={school?.value}
                        onSelect={(currentValue) => {
                          onSelectValue(
                            currentValue === selectedValue?.value?.toLowerCase()
                              ? ""
                              : school
                          );
                          onClose();
                        }}
                      >
                        <div className="flex flex-col w-full h-full">
                          <div className="flex flex-row justify-start items-center">
                            <Avatar>
                              <AvatarImage
                                className=""
                                src={school.logo || noSchool}
                                alt="@shadcn"
                              />
                              <AvatarFallback>
                                <span className="sr-only">{school?.label}</span>
                              </AvatarFallback>
                            </Avatar>
                            <div className="ml-3 mb-1">
                              <div>{school.label}</div>
                              <div>{school.city}</div>
                            </div>
                            <div className="ml-auto">
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedValue?.value === school.value
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
        </PopoverContent>
      </Popover>
      {error ? (
        <p className="text-red-500 text-xs absolute bottom-[-20px] ml-[2px] font-medium">
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default SchoolDropdown;
