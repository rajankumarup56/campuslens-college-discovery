import { NextRequest, NextResponse } from "next/server";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({ adapter });

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";
    const city = searchParams.get("city")?.trim() || "";
    const state = searchParams.get("state")?.trim() || "";

    const minRatingParam = searchParams.get("minRating");
    const maxFeesParam = searchParams.get("maxFees");

    const pageParam = Number(searchParams.get("page") || "1");
    const limitParam = Number(searchParams.get("limit") || "6");

    const page = Math.max(1, pageParam);
    const limit = Math.min(Math.max(1, limitParam), 50);
    const skip = (page - 1) * limit;

    const minRating = minRatingParam
      ? Number(minRatingParam)
      : undefined;

    const maxFees = maxFeesParam
      ? Number(maxFeesParam)
      : undefined;
const abbreviationMap: Record<string, string> = {
  iit: "Indian Institute of Technology",
  nit: "National Institute of Technology",
  iiit: "Indian Institute of Information Technology",
};

const normalizedSearch = search.toLowerCase();

const expandedSearch = abbreviationMap[normalizedSearch]
  ? abbreviationMap[normalizedSearch]
  : search;
    const where = {
      ...(search
  ? {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          name: {
            contains: expandedSearch,
            mode: "insensitive" as const,
          },
        },
        {
          city: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          state: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    }
  : {}),

      ...(city
        ? {
            city: {
              equals: city,
              mode: "insensitive" as const,
            },
          }
        : {}),

      ...(state
        ? {
            state: {
              equals: state,
              mode: "insensitive" as const,
            },
          }
        : {}),

      ...(minRating !== undefined && !Number.isNaN(minRating)
        ? {
            rating: {
              gte: minRating,
            },
          }
        : {}),

      ...(maxFees !== undefined && !Number.isNaN(maxFees)
        ? {
            fees: {
              lte: maxFees,
            },
          }
        : {}),
    };

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        orderBy: {
          rating: "desc",
        },
        skip,
        take: limit,
        include: {
          courses: true,
          reviews: true,
        },
      }),

      prisma.college.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: colleges,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
      filters: {
        search,
        city,
        state,
        minRating,
        maxFees,
      },
    });
  } catch (error) {
    console.error("College API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Unable to fetch colleges",
      },
      {
        status: 500,
      }
    );
  }
}