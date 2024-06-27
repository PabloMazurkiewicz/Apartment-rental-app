import { AppDataSource } from "./dataSource"

AppDataSource.initialize().then(async () => {

}).catch(error => console.log(error))
