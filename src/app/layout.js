import "./globals.css";

export const metadata = {
  title: "Countdown",
  description: "Animated countdown with React",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
