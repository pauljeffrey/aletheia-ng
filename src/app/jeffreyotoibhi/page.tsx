import AboutFounder from "@/sections/AboutFounder";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;

  return <AboutFounder searchParams={resolvedParams} />;
}


// import AboutFounder from "@/sections/AboutFounder";
// // import PageProps from "next";

// // interface PageProps {
// //   searchParams: { [key: string]: string | string[] | undefined };
// // }

// // export default function Page({ searchParams }: PageProps) {
// //   return <AboutFounder searchParams={searchParams} />;
// // }

// export default function Page({
//   searchParams,
// }: {
//   searchParams?: { [key: string]: string | string[] | undefined };
// }) {
//   return <AboutFounder searchParams={searchParams ?? {}} />;
// }
