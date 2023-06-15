import React from 'react'

export const TweetCard = ({post}) => {
    const {
    content,
    createdAt,
    likes,
    username
    }=post;
  return (
    <div style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
        <h4>{username}</h4>
        <p style={{overflow:"hidden",textOverflow: "ellipsis", whiteSpace: "nowrap", width: "200px"}}>
  {content}
</p>
    </div>
  )
}
