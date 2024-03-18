/** @format */

import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const SkillIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path d="M9.82986 8.78986L7.99998 9.45588V13H5.99998V8.05H6.015L11.2834 6.13247C11.5274 6.03855 11.7922 5.99162 12.0648 6.0008C13.1762 6.02813 14.1522 6.75668 14.4917 7.82036C14.678 8.40431 14.848 8.79836 15.0015 9.0025C15.9138 10.2155 17.3653 11 19 11V13C16.8253 13 14.8823 12.0083 13.5984 10.4526L12.9008 14.4085L15 16.17V23H13V17.1025L10.7307 15.1984L10.003 19.3253L3.10938 18.1098L3.45667 16.1401L8.38071 17.0084L9.82986 8.78986ZM13.5 5.5C12.3954 5.5 11.5 4.60457 11.5 3.5C11.5 2.39543 12.3954 1.5 13.5 1.5C14.6046 1.5 15.5 2.39543 15.5 3.5C15.5 4.60457 14.6046 5.5 13.5 5.5Z"></path>
  </svg>
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   width="682.667"
  //   height="682.667"
  //   version="1"
  //   viewBox="0 0 512 512"
  //   {...props}
  // >
  //   <path
  //     strokeWidth={4}
  //     stroke={props?.color || "#374151"}
  //     d="M3463 4906c-324-79-488-441-336-745 36-72 142-178 214-214 206-103 450-66 607 91 204 205 203 523-2 728-132 132-307 182-483 140zm254-237c203-97 225-376 41-509-197-143-474 0-472 245 1 148 101 267 246 294 64 11 116 3 185-30zM1960 4191c-55-17-119-59-456-303-378-272-439-327-470-420-22-66-15-160 17-225 70-144 241-211 377-148 30 14 60 25 66 25 7 0 144 95 305 210 161 116 297 210 304 210s66-18 132-40c79-26 119-44 117-52-2-7-96-163-208-347-113-183-220-363-239-400-32-62-65-165-65-201 0-8-76-134-169-280l-168-265-414-5c-402-5-415-6-462-27-182-84-265-283-196-468 27-71 103-156 171-191 81-41 154-46 655-42 451 4 470 5 534 26 71 24 166 82 211 129 14 15 97 127 183 248s163 219 170 219c25-3 465-279 465-292 0-7-36-198-81-425-69-351-80-423-77-487 6-95 31-154 98-224 72-76 149-109 255-110 71-1 88 3 147 32 73 36 123 85 166 166 15 27 32 58 39 70 13 25 223 1127 223 1173s-27 119-64 174c-17 26-137 140-271 258-132 117-244 218-249 225-9 13 138 316 153 316 4 0 41-72 81-160 81-178 123-235 204-278l51-27 431-3c414-3 433-2 486 18 71 26 126 74 163 141 27 49 30 62 30 149 0 79-4 102-23 137-35 66-79 110-140 140l-57 28-313 5-314 5-138 328c-76 181-141 345-145 365-11 59-64 148-115 194-89 82-111 97-248 172l-138 76-437 95c-428 93-512 105-577 86zm510-293c381-83 432-96 490-128 36-20 97-54 135-75 101-54 130-79 155-130 41-84 39-88-244-654-270-539-271-543-233-589 6-9 131-121 277-250 322-284 320-283 320-327 0-29-172-958-186-1007-4-13 0-18 17-18h22l-24-24c-13-13-32-47-42-75-45-127-204-138-266-17l-24 46 93 477c94 490 99 530 63 564-19 17-749 469-759 469-9 0-77 52-117 89-73 68-107 170-87 263 12 61 6 50 329 574 213 347 243 401 243 436-1 81 0 81-324 183-212 67-244 73-280 54-12-6-166-115-342-242-276-199-326-231-357-231-43-1-67 17-85 61-28 66-22 72 360 345 413 296 416 298 430 298 6 0 202-41 436-92zm960-800c87-214 170-403 185-417 14-14 63-17 370-21l355-5 27-27c38-39 38-97 0-136l-27-27-373-3c-393-3-433 0-459 41-8 12-61 125-118 251l-103 228 49 99c26 54 51 99 54 99s21-37 40-82zM2030 2070c23-18 51-41 63-51s32-27 45-36l22-18-157-220c-165-230-205-271-291-295-23-6-217-10-505-10-516 0-514 0-558 62-47 65-31 152 37 204l37 29 436 3c302 1 443 6 458 14 12 6 84 109 160 228l137 217 37-47c20-26 56-61 79-80z"
  //     transform="matrix(.1 0 0 -.1 0 512)"
  //   ></path>
  // </svg>
  // <svg viewBox="0 0 16 16" width={16} height={16} fill="none" {...props}>
  //   <path
  //     fill={props?.color || "#374151"}
  //     d="M12.297.794c-.684.225-1.094.865-.988 1.55.072.469.354.85.785 1.06.228.109.244.112.594.112s.365-.003.593-.113c.425-.206.71-.584.788-1.047A1.397 1.397 0 0 0 13.28.878c-.215-.103-.262-.112-.547-.119-.197-.006-.359.007-.437.035ZM8.016 1.465c-.232.06-.397.21-1.753 1.572C4.94 4.362 4.847 4.465 4.784 4.634c-.034.1-.065.244-.065.319 0 .31.231.687.515.837.182.1.663.1.844 0 .069-.037.603-.547 1.188-1.131.584-.588 1.072-1.066 1.084-1.066.016 0 .172.107.353.238l.331.24.538-.53c.353-.35.6-.566.719-.635.15-.085.175-.11.14-.14a44.253 44.253 0 0 0-1.8-1.232 1.128 1.128 0 0 0-.615-.069ZM1.316 2.156a.465.465 0 0 0-.37.497c.02.16.098.275.245.363.103.059.162.062 1.403.062 1.24 0 1.3-.003 1.403-.062.172-.1.237-.216.237-.407 0-.19-.065-.306-.237-.406-.1-.06-.169-.062-1.34-.069-.679-.003-1.282.007-1.341.022ZM11.122 3.565c-.078.013-.197.05-.266.085-.072.037-.931.878-2.125 2.075-1.9 1.903-2.01 2.018-2.072 2.19a.834.834 0 0 0 0 .638c.063.168.147.262 1.204 1.322C8.488 10.503 9 11.03 9 11.046c0 .016-.616.65-1.372 1.407-1.284 1.287-1.375 1.387-1.437 1.556-.035.1-.066.244-.066.319 0 .31.231.687.516.837.18.1.662.1.843 0 .072-.037.894-.837 1.894-1.843 1.672-1.675 1.775-1.785 1.838-1.957a.834.834 0 0 0 0-.637c-.063-.169-.147-.263-1.204-1.322-.625-.628-1.137-1.156-1.137-1.172 0-.019.328-.36.731-.763l.732-.73.012.387c.013.443.069.612.269.818.15.16.297.232.54.272.27.041 3.757.041 4.025 0 .244-.04.391-.112.541-.272.425-.44.31-1.203-.228-1.478-.206-.106-.478-.125-1.894-.125H12.22v-.997c0-1.146-.013-1.218-.24-1.471a.954.954 0 0 0-.857-.31ZM.378 4.031a.465.465 0 0 0-.369.497c.02.16.097.275.244.363.103.059.163.062 1.403.062s1.3-.003 1.403-.062c.172-.1.238-.216.238-.407 0-.19-.066-.306-.238-.406-.1-.06-.168-.062-1.34-.069-.678-.003-1.281.007-1.34.022ZM1.316 5.906a.465.465 0 0 0-.37.497c.02.16.098.275.245.363.103.059.162.062 1.403.062 1.24 0 1.3-.003 1.403-.062.172-.1.237-.216.237-.407 0-.19-.065-.306-.237-.406-.1-.06-.169-.062-1.34-.069-.679-.003-1.282.007-1.341.022Z"
  //   />
  //   <path
  //     fill={props?.color || "#374151"}
  //     d="M3.169 11.287C.753 13.706.629 13.837.566 14.01c-.038.1-.066.244-.066.319 0 .31.231.687.516.837.18.1.662.1.843 0 .072-.037 1.166-1.11 2.56-2.506l2.437-2.438-.425-.434c-.356-.369-.444-.478-.553-.694a1.933 1.933 0 0 1-.128-.3c0-.025-.01-.043-.025-.043-.012 0-1.162 1.143-2.556 2.537Z"
  //   />
  // </svg>
);

export default memo(SkillIcon);
