const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize) => {
  
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        token: {
            type: DataTypes.STRING,
        },
        confirm: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, { timestamps: false });

    User.beforeCreate(async (user) => {
        const saltRounds = 10; // Número de rounds de hashing (mayor es más seguro pero más lento)
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
      });
    
      User.beforeUpdate(async (user) => {
        if (user.changed('password')) {
          const saltRounds = 10;
          const hashedPassword = await bcrypt.hash(user.password, saltRounds);
          user.password = hashedPassword;
        }
      });

      return User;
    };

