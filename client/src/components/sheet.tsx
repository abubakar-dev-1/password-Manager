import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useFormStore from "../stores/useFormStore";
import { Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons

export function SheetDemo() {
  const { selectedItem, isSheetOpen, setIsSheetOpen, updateItem, deleteItem } =
    useFormStore();

  const [editableItem, setEditableItem] = useState<{ [key: string]: any } | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

  useEffect(() => {
    setEditableItem(selectedItem ? { ...selectedItem } : null);
  }, [selectedItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEditableItem((prev) => (prev ? { ...prev, [id]: value } : prev));
  };

  const handleUpdate = () => {
    if (editableItem) {
      updateItem(editableItem);
    }
    setIsSheetOpen(false);
  };

  const handleDelete = () => {
    if (editableItem) {
      deleteItem(editableItem);
    }
    setIsSheetOpen(false);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent className="bg-slate-600 text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Your Details</SheetTitle>
          <SheetDescription className="text-white">
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={editableItem?.username || ""}
              onChange={handleChange}
              className="col-span-3 text-black"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sitename" className="text-right">
              Sitename
            </Label>
            <Input
              id="sitename"
              value={editableItem?.sitename || ""}
              onChange={handleChange}
              className="col-span-3 text-black"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="siteurl" className="text-right">
              Site URL
            </Label>
            <Input
              id="siteurl"
              value={editableItem?.siteurl || ""}
              onChange={handleChange}
              className="col-span-3 text-black"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 relative">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type={isPasswordVisible ? "text" : "password"} // Toggle between text and password
              value={editableItem?.password || ""}
              onChange={handleChange}
              className="col-span-3 pr-10 text-black" // Add padding to the right for the icon
            />
            {/* Icon for toggling password visibility */}
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setIsPasswordVisible((prev) => !prev)} // Toggle visibility
            >
              {isPasswordVisible ? <EyeOff className="text-black" /> : <Eye className="text-black" />}
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button type="button" onClick={handleUpdate}>
            Update
          </Button>
          <Button type="button" onClick={handleDelete} className="bg-red-600">
            Delete
          </Button>
          <SheetClose asChild>
            <Button type="button" onClick={() => setIsSheetOpen(false)}>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
