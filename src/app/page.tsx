import { getAllPosts } from "@/lib/api";
import HomeClient from "./home-client";
import { Post } from "@/interfaces/post";

export default function Index() {
  const allPosts = getAllPosts();

  // We pass allPosts to the client component. 
  // Note: content might be large, but for now passing it is fine. 
  // Optimization: could strip content if not needed for read time calculation.

  return <HomeClient allPosts={allPosts} />;
}
