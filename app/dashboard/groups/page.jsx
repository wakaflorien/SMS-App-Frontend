"use client";
import { ConfirmModal, ContentModal } from "@/app/components/contentModal";
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
import { DefaultPagination } from "@/app/components/pagination";
import { DynamicTable } from "@/app/components/DynamicTable";
import {
  TABLE_HEAD_GROUP,
  TABLE_ROWS_CONTACTS,
} from "@/app/components/tablecolumns";

export default function Groups() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <ContentModal open={open} handleOpen={handleOpen} />
      <div className="flex flex-col  p-4 space-y-3">
        <header className="self-center">All Groups</header>
        <Card className="h-fit w-full rounded-none space-y-4">
          <div className="w-3/6 px-6 pt-6">
            <Input
              label="Search group by name, number"
              size="md"
              icon={<UserGroupIcon className="h-5 w-5" />}
            />
          </div>
          <DynamicTable columns={TABLE_HEAD_GROUP} data={TABLE_ROWS_CONTACTS} />
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
