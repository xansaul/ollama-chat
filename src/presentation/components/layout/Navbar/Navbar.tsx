import { getChats } from "@/actions/get-chats.action";
import { AsideNav } from "./aside-nav/AsideNav";
import { MobileNav } from "./mobile-nav/MobileNav";


export const Navbar = async() => {
  const chats = await getChats();
  return (
    <>
      <AsideNav chats={chats} />
      <MobileNav chats={chats} />
    </>
  );
};
