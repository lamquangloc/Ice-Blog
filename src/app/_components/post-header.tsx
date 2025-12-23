import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export function PostHeader({
  title,
  coverImage,
  date,
  author,
}: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>

      {/* Desktop Author & Date */}
      <div className="hidden md:flex md:items-center md:gap-4 md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <div className="text-lg text-slate-500">
          <DateFormatter dateString={date} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} />
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Mobile Author & Date */}
        <div className="flex md:hidden items-center gap-4 mb-6">
          <Avatar name={author.name} picture={author.picture} />
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <div className="text-lg text-slate-500">
            <DateFormatter dateString={date} />
          </div>
        </div>
      </div>
    </>
  );
}
