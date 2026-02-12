import Image from "next/image";
import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to the personal photo journal page
  redirect('/about');
}
