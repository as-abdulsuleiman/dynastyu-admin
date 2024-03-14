/** @format */

import { FC, useEffect, useMemo, useState } from "react";
import { GetCity } from "react-country-state-city";
import { ChangeHandler } from "react-hook-form";
import ComboboxCard from "../combobox-card";

interface SelectCityProps {
  label: string;
  id: string;
  error?: string;
  name: string;
  stateId: number;
  countryId: number;
  selectedCity: string;
  onBlur?: ChangeHandler;
  searchPlaceholder?: string;
  placeholder?: string;
  onSelectCity: (item: any | null) => void;
}

const SelectCity: FC<SelectCityProps> = ({
  stateId,
  countryId,
  id,
  name,
  label,
  error,
  onBlur,
  selectedCity,
  onSelectCity,
  searchPlaceholder,
  placeholder,
}) => {
  const [cityList, setCityList] = useState([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchCities(countryId, stateId);
  }, [countryId, stateId]);

  const fetchCities = async (countryId: number, stateId: number) => {
    setLoading(true);
    try {
      const resp = await GetCity(countryId, stateId);
      if (resp?.length) {
        await setCityList(resp?.map((a: any) => a));
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const citySelected: any = useMemo(
    () => cityList?.find((b: any) => b?.name === selectedCity),
    [selectedCity, cityList]
  );

  const cityItems = useMemo(
    () =>
      cityList?.map((a: any) => ({
        label: a?.name,
        value: a?.name,
        id: a?.id,
        latitude: a?.latitude,
        longitude: a?.longitude,
      })) || [],
    [cityList]
  );

  return (
    <div>
      <ComboboxCard
        loading={loading}
        error={error}
        disabled={!countryId && !stateId}
        hasSearch
        searchPlaceholder={searchPlaceholder}
        placeholder={placeholder || "Select City..."}
        scrollAreaClass="h-[250px]"
        id="state"
        valueKey="value"
        displayKey="label"
        IdKey="id"
        isOpen={isOpen}
        selectedValue={{ value: citySelected?.name }}
        onClose={() => setIsOpen(!isOpen)}
        onSelectValue={(item) => {
          onSelectCity(item);
        }}
        label={label}
        items={cityItems?.map((a) => a) as any}
      />
    </div>
  );
};

export default SelectCity;
