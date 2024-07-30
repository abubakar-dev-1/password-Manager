import { Input } from "./ui/input";
import { Search } from "lucide-react";
import AllList from "./allList";
import { SheetDemo } from "./sheet";
import { Toaster } from "./ui/sonner";
import { DialogDemo } from "./dialogpop";

export default function Manager() {
  return (
    <>
      <Toaster position="bottom-right" />
      <div className="block md:flex justify-between items-center my-4">
        <h1 className="text-2xl text-center my-3 md:my-0 w-full md:w-[40%] font-semibold">
          My Password Manager
        </h1>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search"
            type="search"
            className="pl-10 w-full text-slate-500 font-semibold"
          />
        </div>
      </div>

      <div className="block self-center md:flex md:self-auto justify-around items-center">
        <h1 className="text-xl text-center font-medium">Passwords</h1>
        <DialogDemo />
      </div>

      <p className="text-center my-4">
        Create, save, and manage your passwords so you can easily sign in to
        sites and apps.
      </p>

      <AllList />
      <SheetDemo />
    </>
  );
}
