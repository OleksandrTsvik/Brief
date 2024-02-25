import { AuthGuard } from '@nestjs/passport';

export class AtGuard extends AuthGuard('access-token') {}
