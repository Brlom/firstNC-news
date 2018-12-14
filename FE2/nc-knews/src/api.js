import axios from "axios";

const base = "https://my-nc-knews.herokuapp.com/api";

export const getTopics = async () => {
    const {
        data: { topics }
    } = await axios.get(`${base}/topics`);
    return topics;
};

export const getArticlesByTopic = async (topic, query) => {
    const {
        data: articles
    } = await axios.get(`${base}/topics/${topic}/articles${query}`);
    return articles;
}

export const getArticles = async (query) => {
    const {
        data: { articles }
    } = await axios.get(`${base}/articles${query}`);
    return articles;
}

export const getArticleById = async (article_id) => {
    const { data } = await axios.get(`${base}/articles/${article_id}`);
    return data;
};

export const getCommentsByArticleId = async (article_id) => {
    const {
        data: { comments }
    } = await axios.get(`${base}/articles/${article_id}/comments`);
    return comments;
}

export const submitCommentByArticleId = async (commentBody, article_id, user_id) => {
    const { data } = await axios.post(`${base}/articles/${article_id}/comments`, { body: commentBody, user_id: user_id });
    return data;
}

// export const voteComment = async (amount, article_id) => {
//     const changeVotes = { inc_votes: amount };
//     const { data } = await axios.patch(`${base}/articles/${article_id}/comments`, changeVotes);
//     return data;
// }

export const deleteComment = async (comment_id, article_id) => {
    await axios.delete(`${base}/articles/${article_id}/comments/${comment_id}`)
}

export const voteArticle = async (article_id, amount) => {
    const changeVotes = { inc_votes: amount };
    const { data } = await axios.patch(`${base}/articles/${article_id}`, changeVotes);
    return data;
}

export const submitArticle = async (topicValue, articleBody, titleValue, user_id) => {
    const { data: { article } } = await axios.post(`${base}/topics/${topicValue}/articles`, { topic: topicValue, body: articleBody, title: titleValue, user_id: user_id });
    return article;
}

export const deleteArticle = async (article_id) => {
    await axios.delete(`${base}/articles/${article_id}`);
}

export const getUsers = async () => {
    const {
        data: { users }
    } = await axios.get(`${base}/users`);
    return users;
}

export const getUserByUsername = async (username) => {
    const {
        data
    } = await axios.get(`${base}/users/${username}`)
    return data;
}
