"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/components/providers/SearchProvider";

export const DocumentSearch = () => {
  const { query, setQuery } = useSearch();

  return (
    <div className="px-2 pb-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents..."
          className="h-10 rounded-xl border-white/10 bg-white/5 pl-9 text-white placeholder:text-zinc-500"
        />
      </div>
    </div>
  );
};

export default DocumentSearch;
