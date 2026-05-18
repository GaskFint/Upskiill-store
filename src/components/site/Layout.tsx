import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({
  children,
  headerDark = false,
  withFooter = true,
}: {
  children: React.ReactNode;
  headerDark?: boolean;
  withFooter?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header dark={headerDark} />
      <main className="flex-1">{children}</main>
      {withFooter && <Footer />}
    </div>
  );
}