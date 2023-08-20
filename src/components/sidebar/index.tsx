import { NavLink } from "react-router-dom";

export default function Index() {
  return (
    <div className="relative z-10 px-1 py-1 flex gap-x-2 min-w-[150px] min-h-[50px] justify-start md:h-full md:flex-col md:gap-y-2 overflow-auto bg-stone-900">
      <NavLink
        to="/"
        title="Contact"
        className={({ isActive }) =>
          `rounded h-full md:h-24 grid place-items-center md:mb-2 ${isActive ? 'bg-stone-600' : 'bg-stone-700'}`
        }
      >
        <p className="text-bold text-stone-200 px-1 md:px-0">Home</p>
      </NavLink>
      <NavLink
        to="contact"
        title="Contact"
        className={({ isActive }) =>
          `w-20 h-full md:h-12 md:w-full rounded text-stone-200 ${
            isActive ? "bg-stone-500" : "bg-stone-800"
          } hover:bg-stone-700 grid place-items-center md:place-items-start overflow-hidden`
        }
      >
        <p className="h-full w-full flex items-center justify-center bg-transparent">
          Contact
        </p>
      </NavLink>
      <NavLink
        to="analytics"
        title="Chart"
        className={({ isActive }) =>
          `w-20 h-full md:h-12 md:w-full rounded text-stone-200 ${
            isActive ? "bg-stone-500" : "bg-stone-800"
          } hover:bg-stone-700 grid place-items-center md:place-items-start overflow-hidden`
        }
      >
        <p className="h-full w-full flex items-center justify-center bg-transparent">
          Chart
        </p>
      </NavLink>
    </div>
  );
}
