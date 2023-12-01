import Header from "@/components/header/Header";
import { SideBar } from "@/components/sidebar/SideBar";

const index = () => {
  return (
    <div>
      <Header />
      <SideBar />
      <div>컨텐츠 </div>
    </div>
  );
};

export default index;
