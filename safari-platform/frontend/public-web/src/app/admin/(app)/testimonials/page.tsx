import { redirect } from "next/navigation";

export default function AdminTestimonialsRedirect() {
  redirect("/admin/home?tab=testimonials");
}
