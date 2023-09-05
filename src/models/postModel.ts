import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./userModel";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreatePostInput:
 *      type: object
 *      required:
 *        - title
 *        - description
 *      properties:
 *        title:
 *          type: string
 *          default: Jane
 *        description:
 *          type: string
 *          default: Doe
 *    CreatePostResponse:
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
 *              title:
 *                type: string
 *              description:
 *                type: string
 *              userId:
 *                type: string
 *              createdAt:
 *                type: string
 *              updatedAt:
 *                type: string
 *            description: returned data after the operation
 *        example:
 *           success: true
 *           message: User registered successfully
 *           data: {title: "", description: "", userId: "", updatedAt: "", createdAt: ""}
 *    DeletePostResponse:
 *        type: object
 *        properties:
 *          success:
 *            type: boolean
 *            description: Signifies if the operation was a success
 *          message:
 *            type: string
 *            description: Operation message
 *          data:
 *            type: string
 *            description: returned data after the operation
 *        example:
 *           success: true
 *           message: Post deleted successfully
 *           data: "Post deleted successfully"
 *    AllPostsDetailResponse:
 *        type: object
 *        properties:
 *          success:
 *            type: boolean
 *            description: Signifies if the operation was a success
 *          message:
 *            type: string
 *            description: Operation message
 *          data:
 *            type: array
 *            description: returned data after the operation
 *        example:
 *           success: true
 *           message: All Posts retrieved successfully
 *           data: [//]
 */

@Table({
  timestamps: true,
  tableName: "Post",
  freezeTableName: true,
  modelName: "Post",
})
class Post extends Model {
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
  title!: string;

  @Column({
    type: DataType.TEXT("long"),
    allowNull: false,
  })
  description!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}

export default Post;
