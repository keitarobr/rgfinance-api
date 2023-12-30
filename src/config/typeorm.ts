import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
    type: 'postgres',
    host: 'localhost',
    port: '5432',
    username: 'rgfinance',
    password: 'rgfinance',
    database: 'rgfinance',
    entities: ['dist/model/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
