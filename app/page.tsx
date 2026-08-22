"use client";

import { useEffect, useState } from "react";

type Course = {
  id: number;
  name: string;
  duration: string;
  degree: string;
};

type Review = {
  id: number;
  author: string;
  rating: number;
  comment: string;
};

type College = {
  id: number;
  name: string;
  slug: string;
  city: string;
  state: string;
  country: string;
  fees: number;
  rating: number;
  placement: number;
  description: string;
  website?: string | null;
  courses: Course[];
  reviews: Review[];
};

type ApiResponse = {
  success: boolean;
  data: College[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  filters: {
    search: string;
    city: string;
    state: string;
  };
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchColleges = async (searchTerm = search, pageNumber = page) => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (searchTerm.trim()) {
        params.set("search", searchTerm.trim());
      }

      params.set("page", String(pageNumber));
      params.set("limit", "6");

      const response = await fetch(`/api/colleges?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch colleges");
      }

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error("Unable to fetch colleges");
      }

      setColleges(result.data);
      setTotal(result.pagination.total);
      setTotalPages(result.pagination.totalPages);
    } catch (err) {
      console.error(err);
      setError("Unable to load colleges. Please try again.");
      setColleges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges("", 1);
  }, []);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setPage(1);
    await fetchColleges(search, 1);
  };

  const handleClear = async () => {
    setSearch("");
    setPage(1);
    await fetchColleges("", 1);
  };

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setPage(newPage);
    await fetchColleges(search, newPage);
  };

  const formatFees = (fees: number) => {
    return `₹${fees.toLocaleString("en-IN")}`;
  };

  const formatPlacement = (placement: number) => {
    return `₹${(placement / 100000).toFixed(1)} LPA`;
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">
              CampusLens
            </h1>
            <p className="text-xs text-slate-500">
              Find the right college for your future
            </p>
          </div>

          <div className="hidden text-sm text-slate-600 sm:block">
            Explore • Compare • Decide
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-100">
            India College Discovery Platform
          </p>

          <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl">
            Find the right college with confidence
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
            Search colleges, compare fees, ratings, placements and courses
            before making your decision.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by college, city or state..."
              className="h-14 flex-1 rounded-xl border-0 bg-white px-5 text-base text-slate-900 shadow-lg outline-none ring-0 placeholder:text-slate-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="h-14 rounded-xl bg-slate-900 px-8 font-semibold text-white shadow-lg transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Searching..." : "Search"}
            </button>

            {search && (
              <button
                type="button"
                onClick={handleClear}
                className="h-14 rounded-xl bg-white px-6 font-semibold text-slate-700 shadow-lg transition hover:bg-slate-100"
              >
                Clear
              </button>
            )}
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              College Directory
            </p>

            <h3 className="mt-1 text-3xl font-bold">
              {search
                ? `Results for "${search}"`
                : "Explore Top Colleges"}
            </h3>
          </div>

          <p className="text-sm text-slate-500">
            {total} college{total !== 1 ? "s" : ""} found
          </p>
        </div>

        {error && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {loading && colleges.length === 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>
        ) : colleges.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="text-5xl">🎓</div>

            <h4 className="mt-4 text-xl font-bold">
              No colleges found
            </h4>

            <p className="mt-2 text-slate-500">
              Try searching for another college, city or state.
            </p>

            <button
              onClick={handleClear}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              View all colleges
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {colleges.map((college) => (
                <article
                  key={college.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
                        🎓
                      </div>

                      <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-amber-600 shadow-sm">
                        ⭐ {college.rating.toFixed(1)}
                      </div>
                    </div>

                    <h4 className="text-xl font-bold leading-snug text-slate-900">
                      {college.name}
                    </h4>

                    <p className="mt-2 text-sm text-slate-500">
                      📍 {college.city}, {college.state}
                    </p>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                      {college.description}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">
                          Annual Fees
                        </p>
                        <p className="mt-1 font-bold text-slate-900">
                          {formatFees(college.fees)}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs text-slate-500">
                          Avg. Placement
                        </p>
                        <p className="mt-1 font-bold text-slate-900">
                          {formatPlacement(college.placement)}
                        </p>
                      </div>
                    </div>

                    {/* Courses */}
                    <div className="mt-5">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Popular Courses
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {college.courses.slice(0, 3).map((course) => (
                          <span
                            key={course.id}
                            className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                          >
                            {course.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                      <span className="text-sm text-slate-500">
                        {college.reviews.length} reviews
                      </span>

                      {college.website ? (
                        <a
                          href={college.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                          Visit Website
                        </a>
                      ) : (
                        <button
                          disabled
                          className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500"
                        >
                          No Website
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1 || loading}
                  className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Previous
                </button>

                <span className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages || loading}
                  className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center">
          <p className="font-bold text-blue-700">CampusLens</p>
          <p className="mt-1 text-sm text-slate-500">
            Helping students make better college decisions.
          </p>
        </div>
      </footer>
    </main>
  );
}