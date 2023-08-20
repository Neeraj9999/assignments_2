import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, addUser, selectUser, updateUser } from "store/userSlice";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export default function UserForm({
  close,
  currentUser,
}: {
  close: () => void;
  currentUser: User | null;
}) {
  const [uid, setuid] = React.useState(uuidv4());
  const [firstName, setfirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [status, setStatus] = React.useState<boolean>(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setLastName(currentUser.lastName);
      setfirstName(currentUser.firstName);
      setStatus(currentUser.status);
      setuid(currentUser.id);
    }
  }, [currentUser]);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const isExists = user.find(
      (user: User) =>
        `${user.firstName} ${user.lastName}` === `${firstName} ${lastName}`
    );

    if (isExists && isExists.id !== currentUser?.id) {
      toast.error("User Already Exists!");
      return;
    }
    const obj = {
      firstName,
      lastName,
      status,
      id: uid,
    };
    dispatch(currentUser ? updateUser(obj) : addUser(obj));
    close();
    toast.success(`User ${currentUser ? "Updated" : "Created"}`);
  };
  const onChangeHandler = (cb: React.Dispatch<any>) => {
    return function (event: React.ChangeEvent<HTMLInputElement>) {
      cb(event.target.value);
    };
  };
  return (
    <form
      onSubmit={submitHandler}
      className="relative h-max w-full overflow-hidden space-y-3 md:w-1/2 p-2 md:p-6 bg-stone-500 rounded"
    >
      <p
        onClick={close}
        className="absolute top-0 right-0 w-12 h-12 grid place-items-center float-right font-semibold bg-stone-800 p-2 cursor-pointer"
      >
        X
      </p>
      <h2 className="text-2xl">
        {currentUser ? "Edit User" : "Create New User"}
      </h2>
      <div className="flex flex-col gap-y-1 pt-8">
        <label htmlFor="first_name" className="font-semibold">
          First Name
        </label>
        <input
          autoComplete="false"
          type="text"
          name="first_name"
          className="rounded h-12 outline-none text-stone-900 px-1"
          value={firstName}
          onChange={onChangeHandler(setfirstName)}
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <label htmlFor="last_name" className="font-semibold">
          Last Name
        </label>
        <input
          type="text"
          name="last_name"
          className="rounded h-12 outline-none text-stone-900 px-1"
          value={lastName}
          onChange={onChangeHandler(setLastName)}
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <p className="font-semibold">Status :</p>
        <div className="flex gap-x-4">
          <div className="flex items-center gap-x-2">
            <label htmlFor="active_status" className="font-semibold">
              Active
            </label>
            <input
              name="active_status"
              type="radio"
              checked={!!status}
              onChange={() => setStatus(true)}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <label htmlFor="inactive_status" className="font-semibold">
              InActive
            </label>
            <input
              name="inactive_status"
              type="radio"
              checked={!status}
              onChange={() => setStatus(false)}
            />
          </div>
        </div>
      </div>
      <button
        disabled={!firstName || !lastName}
        className="disabled:bg-stone-400 bg-stone-700 hover:bg-stone-600 px-4 h-12 rounded text-center"
      >
        {currentUser ? "Update" : "Create"}
      </button>
    </form>
  );
}
