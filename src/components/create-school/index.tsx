/** @format */

import { FC, useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { observer } from "mobx-react-lite";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CreateSchoolProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateSchool: FC<CreateSchoolProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog
      defaultOpen={false}
      open={isOpen}
      onOpenChange={() => {
        // reset();
        // setSelectedAccountTypes({});
        // setSelectedSchool({});
        // setSelectedTitle({});
        onClose();
      }}
    >
      <DialogTrigger asChild>
        <Button className="mt-2 md:mt-0">Add New School</Button>
      </DialogTrigger>
      <DialogOverlay>
        <DialogContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          className="container rounded-xl sm:rounded-xl mx-auto max-w-2xl px-[16px] md:px-[2rem] z-[999] static translate-x-0 translate-y-0 sm:fixed sm:translate-x-[-50%] sm:translate-y-[-50%] py-[30px]"
        >
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Add New School
            </DialogTitle>
          </DialogHeader>
          {/* <form
          id="create_coach"
          name="create_coach"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-12 gap-6 py-2">
            <div className="col-span-12 place-self-center	">
              <AvatarUploader
                id="coaches_profile"
                onUploadSuccess={handleAvatarUploadSuccess}
                storageLocation="coaches"
              />
            </div>
            <div className="col-span-12" id="username">
              <Input
                id="username"
                placeholder="Your Username"
                label="Username"
                type="text"
                className="bg-transparent"
                error={errors.username?.message}
                {...register("username", { required: true })}
              />
            </div>
            <div className="col-span-12" id="firstname">
              <Input
                id="firstname"
                placeholder="Your First Name"
                label="First Name"
                className="bg-transparent"
                error={errors.firstName?.message}
                {...register("firstName", { required: true })}
              />
            </div>
            <div className="col-span-12">
              <Input
                id="lastname"
                label="Last Name"
                className="bg-transparent"
                placeholder="Your Last Name"
                error={errors.lastName?.message}
                {...register("lastName", { required: true })}
              />
            </div>
            <div className="col-span-12" id="email">
              <Input
                id="email"
                label="Email"
                className="bg-transparent"
                placeholder="Your Email"
                error={errors.email?.message}
                {...register("email", { required: true })}
              />
            </div>
            <div className="col-span-12" id="account_type">
              <ComboBoxCard
                scrollAreaClass="h-[100px]"
                id="account_type"
                onBlur={() => setFocus("accountType", { shouldSelect: true })}
                valueKey="value"
                displayKey="label"
                IdKey="label"
                label="Account Type"
                isOpen={openAccountType}
                error={
                  errors?.accountType?.accountTypeId?.message ||
                  errors?.accountType?.roleId?.message
                }
                onClose={() => setOpenAccountType(!openAccountType)}
                items={accountTypeOptions as any}
                selectedValue={selectedAccountTypes}
                onSelectValue={(item) => {
                  setSelectedAccountTypes(item);
                  setValue("accountType", {
                    accountTypeId: item?.id,
                    roleId: item?.roleId,
                  });
                }}
              />
            </div>
            <div className="col-span-12" id="coach_title">
              <ComboBoxCard
                valueKey="value"
                displayKey="label"
                IdKey="label"
                label="Title"
                id="coach_title"
                isOpen={openTitle}
                scrollAreaClass="h-72"
                hasSearch
                error={errors?.title?.message}
                onClose={() => setOpenTitle(!openTitle)}
                onBlur={() => setFocus("title", { shouldSelect: true })}
                items={coachTitleOptions}
                selectedValue={selectedTitle}
                onSelectValue={(item) => {
                  setSelectedTitle(item);
                  setValue("title", item?.value);
                }}
              />
            </div>
            <div className="col-span-12" id="schoolId">
              <SchoolDropdown
                scrollAreaClass="h-72"
                hasSearch={true}
                id="schoolId"
                onBlur={() => setFocus("schoolId", { shouldSelect: true })}
                onClose={() => setOpenSchool(!openSchool)}
                isOpen={openSchool}
                selectedValue={selectedSchool}
                onSelectValue={(school) => {
                  setSelectedSchool(school);
                  setValue("schoolId", school?.id);
                }}
                label="School"
                error={errors?.schoolId?.message}
                whereClause={{
                  schoolTypeId: {
                    equals: 1,
                  },
                }}
              />
            </div>
            <div className="col-span-12" id="can_receive_messages">
              <div className="items-top flex space-x-2">
                <Checkbox
                  defaultChecked={canReceiveMessages}
                  onCheckedChange={(e: boolean) =>
                    setValue("canReceiveMessages", e)
                  }
                  id="can_receive_messages"
                  name="can_receive_messages"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="can_receive_messages"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Can recieve and message
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <Button variant="default" className="w-full mt-6" type="submit">
              {submitting || isSubmitting ? (
                <div className="flex flex-row items-center justify-center">
                  <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form> */}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default observer(CreateSchool);
