import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ControllerModule } from './controller/controller.module';
import typeorm from './config/typeorm';
import { DomainModule } from './domain/domain.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [typeorm],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>
                configService.get('typeorm'),
        }),
        ControllerModule,
        DomainModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
