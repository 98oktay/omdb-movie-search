import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton() {
  return (
    <Link href="/" className="movie-detail-link">
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back to Search
    </Link>
  );
}
