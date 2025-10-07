import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Schedutable - Authentification",
    description: "Plateforme de gestion des emplois du temps",
};
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <section className=" min-h-screen">
          {children}
      </section>
  );
}
