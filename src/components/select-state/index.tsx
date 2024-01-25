/** @format */

import { FC, useEffect, useMemo, useState } from "react";
import { GetState } from "react-country-state-city";
import ComboboxCard from "../combobox-card";
import { ChangeHandler } from "react-hook-form";

interface SelectStateProps {
  label: string;
  id: string;
  error?: string;
  name: string;
  countryId: number;
  selectedState: string;
  onBlur?: ChangeHandler;
  searchPlaceholder?: string;
  placeholder?: string;
  selectStateId: (countryId: number) => void;
  onSelectState: (item: any | null) => void;
}

const SelectState: FC<SelectStateProps> = ({
  countryId,
  selectedState,
  placeholder,
  id,
  label,
  error,
  name,
  onBlur,
  onSelectState,
  selectStateId,
  searchPlaceholder,
}) => {
  const [stateList, setStateList] = useState([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchStates(countryId);
  }, [countryId]);

  const fetchStates = async (countryId: number) => {
    setLoading(true);
    try {
      const resp = await GetState(countryId);
      if (resp?.length) {
        await setStateList(resp?.map((a: any) => a));
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const stateSelected: any = useMemo(
    () => stateList?.find((b: any) => b?.name === selectedState),
    [selectedState, stateList]
  );

  useEffect(() => {
    selectStateId(stateSelected?.id);
  }, [stateSelected, selectStateId, selectedState]);

  const statesItems = useMemo(
    () =>
      stateList?.map((a: any) => ({
        label: a?.name,
        value: a?.name,
        id: a?.id,
        state_code: a?.state_code,
      })) || [],
    [stateList]
  );

  return (
    <div>
      <ComboboxCard
        loading={loading}
        error={error}
        searchPlaceholder={searchPlaceholder}
        hasSearch
        placeholder={placeholder || "Select State..."}
        scrollAreaClass="h-[250px]"
        id="state"
        valueKey="value"
        displayKey="label"
        IdKey="id"
        isOpen={isOpen}
        selectedValue={{ value: stateSelected?.name }}
        onClose={() => setIsOpen(!isOpen)}
        onSelectValue={(item) => {
          onSelectState(item);
        }}
        label={label}
        items={statesItems?.map((a) => a) as any}
      />
    </div>
  );
};

export default SelectState;
