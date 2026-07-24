import { redirect } from "next/navigation";

export default function AdminInMotionRedirect() {
  redirect("/admin/home?tab=in-motion");
}
