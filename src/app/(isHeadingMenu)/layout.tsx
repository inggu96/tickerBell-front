import Header from "@/components/header/Header";
import { SearchTab } from "@/components/SearchTab/SearchTab";

export default function IsHeadingMenuLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <SearchTab />
      <div className="pt-10 m-auto max-w-1280">{children}</div>
    </>
  );
}
