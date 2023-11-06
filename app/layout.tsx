import Footer from "@/components/Footer";
import "./global.css";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "FLEXIBBLE",
  description: "A Platform where UI/UX designers or Graphic Designers get to showcase their Art In Various Different Categories With Their Social Links So that they can get customers by marketing themselves on this platform",
  author: "PHANTOMGOD2OP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Navbar />
        <main> {children}</main>
        <Footer />
      </body>
    </html>
  );
}
