import React from "react";
import Spinner from "./Spinner";

type OverlayProps = {
  children?: React.ReactNode;
  isShowing: boolean;
};

const Overlay = ({ isShowing }: OverlayProps) => {
  return isShowing ? (
    <div className="absolute z-[10000] flex min-h-screen w-full items-center justify-center backdrop-blur-sm">
      <Spinner />
    </div>
  ) : null;
};

export default Overlay;
