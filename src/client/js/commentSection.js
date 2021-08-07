const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addFakeComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/video/${videoId}/comment`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }), // 전송할 시 텍스트 형태로 보낸다
  });

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json(); // videoController부터 id 받아오기
    addFakeComment(text, newCommentId); // 새로고침 이전에 미리 가짜 댓글 달기
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
// 댓글 삭제해보기 ,주인만 삭제 .fetch method="delete"이용
