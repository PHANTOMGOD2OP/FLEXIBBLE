"use client";
import { ReactNode, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const onDismiss = useCallback(() => {
    router.push("/");
  }, [router]);
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current && onDismiss) onDismiss();
    },
    [onDismiss, overlay]
  );

  return (
    <div className="modal bg-red-500" ref={overlay} onClick={handleClick}>
      <button
        type="button"
        className="absolute top-2 right-8"
        onClick={onDismiss}
      >
        <Image src="/close.svg" alt="close" width={17} height={17} />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
};

export default Modal;
