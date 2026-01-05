/* eslint-disable @typescript-eslint/no-explicit-any */
export function normalizeMenuNode(node: any) {
  const children: any[] = [];

  // 1. If your backend provides .submenu already
  if (Array.isArray(node.submenu)) {
    children.push(...node.submenu);
  }

  // 2. Prisma: subcategories
  if (Array.isArray(node.subcategories)) {
    children.push(...node.subcategories);
  }

  // 3. Prisma: documents directly under subcategory
  if (Array.isArray(node.documents)) {
    node.documents.forEach((doc: { title: any; fileUrl: any; }) => {
      children.push({
        title: doc.title,
        url: doc.fileUrl,
        isFile: true,
      });
    });
  }

  // 4. Prisma: subTextGroups
  if (Array.isArray(node.subTextGroups)) {
    node.subTextGroups.forEach((st: { title: any; documents: any[]; }) => {
      children.push({
        title: st.title,
        submenu: st.documents?.map((doc: { title: any; fileUrl: any; }) => ({
          title: doc.title,
          url: doc.fileUrl,
          isFile: true,
        })) || [],
      });
    });
  }

  return children;
}
