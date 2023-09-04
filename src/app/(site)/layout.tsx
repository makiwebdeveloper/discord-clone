import Header from "@/components/header";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="bg-zinc-900 shadow-xl lg:rounded-md w-full lg:w-[840px] xl:w-[1080px] h-full lg:h-[550px] xl:h-[620px]">
      <Header />
      <div className="flex h-[calc(100%-32px)]">
        <NavigationSidebar />
        <div className="bg-zinc-800 rounded-tl-md lg:rounded-br-md w-full">
          {children}
        </div>
      </div>
    </article>
  );
}
