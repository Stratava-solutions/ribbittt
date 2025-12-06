import Image from "next/image";
import { redirect } from "next/navigation";

export default function HomePage() {
  // Immediately redirect to /services/home
  redirect("/service/home");
}