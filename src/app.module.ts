import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './common/config/env.config';
import { SchemaValidation } from './common/config/schema-validation.joi';

@Module({
  imports: [ ConfigModule.forRoot({
    load:[EnvConfig]//load the env file
    ,validationSchema:SchemaValidation
  }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB, {
      dbName: 'pokemonsdb',

    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    CommonModule,
    SeedModule,
    PokemonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
