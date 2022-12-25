import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { trpc } from "../../utils/trpc";

import { Space_Grotesk } from "@next/font/google";

import toast, { Toaster } from "react-hot-toast";

import {
  AiOutlineDelete,
  AiOutlineMinus,
  AiOutlineOrderedList,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsCartCheckFill, BsGraphUp, BsSuitHeartFill } from "react-icons/bs";
import { IoRefresh } from "react-icons/io5";
import { IoMdArrowBack, IoIosArrowDown } from "react-icons/io";
import { MdCancel, MdModeEditOutline, MdOutlineError } from "react-icons/md";

import { DataContext } from "../../context/DataContext";

import Overlay from "../common/Feedback/Overlay";

const spaceGrotesk = Space_Grotesk({
  weight: "500",
  subsets: ["latin"],
});

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const dataContext = React.useContext(DataContext);
  const pathname = useRouter().pathname.split("/")[1];

  return (
    <>
      <Overlay isActive={false} />
      <div className={`flex h-screen flex-row gap-0 ${spaceGrotesk.className}`}>
        <div className="flex min-h-full w-20 flex-col items-center justify-between bg-white py-6">
          <div className="rounded-full bg-[#3f3d56] p-3">
            <BsSuitHeartFill size="1.3rem" className="text-[#f9a109]" />
          </div>

          <div className="flex flex-col gap-12">
            <Link href="/">
              <span
                className={`tooltip rounded-full p-3 ${
                  pathname === "" && "text-[#f9a109]"
                }`}
                id="Items"
              >
                <span className="hidden">Items</span>
                <AiOutlineOrderedList size="1.3rem" />
              </span>
            </Link>
            <Link href="/history">
              <span
                className={`tooltip rounded-full p-3 ${
                  pathname === "history" && "text-[#f9a109]"
                }`}
                id="History"
              >
                <span className="hidden">History</span>
                <IoRefresh size="1.3rem" />
              </span>
            </Link>
            <Link href="/statistics">
              <span
                className={`tooltip rounded-full p-3 ${
                  pathname === "statistics" && "text-[#f9a109]"
                }`}
                id="Statistics"
              >
                <span className="hidden">Statistics</span>
                <BsGraphUp size="1.3rem" />
              </span>
            </Link>
          </div>

          <div className="relative rounded-full bg-[#f9a109] p-3">
            <span className="absolute top-[-6px] right-[-6px] flex h-5 w-5 items-center justify-center rounded-lg bg-[#eb5757] p-2 text-white">
              3
            </span>
            <BsCartCheckFill size="1.3rem" className="text-white" />
          </div>
        </div>

        {children}

        {dataContext?.currentSideBarStatus === "default" && <DefaultItem />}
        {(dataContext?.currentSideBarStatus === "add" ||
          dataContext?.currentSideBarStatus === "edit") && <AddEditItem />}
        {dataContext?.currentSideBarStatus === "show" && <ShowItem />}
      </div>
    </>
  );
};

const DefaultItem = () => {
  const [showFullButtonName, setShowFullButtonName] = useState<string | null>(
    null
  );
  const [isInEditMode, setIsInEditMode] = useState(false);
  const utils = trpc.useContext();
  const incrementMutation = trpc.ShpooingListItemData.doIncrement.useMutation({
    onSuccess: () => {
      utils.ShpooingListItemData.getAllData.invalidate();
    },
  });
  const decrementMutation = trpc.ShpooingListItemData.doDecrement.useMutation({
    onSuccess: () => {
      utils.ShpooingListItemData.getAllData.invalidate();
    },
  });
  const deleteMutation =
    trpc.ShpooingListItemData.removeItemFromShoppingList.useMutation({
      onSuccess: () => {
        utils.ShpooingListItemData.getAllData.invalidate();
      },
    });
  const { data } = trpc.ShpooingListItemData.getAllData.useQuery();

  const dataContext = useContext(DataContext);

  const handleShowFullButton = (name: string) => {
    if (showFullButtonName === name) {
      setShowFullButtonName(null);
    } else {
      setShowFullButtonName(name);
    }
  };

  const handleInfoButtonClick = (item: string, name: string) => {
    dataContext?.setEditItemInfo({
      item,
      name,
    });
    dataContext?.setCurrentSideBarStatus("show");
  };

  const handleIncrementButtonClick = async (
    item: string,
    count: number,
    name: string
  ) => {
    await incrementMutation.mutateAsync({
      item,
      count,
      name,
    });
  };

  const handleDecrementButtonClick = async (
    item: string,
    count: number,
    name: string
  ) => {
    if (count === 0) {
      return toast.error("Operation not allowed", {
        position: "bottom-left",
        duration: 3000,
        icon: <MdOutlineError size={"1.3rem"} />,
        style: {
          borderRadius: "10px",
          background: "red",
          color: "#fff",
        },
      });
    }
    await decrementMutation.mutateAsync({
      item,
      count,
      name,
    });
  };

  const removeItemFromShoppingList = async (item: string, name: string) => {
    const updatedData = data?.map((data) => {
      if (data.name === name) {
        return {
          ...data,
          items: data.items.filter((itemData) => itemData.name !== item),
        };
      }
      return data;
    });
    await deleteMutation.mutateAsync({
      name,
      items: updatedData?.find((data) => data?.name === name)?.items!,
    });
  };

  return (
    <>
      <Overlay
        isActive={
          incrementMutation.isLoading ||
          decrementMutation.isLoading ||
          deleteMutation.isLoading
        }
      />

      <div className="flex w-[20%] flex-col justify-between bg-white">
        <div className="flex h-full flex-col items-center gap-5 bg-[#fff0de] py-6 px-5">
          <div className="flex items-center justify-center gap-7 rounded-lg bg-[#80485b] px-6">
            <Image
              width={200}
              height={200}
              className="relative right-1 h-32 w-12 -translate-y-4 rotate-[-20deg]"
              src="/kissclipart-cola-bottle-png-clipart-fizzy-drinks-beer-bottle-853f3ea787dad24a-removebg-preview.png"
              alt="bear-bottle"
            />

            <div className="flex flex-col items-center justify-center gap-3">
              <span className="text-white">
                Didn`&apos;t find what you need?
              </span>
              <button
                onClick={() => dataContext?.setCurrentSideBarStatus("add")}
                className="w-fit rounded-xl bg-white px-4 py-2 text-[#80485b]"
              >
                Add Item
              </button>
            </div>
          </div>

          <div className="flex w-full items-center justify-between">
            <span className="text-xl">Shopping List</span>
            <button onClick={() => setIsInEditMode(!isInEditMode)}>
              <span className="sr-only">edit</span>
              {isInEditMode ? (
                <MdCancel size={"1.5rem"} />
              ) : (
                <MdModeEditOutline size="1.3rem" />
              )}
            </button>
          </div>

          <div className="flex w-full flex-col gap-5">
            <div className="flex max-h-[440px] flex-col gap-4 overflow-y-auto px-1">
              {data?.map((data) => (
                <div className="flex flex-col gap-2" key={data.id}>
                  <span className="text-[14px] text-slate-500">
                    {data.name}
                  </span>
                  <div className="flex flex-col gap-1">
                    {data?.items?.length === 0 && (
                      <span className="text-center text-red-500">
                        No items found. Please select an item from Menu
                      </span>
                    )}
                    {data?.items.map((item, i: number) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <span className="truncate">{item.name}</span>
                        {!isInEditMode ? (
                          <span
                            className={`flex items-center justify-center gap-2 rounded-lg py-0 text-[#f9a109] ${
                              showFullButtonName === item.name &&
                              "bg-white pr-2"
                            }`}
                          >
                            {showFullButtonName === item.name && (
                              <>
                                <button
                                  onClick={() =>
                                    removeItemFromShoppingList(
                                      item.name,
                                      data.name
                                    )
                                  }
                                  className="rounded-md bg-[#f9a109] px-1 py-2"
                                >
                                  <span className="sr-only">delete</span>
                                  <AiOutlineDelete
                                    className="text-white"
                                    size={"1.3rem"}
                                  />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDecrementButtonClick(
                                      item.name,
                                      item.count,
                                      data.name
                                    )
                                  }
                                >
                                  <span className="sr-only">minus</span>
                                  <AiOutlineMinus />
                                </button>
                              </>
                            )}
                            <button
                              className="my-1 rounded-lg border-2 border-[#f9a109] px-4 py-0"
                              onClick={() => handleShowFullButton(item.name)}
                            >
                              {item.count}
                            </button>
                            {showFullButtonName === item.name && (
                              <button
                                onClick={() =>
                                  handleIncrementButtonClick(
                                    item.name,
                                    item.count,
                                    data.name
                                  )
                                }
                              >
                                <span className="sr-only">add</span>
                                <AiOutlinePlus />
                              </button>
                            )}
                          </span>
                        ) : (
                          <button
                            className="my-1 rounded-lg border-2 border-[#f9a109] px-4 py-0 text-[#f9a109]"
                            onClick={() =>
                              handleInfoButtonClick(item.name, data.name)
                            }
                          >
                            Info
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="my-5 flex items-center justify-center rounded-xl  border-2 border-[#f9a109]">
          <input
            className="w-full bg-transparent px-4 outline-none"
            placeholder="Enter a name"
            type="text"
            title="name"
          />
          <button className="rounded-lg bg-[#f9a109] px-5 py-3 text-white">
            Save
          </button>
        </div>
      </div>
      <Toaster />
    </>
  );
};

const AddEditItem = () => {
  const dataContext = useContext(DataContext);
  const utils = trpc.useContext()
  const { data: selectedData } = trpc.ShpooingListItemData.getAllData.useQuery();
  const [input, setInput] = useState({
    name: "",
    desc: "",
    imageUrl: "",
    category: "",
  });

  const categories = selectedData?.map((data) => data.name);

  const { data, isLoading } = trpc.menuItemData.getData.useQuery({
    name: dataContext?.editItemInfo.name!,
  });
  const mutation = trpc.menuItemData.updateData.useMutation();

  useEffect(() => {
    if (dataContext?.currentSideBarStatus === "edit") {
      const filteredData = data?.items.find(
        (item) =>
          item.name.toLowerCase() ===
          dataContext?.editItemInfo.item.toLowerCase()
      );
      setInput({
        name: filteredData?.name!,
        desc: filteredData?.description!,
        imageUrl: filteredData?.url!,
        category: dataContext.editItemInfo.name,
      });
    }
  }, [dataContext?.currentSideBarStatus]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSaveButton = async () => {
    await mutation.mutateAsync({
      desc: input.desc,
      name: input.category,
      url: input.imageUrl,
      item: input.name,
      type: dataContext?.currentSideBarStatus as "edit" | "add",
    });
    await utils.menuItemData.getAllData.invalidate();
    dataContext?.setEditItemInfo({ name: input.category, item: input.name });
    dataContext?.setCurrentSideBarStatus("show");
  };

  return (
    <>
      <Overlay isActive={isLoading || mutation.isLoading} />
      <div className="flex min-h-full w-[20%] flex-col justify-between gap-7 bg-white py-5 px-4">
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl">
            {dataContext?.currentSideBarStatus === "edit"
              ? "Edit an item"
              : "Add a new item"}
          </h3>

          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input
                className="rounded-lg border-2 border-stone-500 px-4 py-2 outline-none hover:border-[#f9a109] focus:border-[#f9a109]"
                placeholder="Enter a name"
                name="name"
                onChange={handleInputChange}
                value={input.name}
                type="text"
                id="name"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="note">Note (optional)</label>
              <textarea
                className="rounded-lg border-2 border-stone-500 px-4 py-2 outline-none hover:border-[#f9a109] focus:border-[#f9a109]"
                placeholder="Enter a note"
                name="desc"
                onChange={handleInputChange}
                value={input.desc}
                rows={7}
                id="note"
              />
            </div>

            <div className="">
              <label htmlFor="images">Images</label>
              <input
                className="w-full rounded-lg border-2 border-stone-500 px-4 py-2 outline-none hover:border-[#f9a109] focus:border-[#f9a109]"
                placeholder="Enter an url"
                name="imageUrl"
                onChange={handleInputChange}
                value={input.imageUrl}
                type="text"
                id="images"
              />
            </div>

            <div className="relative flex w-full flex-col gap-1">
              <IoIosArrowDown
                className="absolute top-10 right-3"
                size={"1.3rem"}
              />
              <label htmlFor="category">Category</label>
              <select
                className="appearance-none rounded-lg border-2 border-stone-500 px-4 py-2 outline-none hover:border-[#f9a109] focus:border-[#f9a109]"
                placeholder="Enter a category"
                name="category"
                onChange={handleInputChange}
                value={input.category}
                id="category"
              >
                <option value="" disabled selected>
                  Categories
                </option>
                {categories?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => dataContext?.setCurrentSideBarStatus("default")}
            className="rounded-lg px-5 py-3"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveButton}
            className="rounded-lg bg-[#f9a109] px-5 py-3 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

const ShowItem = () => {
  const dataContext = useContext(DataContext);
  const { data, isLoading } = trpc.menuItemData.getData.useQuery({
    name: dataContext?.editItemInfo.name!,
  });

  const filteredData = data?.items.find(
    (item) =>
      item.name.toLowerCase() === dataContext?.editItemInfo.item.toLowerCase()
  );

  return (
    <>
      <Overlay isActive={isLoading} />
      <div className="flex min-h-full w-[20%] flex-col justify-between gap-7 bg-white py-5 px-4">
        <div className="flex flex-col gap-5">
          <button className="flex items-center gap-2 text-[#f9a109]">
            <IoMdArrowBack size="1.3rem" /> back
          </button>

          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-center">
              <Image
                width={200}
                height={200}
                className="h-44 rounded-lg"
                src={filteredData?.url!}
                alt="item-image"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h6 className="text-gray-500">Name</h6>
              <span className="text-lg">{filteredData?.name}</span>
            </div>

            <div className="flex flex-col gap-1">
              <h6 className="text-gray-500">Category</h6>
              <span className="text-lg">{dataContext?.editItemInfo.name}</span>
            </div>

            <div className="flex flex-col gap-1">
              <h6 className="text-gray-500">Note</h6>
              <div className="max-h-[220px] overflow-y-auto">
                <span className="text-lg">{filteredData?.description}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => dataContext?.setCurrentSideBarStatus("default")}
            className="rounded-lg px-5 py-3"
          >
            Back
          </button>

          <button
            onClick={() => dataContext?.setCurrentSideBarStatus("edit")}
            className="rounded-lg bg-[#f9a109] px-5 py-3 text-white"
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
