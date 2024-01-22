/** @format */

import { FC, useMemo, useState } from "react";
import { SortOrder, useGetSchoolTypesQuery } from "@/services/graphql";
import ComboBoxCard from "../combobox-card";
import { FieldErrors } from "react-hook-form";

interface SchoolTypeProps {
  error: any;
}

const SchoolTypeDropdown: FC<SchoolTypeProps> = ({ error }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSchoolType, setSelectedSchoolType] = useState<any>({});

  let errorMessage;
  if (error?.id) {
    errorMessage = error?.id?.message;
  } else if (error?.name) {
    errorMessage = error?.name?.message;
  } else {
    errorMessage = "";
  }

  const { data, loading } = useGetSchoolTypesQuery({
    variables: {
      orderBy: {
        createdAt: SortOrder.Desc,
      },
    },
  });

  const schoolTypes = useMemo(
    () =>
      data?.schoolTypes?.map((type) => ({
        label: type?.name,
        value: type?.name,
        id: type?.id,
        uuid: type?.uuid,
      })) || [],
    [data?.schoolTypes]
  );
  return (
    <div>
      <ComboBoxCard
        loading={loading}
        error={errorMessage}
        scrollAreaClass="h-[100px]"
        id="schoolTypes"
        valueKey="id"
        displayKey="label"
        IdKey="label"
        isOpen={isOpen}
        selectedValue={selectedSchoolType}
        onClose={() => setIsOpen(!isOpen)}
        onSelectValue={(item) => {
          setSelectedSchoolType(item);
          // console.log("item", item);
          // setValue("title", item?.value);
        }}
        label="School Type"
        items={schoolTypes as any}
      />
    </div>
  );
};

export default SchoolTypeDropdown;
