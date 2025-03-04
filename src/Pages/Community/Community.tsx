import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IComment, IContent, UserInfo } from "../../api";

const Wrapper = styled.div``;

const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Title = styled.h2`
    font-size: 3rem;
    text-align: center;
`;


const EditBtn = styled.button`
    font-size: 1.3rem;
    margin-right: 1rem;
    border: 1px solid green;
    color: ${(props) => props.theme.textColor};
    border-radius: 5rem;
    padding: 0.5rem;
    background-color: green;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background-color: ${(props) => props.theme.bgColor};
        border: 1px solid ${(props) => props.theme.bgColor};
    }
`;

const DeleteBtn = styled.button`
    font-size: 1.3rem;
    border: 1px solid crimson;
    color: ${(props) => props.theme.textColor};
    border-radius: 5rem;
    padding: 0.5rem;
    background-color: crimson;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background-color: ${(props) => props.theme.bgColor};
        border: 1px solid ${(props) => props.theme.bgColor};
    }
`;

const NickName = styled.span`
    font-size: 1.5rem;
    border-radius: 3rem;
    padding: 1.3rem;
`;

const Date = styled.span`
    font-size: 1.5rem;
    border-radius: 3rem;
    padding: 1.3rem;
`;

const Dynamiccontent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top: 1px solid ${(props) => props.theme.textColor};
    padding: 2.5rem;
    margin-top: 1rem;
    gap: 1rem;
    img {
        width: 30rem;
        height: 30rem;
    }
    p {
        font-size: 1.7rem;
    }
`;

const CommentBox = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 1.3rem;
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
`;

const CommentItems = styled.ul`
    display: flex;
    flex-direction: column;
`;

const CommentItem = styled.li`
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.2rem;
`;

const InputBox = styled.input`
    padding: 1rem;
    border-radius: 3rem;
    border: 1px solid ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
`;

const InputContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

const InputBtn = styled.button`
    border: 1px solid ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    display: inline-block;
    border-radius: 3rem;
    padding: 1rem;
`;

const BtnBox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const EditBtn2 = styled.button`
    border: 1px solid green;
    color: ${(props) => props.theme.textColor};
    border-radius: 3rem;
    padding: 0.5rem;
    background-color: green;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background-color: ${(props) => props.theme.bgColor};
        border: 1px solid ${(props) => props.theme.bgColor};
    }
`;

const DeleteBtn2 = styled.button`
    border: 1px solid crimson;
    color: ${(props) => props.theme.textColor};
    border-radius: 3rem;
    padding: 0.5rem;
    background-color: crimson;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background-color: ${(props) => props.theme.bgColor};
        border: 1px solid ${(props) => props.theme.bgColor};
    }
`;

const CancelBtn = styled.button`
    border: 1px solid crimson;
    color: ${(props) => props.theme.textColor};
    border-radius: 3rem;
    padding: 0.5rem;
    background-color: crimson;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background-color: ${(props) => props.theme.bgColor};
        border: 1px solid ${(props) => props.theme.bgColor};
    }
`;

const PreviousBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #10a37f;
  color: #fff;
  border-radius: 0.7rem;
  font-size: 1.2rem;
  border: 1px solid #10a37f;
  cursor: pointer;
  &:hover {
    color: #333;
  }
`;

const TitleBox = styled.div`
  margin-top: 5rem;
  margin-bottom: 2rem;
  display  : flex;
  flex-direction: row-reverse;
  gap: 2rem;
`;


const ContentBox = styled.div`
text-align: center;
`

function Community() {
    const { communityid } = useParams();
    const [content, setContent] = useState<IContent>();
    const [commentList, setCommentList] = useState<IComment[]>([]);
    const [comment, setComment] = useState("");
    const [editCommentId, setEditCommentId] = useState<number | null>(null); // 수정할 댓글 ID
    const [editCommentContent, setEditCommentContent] = useState(""); // 수정할 댓글 내용
    const [date, setDate] = useState<string>("");
    const [userInfo, setUserInfo] = useState<UserInfo>();

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
            console.log(json);
            let result = "";
            const dateString = json.createdAt;
            const [date, timeWithMs] = dateString.split("T");
            const time = timeWithMs.split(".")[0];
            result = `${date} ${time}`;
            setDate(result);
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
            console.log(json2)
        })();

        (async () => {
            const response = await fetch(`http://localhost:8080/info`, { credentials: "include" });
            const data = await response.json();
            setUserInfo(data);
        })();

    }, [communityid]);

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
        await fetch(`http://localhost:8080/${commentid}/comment`, {
            method: "DELETE",
            credentials: "include",
        });
        window.location.reload();
    };

    const editCommentToggle = (comment: IComment) => {
        setEditCommentId(comment.id);
        setEditCommentContent(comment.content);
    };

    const updateComment = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await fetch(`http://localhost:8080/${editCommentId}/comment`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ content: editCommentContent }),
            credentials: "include",
        });
        setEditCommentId(null);
        setEditCommentContent("");
        window.location.reload();
    };

    const cancelComment = () => {
        window.location.reload();
    };

    return (
        <Wrapper>
            {content && (
                <MainContainer key={content.id}>
                    <TitleBox>
                        <Title>{content.title}</Title>
                        <PreviousBtn onClick={() => navigate('/community')}>←</PreviousBtn>
                    </TitleBox>
                    <ContentBox>
                        <NickName>{content.nickname}</NickName>
                        <Date>{date}</Date>
                        {content.nickname === userInfo?.nickname &&
                            <>
                                <Link to="edit">
                                    <EditBtn>Edit</EditBtn>
                                </Link>

                                <DeleteBtn onClick={deleteCommunity}>Delete</DeleteBtn>
                            </>
                        }

                        <Dynamiccontent
                            dangerouslySetInnerHTML={{
                                __html: content.content,
                            }}
                        />
                    </ContentBox>

                    <CommentBox><CommentItems>
                        {commentList.map((comment) => (
                            <CommentItem key={comment.id}>
                                {comment.nickname} :
                                {editCommentId === comment.id ? (
                                    <BtnBox>
                                        <InputBox
                                            value={editCommentContent}
                                            onChange={(e) =>
                                                setEditCommentContent(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <EditBtn2 onClick={updateComment}>
                                            수정 완료
                                        </EditBtn2>
                                        <CancelBtn onClick={cancelComment}>
                                            취소
                                        </CancelBtn>
                                    </BtnBox>
                                ) : (
                                    <>
                                        {comment.content}
                                        {comment.nickname === userInfo?.nickname &&
                                            <>
                                                <BtnBox>
                                                    <EditBtn2
                                                        onClick={() =>
                                                            editCommentToggle(
                                                                comment
                                                            )
                                                        }
                                                    >
                                                        수정
                                                    </EditBtn2>
                                                    <DeleteBtn2
                                                        onClick={(e) =>
                                                            deleteComment(
                                                                e,
                                                                comment.id
                                                            )
                                                        }
                                                    >
                                                        삭제
                                                    </DeleteBtn2>
                                                </BtnBox>
                                            </>
                                        }
                                    </>
                                )}
                            </CommentItem>
                        ))}
                    </CommentItems>
                        <form onSubmit={postComment}>
                            <InputContainer>
                                <InputBox
                                    placeholder="댓글을 입력하세요"
                                    onChange={onChangeInput}
                                />
                                <InputBtn>입력</InputBtn>
                            </InputContainer>
                        </form>
                    </CommentBox>
                </MainContainer>
            )}
        </Wrapper>
    );
}

export default Community;
