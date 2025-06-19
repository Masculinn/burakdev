import BlogCard from "@/components/Blog/blog-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/db";
import { BlogPost, SearchBarProps } from "@/interfaces";
import { Filter, Rss } from "lucide-react";
import Head from "next/head";
import { FC, useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BuyMeCoffee from "@/components/ui/buy-me-coffee";
import { Card, CardContent } from "@/components/ui/card";
import Newsletter from "@/components/Blog/newsletter";
import Link from "next/link";
import MotionQueue from "@/components/MotionProvider/motion-queue";
import { AnimationQueueAnimationProps } from "@/components/MotionProvider/types";

export default function Blogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [tags, setTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("new-to-old");
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await db.from("blog_posts").select("*");
        if (error) throw error;
        if (data) {
          setBlogs(data);
          setFilteredBlogs(data);
          const uniqueTags = Array.from(
            new Set(data.flatMap((post) => post.tags))
          );
          setTags(["All", ...uniqueTags]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...blogs];

    if (selectedTag !== "All") {
      filtered = filtered.filter((blog) => blog.tags.includes(selectedTag));
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === "old-to-new") {
      filtered.sort(
        (a, b) =>
          new Date(a.published_at).getTime() -
          new Date(b.published_at).getTime()
      );
    }
    if (sortBy === "new-to-old") {
      filtered.sort(
        (a, b) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime()
      );
    } else if (sortBy === "a-z") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "z-a") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredBlogs(filtered);
  }, [blogs, search, selectedTag, sortBy]);

  const renderLoading: React.ReactNode | null = useMemo(() => {
    if (loading) {
      return (
        <>
          {Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton className="size-52 w-full" key={idx} />
          ))}
        </>
      );
    }
    return null;
  }, [loading]);

  return (
    <>
      <Head>
        <title>burakdev | Blogs</title>
        <meta
          name="description"
          content="Discover the latest articles, tutorials, and insights from Burak Bilen."
        />
        <link rel="canonical" href="https://burakdev.com/blogs" />
        <meta property="og:title" content="burakdev | Blogs" />
        <meta
          property="og:description"
          content="Discover the latest articles, tutorials, and insights from Burak Bilen."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://burakdev.com/blogs" />
        <meta property="og:site_name" content="burakdev" />
      </Head>
      <MagazineHeader
        handlePopup={() => setIsPopupOpen(true)}
        selectedTag={selectedTag}
        loading={loading}
        onTagSelect={setSelectedTag}
        tags={tags}
        sortBy={sortBy}
        onSortChange={setSortBy}
      >
        <SearchBar handleChange={setSearch} value={search} />
      </MagazineHeader>
      <div className="w-full h-auto grid lg:grid-cols-2 grid-cols-1 lg:my-8 my-4 gap-4">
        {loading
          ? renderLoading
          : filteredBlogs.map((blog, idx) => (
              <Link
                key={idx}
                className="hover:scale-105 duration-300 transition-all"
                href={`/blogs/${blog.slug}`}
              >
                <BlogCard {...blog} key={idx} />
              </Link>
            ))}
      </div>
      {isPopupOpen && (
        <div className="fixed top-0 left-0 w-full lg:h-full h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
          <Newsletter onClose={() => setIsPopupOpen(false)} />
        </div>
      )}
    </>
  );
}

const SearchBar: FC<SearchBarProps> = ({ handleChange, value }) => {
  return (
    <div className="lg:w-full w-72 h-auto flex flex-row items-center">
      <div className="flex lg:w-full w-60 items-center space-x-2">
        <Input
          type="text"
          placeholder="Search for better yourself..."
          className="text-xs lg:text-sm"
          onChange={(e) => handleChange(e.target.value)}
          value={value}
        />
      </div>
    </div>
  );
};

interface MagazineHeaderProps {
  children: React.ReactNode;
  selectedTag: string;
  onTagSelect: (tag: string) => void;
  tags: string[];
  sortBy: string;
  loading: boolean;
  onSortChange: (sort: string) => void;
  handlePopup: () => void;
}

const title = "Welcome To My Kitchen.".split(/\s+/);
const tagLoading = Array.from({ length: 6 }).map((_, idx) => (
  <Skeleton className="h-8 w-24" key={idx} />
));

const MagazineHeader = ({
  children,
  selectedTag,
  onTagSelect,
  loading,
  tags,
  handlePopup,
  onSortChange,
}: MagazineHeaderProps) => {
  const [isSortMenuOpen, setIsSortMenuOpen] = useState<boolean>(false);

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="col-span-2 flex-1 space-y-4">
          <div className="flex flex-wrap gap-2">
            <MotionQueue
              elementType="h1"
              animations={
                Array.from({ length: title.length }).fill({
                  mode: ["filterBlurIn", "fadeRight"],
                  duration: 1,
                  configView: { once: false, amount: 0.5 },
                }) as AnimationQueueAnimationProps[]
              }
              isDynamicallyQueued
              children={title}
              delayLogic="linear"
              className="text-4xl md:text-5xl font-bold tracking-tight"
              duration={0.5}
            />
          </div>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Prepare yourself for a culinary adventure! You will find yourself
            surrounded by everything related with a purpose that touches to any
            way of building better web.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4 relative">
        <div className="flex-1">{children}</div>
        {loading ? (
          <Skeleton className="w-24 h-10" />
        ) : (
          <Select onValueChange={onTagSelect}>
            <SelectTrigger className="lg:w-[180px] w-10 lg:h-9 h-[34px]">
              <SelectValue placeholder="Category" className="before:hidden" />
            </SelectTrigger>
            <SelectContent>
              {tags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className="flex gap-2 md:justify-end">
          <Button variant="outline" onClick={handlePopup}>
            <Rss className="mr-2 h-4 w-4" />
            Subscribe
          </Button>
          <BuyMeCoffee style="lg:scale-100 h-9 w-9" justCoffee />
        </div>

        <div className="relative">
          {loading ? (
            <Skeleton className="size-10" />
          ) : (
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => setIsSortMenuOpen((prev) => !prev)}
            >
              <Filter className="h-4 w-4" />
            </Button>
          )}
          {isSortMenuOpen && (
            <Card className="absolute right-0 mt-2 w-40  border rounded shadow-md z-[999]">
              <CardContent
                className="cursor-pointer px-4 py-2 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white text-sm"
                onClick={() => {
                  onSortChange("old-to-new");
                  setIsSortMenuOpen(false);
                }}
              >
                Old to New
              </CardContent>
              <CardContent
                className="cursor-pointer px-4 py-2 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white text-sm"
                onClick={() => {
                  onSortChange("new-to-old");
                  setIsSortMenuOpen(false);
                }}
              >
                New to Old
              </CardContent>
              <CardContent
                className="cursor-pointer px-4 py-2 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white text-sm"
                onClick={() => {
                  onSortChange("a-z");
                  setIsSortMenuOpen(false);
                }}
              >
                A - Z
              </CardContent>
              <CardContent
                className="cursor-pointer px-4 py-2 dark:hover:bg-white dark:hover:text-black hover:bg-black hover:text-white text-sm"
                onClick={() => {
                  onSortChange("z-a");
                  setIsSortMenuOpen(false);
                }}
              >
                Z - A
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {loading
          ? tagLoading
          : tags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "secondary" : "outline"}
                onClick={() => onTagSelect(tag)}
                className="cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
      </div>
    </div>
  );
};
