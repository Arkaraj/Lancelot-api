declare namespace NodeJS {
  export interface ProcessEnv {
    SQL_Username: string;
    SQL_Password: string;
    SQL_Database: string;
    NODE_ENV: string;
  }
}
