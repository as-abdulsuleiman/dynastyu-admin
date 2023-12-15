/** @format */

import { FC } from "react";
import { Button } from "../ui/button";

interface PaginationProps {
  onPrevious: () => void;
  onNext: () => void;
}

const Pagination: FC<PaginationProps> = ({ onPrevious, onNext }) => {
  return (
    <div className="flex flex-row items-center justify-end mt-4">
      <Button className="mr-2" onClick={onPrevious}>
        Previous
      </Button>
      <Button className="" onClick={onNext}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
