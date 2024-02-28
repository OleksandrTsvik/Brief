export default interface ConfigProps {
  port: number;
  globalApiPrefix: string;
  database: {
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
  };
  frontendUrl?: string;
  jwtAccess: {
    secret?: string;
    expiresIn?: string;
  };
}
