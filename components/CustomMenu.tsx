import { Menu } from "@headlessui/react";
import Image from "next/image";
type Props = {
  title: string;
  state: string;
  filters: Array<string>;
  setState: (value: string) => void;
};
const CustomMenu = ({ title, state, filters, setState }: Props) => {
  return (
    <div className="flexStart w-full flex-col gap-7 relative">
      <label htmlFor={title} className="w-full text-gray-100 relative">
        {title}
      </label>
      <Menu as="div" className="self-start flexStart   relative">
        <Menu.Button className="custom_menu-btn flexCenter">
          {state || "select category"}
          <Image
            src="/arrow-down.svg"
            alt="arrow down"
            width={10}
            height={10}
          />
        </Menu.Button>
        <Menu.Items className="flexStart top-12 custom_menu-items">
          {filters.map((tag) => (
            <Menu.Item key={tag}>
              <button
                type="button"
                value={tag}
                className="custom_menu-item"
                onClick={(e) => setState(e.currentTarget.value)}
              >
                {tag}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default CustomMenu;
