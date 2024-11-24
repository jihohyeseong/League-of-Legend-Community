import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IComment, IContent } from "../../api";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
`;

const MainContainer = styled.div`
  flex: 0 0 auto;
  display: grid;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  justify-items: center;
  min-height: 0;
  padding-top: 80px;
  width: 100%;
`;

const Title = styled.span`
  font-size: 25px;
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 20px;
`;

function Community() {
  const { communityid } = useParams();
  const [content, setContent] = useState<IContent>();
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [comment, setComment] = useState("");
  const [editCommentId, setEditCommentId] = useState<number | null>(null); // 수정할 댓글 ID
  const [editCommentContent, setEditCommentContent] = useState(""); // 수정할 댓글 내용
  console.log(communityid);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:8080/community/${communityid}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json = await response.json();
      setContent(json);
    })();

    (async () => {
      const response2 = await fetch(
        `http://localhost:8080/${communityid}/comment`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const json2 = await response2.json();
      setCommentList(json2);
    })();
  }, []);

  const deleteCommunity = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:8080/community/${communityid}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (response.status === 200) {
      alert("게시글 삭제가 완료되었습니다.");
      navigate("/community");
    } else {
      alert("게시글 삭제가 불가합니다. 다시 이용해 주세요!");
      window.location.reload();
    }
  };

  const onChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const {
      currentTarget: { value },
    } = e;
    setComment(value);
  };

  const postComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = comment;
    await fetch(`http://localhost:8080/${communityid}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
      credentials: "include",
    });
    window.location.reload();
  };

  const deleteComment = async (
    e: React.FormEvent<HTMLButtonElement>,
    commentid: number
  ) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/${commentid}/comment`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      alert("댓글이 삭제되었습니다.");
      window.location.reload();
    } else if (!response.ok) {
      alert("댓글 삭제에 실패하였습니다.");
      window.location.reload();
    }
  };

  const editCommentToggle = (comment: IComment) => {
    setEditCommentId(comment.id);
    setEditCommentContent(comment.content);
  };

  const updateComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8080/${editCommentId}/comment`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editCommentContent }),
        credentials: "include",
      }
    );
    setEditCommentId(null);
    setEditCommentContent("");

    if (response.ok) {
      alert("댓글이 수정되었습니다.");
      window.location.reload();
    } else if (!response.ok) {
      alert("댓글 수정에 실패하였습니다.");
    }
  };

  const onClickLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/community/${communityid}/like`, {
      method: "POST",
      credentials: "include",
    });
    const result = await response.text();
    alert(result);
  };

  return (
    <Wrapper>
      <MainContainer>
        {content && (
          <div key={content.id}>
            <Title>{content.title}</Title>
            <div>{content.nickname}</div>
            <div>
              {content.createdAt} | 조회수:{content.viewsCount} |{" "}
              <button onClick={onClickLike}>좋아요</button>
            </div>
            <div dangerouslySetInnerHTML={{ __html: content.content }} />
            <Title>댓글</Title>
            {commentList.map((comment) => (
              <div key={comment.id}>
                <ul>
                  <li>
                    {comment.nickname} :{" "}
                    {editCommentId === comment.id ? (
                      <form onSubmit={updateComment}>
                        <input
                          value={editCommentContent}
                          onChange={(e) =>
                            setEditCommentContent(e.target.value)
                          }
                        />
                        <button type="submit">수정 완료</button>
                      </form>
                    ) : (
                      <>
                        {comment.content}
                        <button onClick={() => editCommentToggle(comment)}>
                          수정
                        </button>
                        <button onClick={(e) => deleteComment(e, comment.id)}>
                          삭제
                        </button>
                      </>
                    )}
                  </li>
                </ul>
              </div>
            ))}

            <form onSubmit={postComment}>
              <div>
                <input
                  placeholder="댓글을 입력하세요"
                  onChange={onChangeInput}
                />
                <button>입력</button>
              </div>
            </form>

            <Link to="edit">
              <button>Edit</button>
            </Link>

            <button onClick={deleteCommunity}>Delete</button>
          </div>
        )}
      </MainContainer>
    </Wrapper>
  );
}

export default Community;
