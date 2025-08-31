import AboutFounder from "@/sections/AboutFounder";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ searchParams }: PageProps) {
  return <AboutFounder searchParams={searchParams} />;
}
