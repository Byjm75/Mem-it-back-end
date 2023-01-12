import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

//création de la méthode Getuser
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Utilisateur => {
    const req = ctx.switchToHttp().getRequest();
    const user: Utilisateur = {
      ...req.user,
    };
    delete user.categories;
    delete user.taches;
    delete user.tags;

    return user;
  },
);
