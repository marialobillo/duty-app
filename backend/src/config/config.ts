import dotenv from 'dotenv';
import bunyan from 'bunyan';

dotenv.config();

class Config {
  public DATABASE_URL: string;
  public SERVER_PORT: string;
  public CLIENT_URL: string;
  public NODE_ENV: string;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || '';
    this.SERVER_PORT = process.env.SERVER_PORT || '4000';
    this.CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
    this.NODE_ENV = process.env.NODE_ENV || 'development';
    this.validateConfig();
  }

  private validateConfig(): void {
    const requiredVariables = ['DATABASE_URL', 'SERVER_PORT', 'CLIENT_URL', 'NODE_ENV'];
    for (const variable of requiredVariables) {
      if (!process.env[variable]) {
        throw new Error(`Missing environment variable: ${variable}`);
      }
    }
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }
}

export const config = new Config();