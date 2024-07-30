import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound } from 'lucide-react';
import useFormStore from '../stores/useFormStore';

export function DialogDemo() {
  const { formData, setFormData, saveFormData, isDialogOpen, setIsDialogOpen } = useFormStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ [id]: value });
  };

  const handleSaveChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveFormData();
    toast.success("New password saved successfully!");
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild className="text-black bg-slate-400">
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          <KeyRound className="mr-2" />
          ADD New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-500">
        <DialogHeader>
          <DialogTitle>
            Welcome to
            <span className="text-black font-medium">&lt;</span>
            Pass
            <span className="text-black font-medium">OP/&gt;</span>
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSaveChanges}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                type="text"
                id="username"
                placeholder="Mian Abubakar"
                className="col-span-3"
                value={formData.username || ""}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sitename" className="text-right">
                Sitename
              </Label>
              <Input
                type="text"
                required
                id="sitename"
                placeholder="mypassword-manager"
                className="col-span-3"
                value={formData.sitename || ""}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="siteurl" className="text-right">
                SiteURL
              </Label>
              <Input
                type="url"
                required
                id="siteurl"
                placeholder="www.mypassword-manager.vercel"
                className="col-span-3"
                value={formData.siteurl || ""}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                type="password"
                required
                id="password"
                placeholder="pass123"
                className="col-span-3"
                value={formData.password || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
