import { Sequelize } from 'sequelize';

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || 'db_name',
    process.env.DB_USER || 'db_user',
    process.env.DB_PW || 'db_pw',
    {
      host: 'localhost',
      dialect: 'postgres',
    },
  );
}

export { sequelize };
