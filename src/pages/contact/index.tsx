import React, { useEffect, useState } from "react";
import AppRouteWrapper from "@components/appRouteWrapper";
import { useSelector } from "react-redux";
import { User, selectUser } from "store/userSlice";
import UserList from "./userList";
import UserForm from "./userForm";

export default function Index() {
  const user = useSelector(selectUser);
  const [open, setOpen] = useState<boolean | number>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    setOpen(!!currentUser);
  }, [currentUser]);
  const closeHandler = () => {
    setOpen(false);
    setCurrentUser(null);
  }
  return (
    <AppRouteWrapper>
      <div className="h-full w-full grid place-items-center">
        <UserList user={user} setCurrentUser={setCurrentUser} />
        <div
          className="p-1 h-10 w-10 grid place-items-center text-xs absolute z-10 bottom-16 md:bottom-4 right-4 rounded-full bg-green-700 hover:bg-green-600 hover:scale-105 hover:shadow-md cursor-pointer"
          onClick={() => setOpen(true)}
        >
          Add
        </div>
      </div>
      {open && (
        <div
          className="absolute z-20 h-full w-full grid place-items-center top-0 left-0 p-4"
          style={{ background: "rgba(0,0,0,.5)" }}
        >
          <UserForm close={closeHandler} currentUser={currentUser} />
        </div>
      )}
    </AppRouteWrapper>
  );
}
