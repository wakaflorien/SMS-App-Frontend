"use client";
import { ContentModal } from "@/app/components/ContentModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  Input,
} from "../../../utils/material_tailwind";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { DefaultPagination } from "@/app/components/Pagination";
import { DynamicTable } from "@/app/components/DynamicTable";
import {
  TABLE_HEAD_GROUP,
  TABLE_ROWS_GROUPS,
} from "@/app/components/Tablecolumns";
import { GroupsModalContent } from "@/app/components/CreateModals";

export default function Groups() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <ContentModal
        title="Create new Group"
        open={open}
        handleOpen={handleOpen}
        okText="Create" cancelText="Cancel"
        modalContent={<GroupsModalContent />}
      />
      <div className="flex flex-col  p-4 space-y-3">
        <header className="self-center">All Groups</header>
        <Card className="h-fit w-full rounded-none space-y-4">
          <div className="w-full px-6 pt-6">
            <Input
              label="Search group by name, number"
              size="lg"
              icon={<UserGroupIcon className="h-5 w-5" />}
            />
          </div>
          <DynamicTable columns={TABLE_HEAD_GROUP} data={TABLE_ROWS_GROUPS} />
        </Card>
        <div className="flex items-center justify-between">
          <DefaultPagination className="mt-4" />
          <SpeedDial>
            <SpeedDialHandler onClick={handleOpen}>
              <IconButton size="lg" className="rounded-full">
                <UserGroupIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
              </IconButton>
            </SpeedDialHandler>
          </SpeedDial>
        </div>
      </div>
    </>
  );
}
