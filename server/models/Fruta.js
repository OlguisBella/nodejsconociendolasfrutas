module.exports = (sequelize, DataTypes) => {
  const Fruta = sequelize.define('Fruta', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoriaid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    preguntaid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    freezeTableName: true
  });

  Fruta.associate = (models) => {
    Fruta.belongsTo(models.Categoria, {
      foreignKey: 'categoriaid',  
      onDelete: 'CASCADE',   
    });

    Fruta.hasOne(models.Puntaje, {
      foreignKey: 'idFruta',
      as:'puntajes',
      onDelete: 'CASCADE',
    });
  };
  Fruta.associate = (models) => {
    Fruta.belongsTo(models.Pregunta, {
      foreignKey: 'preguntaid',    
      onDelete: 'CASCADE', 
    });
  };
  return Fruta;
};