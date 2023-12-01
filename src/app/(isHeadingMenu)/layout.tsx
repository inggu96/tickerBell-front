import Header from "@/components/header/Header";

export default function IsHeadingMenuLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="pt-10 m-auto max-w-1280">{children}</div>
    </>
  );
}
