import Post from "../models/postModel";

interface ICreateAPost {
  title: string;
  description: string;
  userId: number;
}

interface IEditAPost extends ICreateAPost {
  postId: number;
}

const createAPost = async ({
  title,
  description,
  userId,
}: ICreateAPost): Promise<[boolean, any]> => {
  try {
    const newPost = await Post.create({
      title,
      description,
      userId,
    });

    return newPost ? [true, newPost] : [false, "Error creating Post"];
  } catch (error) {
    return [false, { error }];
  }
};

const findPostByID = async (id: number): Promise<[boolean, any]> => {
  try {
    const thePost = await Post.findByPk(id);

    return thePost ? [true, thePost] : [false, "No post found"];
  } catch (error) {
    return [false, { error }];
  }
};

const findAndEditPostDetails = async ({
  title,
  description,
  userId,
  postId,
}: IEditAPost): Promise<[boolean, any]> => {
  try {
    let editedUser = await Post.update(
      {
        title: title,
        description: description,
      },
      {
        where: {
          userId: userId,
          id: postId,
        },
      }
    );

    return editedUser[0] === 0
      ? [false, "No Post found"]
      : [true, "Post edited successfully"];
  } catch (error) {
    return [false, { error }];
  }
};

const findAndDeleteAPost = async (id: number): Promise<[boolean, any]> => {
  try {
    const deletedUser = await Post.destroy({
      where: {
        id: id,
      },
      force: true,
    });

    return deletedUser === 0
      ? [false, "No Post found"]
      : [true, "Post deleted successfully"];
  } catch (error) {
    return [false, error];
  }
};

const findAllPosts = async (userId: number): Promise<[boolean, any]> => {
  try {
    const allPosts = await Post.findAll({
      where: {
        userId: userId,
      },
    });

    return [true, allPosts];
  } catch (error) {
    return [false, error];
  }
};

const perPagePosts = async (
  page: number,
  limit: number
): Promise<[boolean, any]> => {
  try {
    const neededPosts = Post.findAll({
      limit: limit,
      offset: page,
    });
    return [true, neededPosts];
  } catch (error) {
    return [false, error];
  }
};

export {
  createAPost,
  findPostByID,
  findAndEditPostDetails,
  findAndDeleteAPost,
  findAllPosts,
  perPagePosts,
};
