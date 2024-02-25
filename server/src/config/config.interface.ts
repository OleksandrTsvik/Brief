export default interface ConfigProps {
  port: number;
  globalApiPrefix: string;
  database: {
    sqlite?: string;
  };
  frontendUrl?: string;
  jwtAccess: {
    secret?: string;
    expiresIn?: string;
  };
}
