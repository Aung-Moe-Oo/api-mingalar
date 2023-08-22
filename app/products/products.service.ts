import { PrismaClient, Prisma } from "@prisma/client";
const { product } = new PrismaClient();

class Product {
  constructor() {}

  public get() {
    return product.findMany({
      include: {
        Image: true,
      },
      orderBy: {
        id: "desc",
      },
    });
  }

  public getById(id: string) {
    return product.findFirst({
      where: { id },
      orderBy: {
        id: "desc",
      },
    });
  }

  public create(props: Prisma.ProductCreateInput) {
    return product.create({ data: props });
  }

  public update(id: string, props: Prisma.ProductUpdateInput) {
    return product.update({
      where: {
        id,
      },
      data: props,
    });
  }

  public delete(id: string) {
    return product.delete({
      where: {
        id,
      },
    });
  }
}

export default Product;
