import { PrismaClient, Prisma } from "@prisma/client";
const { user } = new PrismaClient();

class User {
  constructor() {}

  public createNewUser(props: Prisma.UserCreateInput) {
    return user.create({ data: props });
  }

  public updateNewUser(id: string, props: Prisma.UserCreateInput) {
    return user.update({ where: { id }, data: props });
  }

  public login(props: Prisma.UserCreateInput) {
    return user.create({ data: props });
  }
}

export default User;
