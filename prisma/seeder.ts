import { Prisma, PrismaClient } from "@prisma/client";
import path from "path";
// import c1 from "../public/img/c1.png";
// import c2 from "../public/img/c2.png";
// import c3 from "../public/img/c3.png";
// import c4 from "../public/img/c4.png";
// import c6 from "../public/img/c6.png";
// import c7 from "../public/img/c7.png";
// import cu1 from "../public/img/cu1.png";
// import cu2 from "../public/img/cu2.png";
// import cu3 from "../public/img/cu3.png";
// import cu4 from "../public/img/cu4.png";
// import cu5 from "../public/img/cu5.png";
// import cu6 from "../public/img/cu6.png";
// import d1 from "../public/img/d1.png";
// import d2 from "../public/img/d2.png";
// import d3 from "../public/img/d3.png";
// import d4 from "../public/img/d4.png";
// import d5 from "../public/img/d5.png";
// import d6 from "../public/img/d6.png";
// import d7 from "../public/img/d8.png";
// import i1 from "../public/img/i1.png";
// import i2 from "../public/img/i2.png";
// import i3 from "../public/img/i3.png";
// import i4 from "../public/img/i4.png";
// import i5 from "../public/img/i5.png";
// import i6 from "../public/img/i6.png";
// import i7 from "../public/img/i7.png";
// import r1 from "../public/img/r1.png";
// import r2 from "../public/img/r2.png";
// import r3 from "../public/img/r3.png";
// import r4 from "../public/img/r4.png";
// import r5 from "../public/img/r5.png";

const i2 = path.resolve(__dirname, "../public/img/i2.png");

const prisma = new PrismaClient();

const products: Prisma.ProductCreateInput[] = [
  {
    name: "ICECREAM2",
    detail: "Delicious Icecream",
    price: 500,
    type: "icecream",
    Image: {
      create: {
        name: "ICECREAM",
        path: i2,
      },
    },
  },
];

async function main() {
  console.log(`Start seeding ... 🌱`);
  for (const product of products) {
    const productSeededData = await prisma.product.create({
      data: product,
    });
    console.log(
      `Created product with id: ${productSeededData.id} name: ${productSeededData.name}`
    );
  }

  console.log(`Seeding finished ... 🌲`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
