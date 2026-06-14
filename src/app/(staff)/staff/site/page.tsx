import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { getSiteSettings } from "@/lib/content";
import { STORES } from "@/lib/stores";
import { SectionTitle } from "@/components/ui";
import { SiteImageEditor } from "@/components/admin/SiteImageEditor";

export const dynamic = "force-dynamic";
export const metadata = { title: "サイト画像の差し替え | 神戸マツダ" };

export default async function SiteImagePage() {
  if (!(await isAuthed())) redirect("/staff/login");
  const settings = getSiteSettings();
  const stores = STORES.map((s) => ({
    id: s.id,
    name: s.name,
    defaultPhoto: s.photo,
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <SectionTitle
        eyebrow="管理画面"
        title="サイト画像の差し替え（店舗写真）"
        desc="各店舗の写真を任意の画像URLに差し替えできます。トップページ・店舗一覧・店舗詳細に反映されます。空欄にすると自動画像に戻ります。"
      />
      <SiteImageEditor stores={stores} initial={settings.storeImages ?? {}} />
    </div>
  );
}
