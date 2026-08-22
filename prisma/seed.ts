import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const colleges = [
  {
    name: "Indian Institute of Technology Delhi",
    slug: "iit-delhi",
    city: "New Delhi",
    state: "Delhi",
    fees: 250000,
    rating: 4.8,
    placement: 2500000,
    description:
      "A premier engineering and research institute known for strong academics, research, innovation and industry opportunities.",
    website: "https://home.iitd.ac.in/",
    courses: [
      { name: "B.Tech Computer Science", degree: "B.Tech", duration: "4 Years" },
      { name: "M.Tech Computer Science", degree: "M.Tech", duration: "2 Years" },
    ],
  },
  {
    name: "Indian Institute of Technology Bombay",
    slug: "iit-bombay",
    city: "Mumbai",
    state: "Maharashtra",
    fees: 260000,
    rating: 4.9,
    placement: 2800000,
    description:
      "One of India's leading technical institutes with strong engineering, technology, research and entrepreneurship programs.",
    website: "https://www.iitb.ac.in/",
    courses: [
      { name: "B.Tech Computer Science", degree: "B.Tech", duration: "4 Years" },
      { name: "M.Tech Computer Science", degree: "M.Tech", duration: "2 Years" },
    ],
  },
  {
    name: "Indian Institute of Technology Kanpur",
    slug: "iit-kanpur",
    city: "Kanpur",
    state: "Uttar Pradesh",
    fees: 245000,
    rating: 4.8,
    placement: 2600000,
    description:
      "A research-focused institute offering strong programs in engineering, computer science and emerging technologies.",
    website: "https://www.iitk.ac.in/",
    courses: [
      { name: "B.Tech Computer Science", degree: "B.Tech", duration: "4 Years" },
      { name: "M.Tech Computer Science", degree: "M.Tech", duration: "2 Years" },
    ],
  },
  {
    name: "Indian Institute of Technology Hyderabad",
    slug: "iit-hyderabad",
    city: "Hyderabad",
    state: "Telangana",
    fees: 230000,
    rating: 4.6,
    placement: 2200000,
    description:
      "A modern IIT with strong technology, engineering, research and innovation programs.",
    website: "https://iith.ac.in/",
    courses: [
      { name: "B.Tech Computer Science", degree: "B.Tech", duration: "4 Years" },
      { name: "M.Tech Artificial Intelligence", degree: "M.Tech", duration: "2 Years" },
    ],
  },
  {
    name: "Birla Institute of Technology and Science Pilani",
    slug: "bits-pilani",
    city: "Pilani",
    state: "Rajasthan",
    fees: 520000,
    rating: 4.6,
    placement: 1800000,
    description:
      "A leading private technical university offering engineering, technology and research-oriented programs.",
    website: "https://www.bits-pilani.ac.in/",
    courses: [
      { name: "B.E. Computer Science", degree: "B.E.", duration: "4 Years" },
      { name: "M.E. Computer Science", degree: "M.E.", duration: "2 Years" },
    ],
  },
  {
    name: "Delhi Technological University",
    slug: "dtu",
    city: "New Delhi",
    state: "Delhi",
    fees: 220000,
    rating: 4.5,
    placement: 1600000,
    description:
      "A well-known technical university with strong engineering programs and industry-oriented education.",
    website: "https://dtu.ac.in/",
    courses: [
      { name: "B.Tech Computer Science", degree: "B.Tech", duration: "4 Years" },
      { name: "B.Tech Information Technology", degree: "B.Tech", duration: "4 Years" },
    ],
  },
  {
    name: "Vellore Institute of Technology",
    slug: "vit-vellore",
    city: "Vellore",
    state: "Tamil Nadu",
    fees: 430000,
    rating: 4.4,
    placement: 1100000,
    description:
      "A large private university offering engineering, technology and computer science programs with strong industry exposure.",
    website: "https://vit.ac.in/",
    courses: [
      { name: "B.Tech Computer Science", degree: "B.Tech", duration: "4 Years" },
      { name: "B.Tech Information Technology", degree: "B.Tech", duration: "4 Years" },
    ],
  },
  {
    name: "Manipal Institute of Technology",
    slug: "manipal-institute-of-technology",
    city: "Manipal",
    state: "Karnataka",
    fees: 480000,
    rating: 4.3,
    placement: 1000000,
    description:
      "A technology-focused institute known for engineering education, campus life and industry connections.",
    website: "https://manipal.edu/mit.html",
    courses: [
      { name: "B.Tech Computer Science", degree: "B.Tech", duration: "4 Years" },
      { name: "M.Tech Computer Science", degree: "M.Tech", duration: "2 Years" },
    ],
  },
  {
    name: "SRM Institute of Science and Technology",
    slug: "srm-institute",
    city: "Chennai",
    state: "Tamil Nadu",
    fees: 400000,
    rating: 4.2,
    placement: 900000,
    description:
      "A private university providing technology-focused programs with modern infrastructure and industry exposure.",
    website: "https://www.srmist.edu.in/",
    courses: [
      { name: "B.Tech Computer Science", degree: "B.Tech", duration: "4 Years" },
      { name: "B.Tech Artificial Intelligence", degree: "B.Tech", duration: "4 Years" },
    ],
  },
  {
    name: "Amity University Noida",
    slug: "amity-noida",
    city: "Noida",
    state: "Uttar Pradesh",
    fees: 360000,
    rating: 4.1,
    placement: 850000,
    description:
      "A private university in the NCR region offering engineering, technology and management programs.",
    website: "https://www.amity.edu/",
    courses: [
      { name: "B.Tech Computer Science", degree: "B.Tech", duration: "4 Years" },
      { name: "M.Tech Computer Science", degree: "M.Tech", duration: "2 Years" },
    ],
  },
  {
    name: "Sharda University",
    slug: "sharda-university",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    fees: 330000,
    rating: 4.0,
    placement: 750000,
    description:
      "A multidisciplinary university offering engineering and technology programs with a diverse student community.",
    website: "https://www.sharda.ac.in/",
    courses: [
      { name: "B.Tech Computer Science", degree: "B.Tech", duration: "4 Years" },
      { name: "B.Tech Artificial Intelligence", degree: "B.Tech", duration: "4 Years" },
    ],
  },
  {
    name: "Christ University",
    slug: "christ-university",
    city: "Bengaluru",
    state: "Karnataka",
    fees: 280000,
    rating: 4.2,
    placement: 850000,
    description:
      "A reputed university offering technology and computer applications programs with a strong academic environment.",
    website: "https://christuniversity.in/",
    courses: [
      { name: "BCA", degree: "BCA", duration: "3 Years" },
      { name: "MCA", degree: "MCA", duration: "2 Years" },
    ],
  },
];

async function main() {
  console.log("Seeding CampusLens database...");

  await prisma.savedCollege.deleteMany();
  await prisma.review.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  for (const college of colleges) {
    const createdCollege = await prisma.college.create({
      data: {
        name: college.name,
        slug: college.slug,
        city: college.city,
        state: college.state,
        fees: college.fees,
        rating: college.rating,
        placement: college.placement,
        description: college.description,
        website: college.website,

        courses: {
          create: college.courses,
        },

        reviews: {
          create: [
            {
              author: "Demo Student",
              rating: college.rating,
              comment:
                "Good academic environment with useful opportunities for students.",
            },
            {
              author: "CampusLens User",
              rating: Math.max(3.5, college.rating - 0.2),
              comment:
                "Overall experience is positive. Students should compare fees, placements and courses before deciding.",
            },
          ],
        },
      },
    });

    console.log(`Created: ${createdCollege.name}`);
  }

  await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@campuslens.local",
    },
  });

  console.log("CampusLens seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });