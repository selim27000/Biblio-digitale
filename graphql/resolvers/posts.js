const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../utilities/check-auth');

module.exports = {
    Query : {
        async getPosts(){
            try{
    const posts = await Post.find();
    return posts;
            }catch (err){
                throw new Error(err);
            }
        },
        async getPost(_, { postId }) {
            try {
              const post = await Post.findById(postId);
              if (post) {
                return post;
              } else {
                throw new Error('Post not found');
              }
            } catch (err) {
              throw new Error(err);
            }
          }
        },
        Mutation: {
          async createPost(_, { body }, context) {
            const user = checkAuth(context)
            const newPost = new Post({
    body,
    username: user.username,
    createdAt: new Date().toISOString(),
    user: user.id
});
const post = await newPost.save();

return post;
            }
        }
};
