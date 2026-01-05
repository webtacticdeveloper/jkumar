/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { getSubcategoryData } from "@/lib/investorQueries";
import SubcategoryDropdownClient from "./SubcategoryDropdownClient";

interface Props {
  categorySlug: string;
  subSlug: string;
}

export default async function SubcategoryDropdownPage({
  categorySlug,
  subSlug,
}: Props) {
  const subData = await getSubcategoryData(categorySlug, subSlug);

  if (!subData || !subData.subTextGroups?.length) {
    return notFound();
  }

  const groups = [...subData.subTextGroups].sort(
    (a: any, b: any) => (b.position ?? 0) - (a.position ?? 0)
  );

  return (
    <SubcategoryDropdownClient
      subcategoryName={subData.name}
      groups={groups}
    />
  );
}
