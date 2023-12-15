/** @format */

"use client";

import { Button } from "@/components/ui/button";
import { Title, Text, Divider } from "@tremor/react";
import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SelectCard from "@/components/select";
import { ComboboxDemo } from "@/components/combobox";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface CoachesProps {}

type AddCoacheProps = {
  isOpen: boolean;
  onClose: () => void;
};

const titleOptions = [
  { label: "Head Coach (HC)", value: "Head Coach (HC)" },
  { label: "Offensive Coordinator (OC)", value: "Offensive Coordinator (OC)" },
  { label: "Defensive Coordinator (DC)", value: "Defensive Coordinator (DC)" },
  {
    label: "Co-Defensive Coordinator (Co-DC)",
    value: "Co-Defensive Coordinator (Co-DC)",
  },
  { label: "Quarterback Coach (QBCH)", value: "Quarterback Coach (QBCH)" },
  { label: "Wide Receivers Coach (WRC)", value: "Wide Receivers Coach (WRC)" },
  { label: "Running Backs Coach (RBC)", value: "Running Backs Coach (RBC)" },
  { label: "Offensive Line Coach (OLC)", value: "Offensive Line Coach (OLC)" },
  { label: "TightEnds Coach (TEC)", value: "TightEnds Coach (TEC)" },
  { label: "Defensive Line Coach (DLC)", value: "Defensive Line Coach (DLC)" },
  { label: "Linebackers Coach (LBC)", value: "Linebackers Coach (LBC)" },
  {
    label: "Defensive Backs Coach (DBC)",
    value: "Defensive Backs Coach (DBC)",
  },
  { label: "Special Teams Coach (SPC)", value: "Special Teams Coach (SPC)" },
  {
    label: "Recruiting Coordinator (RC)",
    value: "Recruiting Coordinator (RC)",
  },
  { label: "Strength Coach (SC)", value: "Strength Coach (SC)" },
  { label: "Support Staff (SC)", value: "Support Staff (SC)" },
];

const renderAddCoacheModal = ({ isOpen, onClose }: AddCoacheProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <Button>Add New Coach</Button>
      </DialogTrigger>
      <DialogContent className=" container mx-auto max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Coach</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid grid-cols-12 gap-4 py-2">
          <div className="col-span-12">
            <Label htmlFor="firstname">First Name</Label>
            <Input id="firstname" className="" />
          </div>
          <div className="col-span-12">
            <Label htmlFor="lastname">Last Name</Label>
            <Input id="lastname" className="" />
          </div>
          <div className="col-span-12">
            <Label htmlFor="email">Email</Label>
            <Input id="username" className="" />
          </div>
          <div className="col-span-12">
            <Label htmlFor="lastname">Account Type</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Coach</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-12">
            <Label htmlFor="lastname">Title</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select one" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {titleOptions.map((a, id) => {
                    return (
                      <SelectItem key={id} value={a.value}>
                        {a.label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-12">
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Can recieve and message
                </label>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const Coaches: FC<CoachesProps> = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <main className="w-full h-full">
      <div className="flex items-center">
        <div className="flex flex-col">
          <Title>Coaches</Title>
          <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>
        </div>
        <div className="ml-auto justify-end">
          {renderAddCoacheModal({ isOpen, onClose: () => setIsOpen(!isOpen) })}
        </div>
      </div>
      <Divider></Divider>

      {/* {renderAddCoacheModal()} */}
    </main>
  );
};

export default Coaches;
