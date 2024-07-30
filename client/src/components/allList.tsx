import { useEffect, useState } from 'react';
import useFormStore from '../stores/useFormStore';
import { ChevronRight } from 'lucide-react';

interface FormData {
  sitename?: string;
  username: string;
  siteurl?: string;
  password?: string;
}

export default function AllList() {
  const formDataArray = useFormStore(state => state.formDataArray) as FormData[];
  const setSelectedItem = useFormStore(state => state.setSelectedItem);
  const setIsSheetOpen = useFormStore(state => state.setIsSheetOpen);
  const [passwords, setPasswords] = useState<string[]>([]);

  useEffect(() => {
    const userNames = formDataArray.map((item: FormData) => item.username);
    setPasswords(userNames);
  }, [formDataArray]);

  const handleClick = (username: string) => {
    const selectedItem = formDataArray.find(item => item.username === username) || null;
    setSelectedItem(selectedItem);
    setIsSheetOpen(true);
  };

  return (
    <>
      {passwords.length === 0 ? (
        <p className='text-center'>There is no password yet.</p>
      ) : (
        <div className='w-full md:w-[50%] self-center bg-slate-500 rounded-lg'>
          <ul className='py-2'>
            {passwords.map((username, index) => (
              <li
                className='flex items-center p-2 justify-between border-b-2 border-b-slate-400 hover:bg-slate-600 cursor-pointer'
                key={index}
                onClick={() => handleClick(username)}
              >
                {username}
                <ChevronRight />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
