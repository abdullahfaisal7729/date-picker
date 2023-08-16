import React from "react";
import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import Card from "./Card";

const Posts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .all([
        axios.get("https://dummyjson.com/posts", { params: { limit: 0 } }),
        axios.get("https://dummyjson.com/comments", { params: { limit: 0 } }),
        axios.get("https://dummyjson.com/users", { params: { limit: 0 } }),
      ])
      .then(
        axios.spread((postsData, commentsData, usersData) => {
          const postIdsComments = _.groupBy(
            commentsData.data.comments,
            "postId"
          );
          const currentUsers = usersData.data.users.reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
          }, {});

          const finalData = postsData.data.posts.reduce((acc, post) => {
            const currentUser = currentUsers[post.userId];
            console.log("user final :", currentUser);
            acc.push({
              id: post.id,
              title: post.title,
              body: post.body,
              reactions: post.reactions,
              comments: postIdsComments[post.id]?.length || 0,
              email: currentUser.email,
              alias:
                currentUser.firstName[0].toUpperCase() +
                currentUser.lastName[0].toUpperCase(),
              name: currentUser.firstName + " " + currentUser?.lastName,
            });
            return acc;
          }, []);
          console.log(finalData);
          setData(finalData);
        })
      )
      .catch((err) => console.log(err));
  }, []);

  return <>{data && data.map((post) => <Card key={post.id} {...post} />)}</>;
};

export default Posts;
