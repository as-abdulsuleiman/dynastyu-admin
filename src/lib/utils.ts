import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const noSchool = "https://firebasestorage.googleapis.com/v0/b/dynastyu-9de03.appspot.com/o/coaches%2F1702870984666-noschoolNew.png?alt=media&token=1542cdb4-691b-449d-a2b5-f4f071128975"

export const noImage =
"https://firebasestorage.googleapis.com/v0/b/dynastyu-9de03.appspot.com/o/coaches%2F1702818443312-noImage.png?alt=media&token=d2cb441b-e46c-438b-893f-3c96efba8824"


export const coachTitleOptions = [
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