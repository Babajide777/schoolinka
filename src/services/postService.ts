import Post from "../models/postModel";

interface ICreateAPost {
  title: string;
  description: string;
  userId: number;
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

export { createAPost };
