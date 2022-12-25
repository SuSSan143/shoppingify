import { createContext, useState } from "react";

interface EditItem {
  name: string;
  item: string;
}

interface DataContextInterface {
  currentSideBarStatus: "default" | "add" | "show" | "edit";
  setCurrentSideBarStatus: React.Dispatch<
    React.SetStateAction<"default" | "add" | "show" | "edit">
  >;
  editItemInfo: EditItem;
  setEditItemInfo: React.Dispatch<React.SetStateAction<EditItem>>;
}

interface DataContextProviderProps {
  children: React.ReactNode;
}

export const DataContext = createContext<DataContextInterface | null>(null);

const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const [editItem, setEditItem] = useState({
    name: "",
    item: "",
  });
  const [currentSideBar, setCurrentSideBar] = useState<
    "default" | "add" | "show" | "edit"
  >("default");

  return (
    <DataContext.Provider
      value={{
        currentSideBarStatus: currentSideBar,
        setCurrentSideBarStatus: setCurrentSideBar,
        editItemInfo: editItem,
        setEditItemInfo: setEditItem,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
