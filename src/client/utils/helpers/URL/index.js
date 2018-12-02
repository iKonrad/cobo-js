
const post = (communityId, postId) => {
  return `/c/${communityId}/posts/${postId}`;
}

export default {
  post,
}
