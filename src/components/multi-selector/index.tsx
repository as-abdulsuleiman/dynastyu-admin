/** @format */

import { FC, ReactNode } from "react";
import Multiselect from "multiselect-react-dropdown";
import { ChevronDownIcon } from "../Icons";
import { key } from "localforage";

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
  disable?: boolean;
  handleSelect: (selectedList: Options[], selectedItem: Options) => void;
  handleRemove: (selectedList: Options[], removedItem: Options) => void;
  selectedValueDecorator?: () => ReactNode;
}

type Options = {
  id: string | number;
  value: any;
  label: string;
  [key: string]: any;
};

const MultiSelector: FC<MultiSelectorProps> = ({
  options,
  loading,
  groupBy,
  disable,
  handleSelect,
  handleRemove,
  placeholder,
  showCheckbox,
  selectedOptions,
  hidePlaceholder,
  displayValue = "label",
  avoidHighlightFirstOption,
  selectedValueDecorator,
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
        disable={disable}
        groupBy={groupBy}
        avoidHighlightFirstOption={avoidHighlightFirstOption}
        hidePlaceholder={hidePlaceholder}
        showArrow
        selectedValueDecorator={selectedValueDecorator}
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
