import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { CommonModule } from './common/common.module';
import { OrianaAtencionModule } from './oriana-atencion/oriana-atencion.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PokemonModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    CommonModule,
    OrianaAtencionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
