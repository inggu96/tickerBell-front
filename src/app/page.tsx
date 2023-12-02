import Header from "@/components/header/Header";
import { List } from "@/components/list/List";
import SlideList from "@/components/SlideList/SlideList";

export default function Home() {
  return (
    <main className="">
      <Header />
      <div className="pt-10 m-auto max-w-1280">
        <SlideList />
        <List category="" type="main" className="mb-80" />
      </div>
    </main>
  );
}
