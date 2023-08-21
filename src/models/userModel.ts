import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript";
import Post from "./postModel";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - email
 *        - password
 *      properties:
 *        firstName:
 *          type: string
 *          default: Jane
 *        lastName:
 *          type: string
 *          default: Doe
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        password:
 *          type: string
 *          default: stringPassword123
 *    CreateUserResponse:
 *        type: object
 *        properties:
 *          success:
 *            type: boolean
 *            description: Signifies if the operation was a success
 *          message:
 *            type: string
 *            description: Operation message
 *          data:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *            description: returned data after the operation
 *        example:
 *           success: true
 *           message: User registered successfully
 *           data: {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkxNTExMzMxLCJleHAiOjE2OTQxMDMzMzF9.-EdckHhu75pa-5ZMZZto8OuVUM4lHf34fphE4nKUbkI"}
 */

@Table({
  timestamps: true,
  tableName: "User",
  freezeTableName: true,
  modelName: "User",
})
class User extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @HasMany(() => Post)
  posts!: Post[];
}

export default User;
