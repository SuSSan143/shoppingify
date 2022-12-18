import { type SelectedData } from "@prisma/client";
import { createContext, useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

interface EditItem {
  name: string;
  item: string;
}

interface DataContextInterface {
  data: SelectedData[];
  setData: React.Dispatch<React.SetStateAction<SelectedData[]>>;
  currentSideBar: "default" | "add" | "show" | "edit";
  setCurrentSideBar: React.Dispatch<
    React.SetStateAction<"default" | "add" | "show" | "edit">
  >;
  editItem: EditItem;
  setEditItem: React.Dispatch<React.SetStateAction<EditItem>>;
}

interface DataContextProviderProps {
  children: React.ReactNode;
}

export const DataContext = createContext<DataContextInterface | null>(null);

const DataContextProvider: React.FC<DataContextProviderProps> = ({
  children,
}) => {
  const {
    data: selectedData,
    // error,
    // isError,
  } = trpc?.selectedData?.getAllData?.useQuery();
  const [data, setData] = useState<SelectedData[]>(selectedData!);
  const [editItem, setEditItem] = useState({
    name: "Fruits and Vegetables",
    item: "Cucumber",
  });
  const [currentSideBar, setCurrentSideBar] = useState<
    "default" | "add" | "show" | "edit"
  >("default");

  useEffect(() => {
    setData(selectedData!);
  }, [selectedData]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        currentSideBar,
        setCurrentSideBar,
        editItem,
        setEditItem,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
