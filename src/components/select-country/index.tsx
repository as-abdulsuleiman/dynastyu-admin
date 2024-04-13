/** @format */

import {
  FC,
  SetStateAction,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
  GetCountries,
} from "react-country-state-city";
import { Label } from "../ui/label";
import { ChangeHandler, RefCallBack } from "react-hook-form";
import ComboBoxCard from "@/components/combobox-card";
import ComboboxCard from "@/components/combobox-card";

interface SelectCountryProps {
  label: string;
  id: string;
  error?: string;
  name?: string;
  selectedCountry: string;
  searchPlaceholder?: string;
  placeholder?: string;
  onBlur?: ChangeHandler;
  onSelectCountryId: (countryId: number) => void;
  onSelectCountry: (item: any | null) => void;
}

const SelectCountry = forwardRef<HTMLDivElement, SelectCountryProps>(
  (
    {
      placeholder,
      searchPlaceholder,
      selectedCountry,
      id,
      label,
      error,
      name,
      onBlur,
      onSelectCountry,
      onSelectCountryId,
      ...props
    },
    ref
  ) => {
    const [countriesList, setCountriesList] = useState([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      fetchCountries();
    }, []);

    const fetchCountries = async () => {
      setLoading(true);
      try {
        const resp = await GetCountries();
        if (resp?.length) {
          await setCountriesList(resp?.map((a: any) => a));
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    const countrySelected: any = useMemo(
      () => countriesList?.find((b: any) => b?.iso2 === selectedCountry),
      [selectedCountry, countriesList]
    );

    useEffect(() => {
      onSelectCountryId(countrySelected?.id);
    }, [countrySelected, onSelectCountryId, selectedCountry]);

    const countries = useMemo(
      () =>
        countriesList?.map((a: any) => ({
          label: a?.name,
          value: a?.iso2,
          id: a?.id,
          emoji: a?.emoji,
        })) || [],
      [countriesList]
    );

    return (
      <div className="relative w-full h-full">
        <div
          onBlur={onBlur}
          tabIndex={-1}
          id={id}
          ref={ref}
          className="w-full h-full"
          {...props}
        >
          <ComboboxCard
            searchPlaceholder={searchPlaceholder}
            loading={loading}
            error={error}
            hasSearch
            shouldFilter={true}
            placeholder={placeholder || "Select Country..."}
            iconKey="emoji"
            scrollAreaClass="h-[250px]"
            id="country"
            valueKey="value"
            displayKey="label"
            IdKey="id"
            isOpen={isOpen}
            selectedValue={{ value: countrySelected?.iso2 }}
            onClose={() => setIsOpen(!isOpen)}
            onSelectValue={(item) => {
              onSelectCountry(item);
            }}
            label={label}
            items={countries?.map((a) => a) as any}
          />
        </div>
      </div>
    );
  }
);

SelectCountry.displayName = "SelectCountry";

export { SelectCountry };

// const SelectCountry: FC<SelectCountryProps> = ({ label, id }) => {

// };

// export default SelectCountry;
