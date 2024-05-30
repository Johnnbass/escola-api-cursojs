"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Aluno extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "O campo [Nome] deve ter entre 3 e 255 caracteres.",
            },
          },
        },
        sobrenome: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "O campo [Sobrenome] deve ter entre 3 e 255 caracteres.",
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            isEmail: {
              msg: "O campo [E-mail] deve ser um e-mail válido.",
            },
          },
        },
        idade: {
          type: _sequelize2.default.INTEGER,
          defaultValue: "",
          validate: {
            isInt: {
              msg: "O campo [Idade] deve ser um número inteiro.",
            },
          },
        },
        peso: {
          type: _sequelize2.default.FLOAT,
          defaultValue: "",
          validate: {
            isFloat: {
              msg: "O campo [Peso] deve ser um número inteiro ou decimal.",
            },
          },
        },
        altura: {
          type: _sequelize2.default.FLOAT,
          defaultValue: "",
          validate: {
            isFloat: {
              msg: "O campo [Altura] deve ser um número inteiro ou decimal.",
            },
          },
        },
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Upload, { foreignKey: "aluno_id" });
  }
} exports.default = Aluno;
