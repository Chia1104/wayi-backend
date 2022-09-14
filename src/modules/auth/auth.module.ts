import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from '@wanin/modules/auth/strategies/firebase';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'firebase-auth' })],
  providers: [FirebaseAuthStrategy],
})
export class AuthModule {}
