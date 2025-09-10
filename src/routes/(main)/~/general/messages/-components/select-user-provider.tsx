import { createContext, useState } from "react";

type SelectUserType = { id: string; name: string; image: string } | null;

export const SelectUserContext = createContext<{
  selectedUser: SelectUserType;
  setSelectedUser: React.Dispatch<React.SetStateAction<SelectUserType>>;
}>({
  selectedUser: null,
  setSelectedUser: () => {},
});

export const SelectUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<SelectUserType>(null);

  return (
    <SelectUserContext value={{ selectedUser, setSelectedUser }}>
      {children}
    </SelectUserContext>
  );
};
