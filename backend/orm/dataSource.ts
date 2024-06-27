import "reflect-metadata"
import { DataSource } from "typeorm"
import * as path from "path";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "toptal",
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, './entity/**/*.ts')],
    migrations: [],
    subscribers: [],
})
