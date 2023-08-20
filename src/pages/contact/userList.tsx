import React from "react";
import { useDispatch } from "react-redux";
import { User, deleteUser } from "store/userSlice";
import toast from "react-hot-toast";

export default function UserList({
  user,
  setCurrentUser,
}: {
  user: User[];
  setCurrentUser: React.Dispatch<any>;
}) {
  const dispatch = useDispatch();
  const renderUser = React.useMemo(() => {
    const deleteHandler = (val: string) => {
      dispatch(deleteUser(val));
      toast.success("User Deleted");
    };
    return user.map((user: User) => (
      <div
        key={user.id}
        className="w-full h-16 flex items-center justify-between bg-stone-700 rounded"
      >
        <p className="px-2 text-2xl max-w-[400px] truncate">{`${user.firstName} ${user.lastName}`}</p>
        <div className="px-2 flex items-center justify-center gap-x-2">
          <p
            className={`${
              user.status ? "bg-lime-500" : "bg-red-500"
            } h-2 w-2 rounded-full`}
          />
          <button
            onClick={() => setCurrentUser(user)}
            className="cursor-pointer bg-blue-700 hover:bg-blue-600 w-14 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => deleteHandler(user.id)}
            className="cursor-pointer bg-red-700 hover:bg-red-600 w-14 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  }, [user]);
  if (user.length < 1) {
    return <p>No user found</p>;
  }
  return (
    <div className="h-full w-full md:w-3/4 flex flex-col gap-y-3">
      {renderUser}
    </div>
  );
}
