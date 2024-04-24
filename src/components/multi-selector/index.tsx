/** @format */

import { FC } from "react";
import Multiselect from "multiselect-react-dropdown";
import { ChevronDownIcon } from "../Icons";

interface MultiSelectorProps {
  groupBy?: string;
  options: Options[];
  className?: string;
  loading?: boolean;
  placeholder?: string;
  displayValue: string;
  showCheckbox?: boolean;
  selectedOptions: Options[];
  hidePlaceholder?: boolean;
  avoidHighlightFirstOption?: boolean;
  handleSelect: (selectedList: Options[], selectedItem: Options) => void;
  handleRemove: (selectedList: Options[], removedItem: Options) => void;
}

type Options = {
  id: string | number;
  value: any;
  label: string;
};

const MultiSelector: FC<MultiSelectorProps> = ({
  options,
  loading,
  groupBy,
  handleSelect,
  handleRemove,
  placeholder,
  showCheckbox,
  selectedOptions,
  hidePlaceholder,
  displayValue = "label",
  avoidHighlightFirstOption,
}) => {
  return (
    <div className="relative">
      <Multiselect
        closeIcon="circle"
        placeholder={placeholder}
        id="Multiselect"
        className="text-sm shadow-sm transition-colors"
        options={options}
        loading={loading}
        selectedValues={selectedOptions}
        onSelect={handleSelect}
        onRemove={handleRemove}
        displayValue={displayValue}
        showCheckbox={showCheckbox}
        groupBy={groupBy}
        avoidHighlightFirstOption={avoidHighlightFirstOption}
        hidePlaceholder={hidePlaceholder}
        showArrow
        customArrow={<ChevronDownIcon className="chevron-down_dir" />}
        style={{
          chips: {
            background: "hsl(var(--primary))",
          },
          multiselectContainer: {
            color: "hsl(var(--foreground))",
          },
        }}
      />
    </div>
  );
};

export default MultiSelector;
