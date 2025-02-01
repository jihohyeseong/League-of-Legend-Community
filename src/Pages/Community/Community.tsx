import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IComment, IContent } from "../../api";

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
    margin-top: 5rem;
`;

const Header = styled.div`
    display: flex;
    gap: 1rem;
    padding: 2rem;
`;

const EditBtn = styled.button`
    font-size: 1.5rem;
    border: 1px solid green;
    color: ${(props) => props.theme.textColor};
    border-radius: 3rem;
    padding: 1.3rem;
    background-color: green;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
        background-color: ${(props) => props.theme.bgColor};
        border: 1px solid ${(props) => props.theme.bgColor};
    }
`;

const DeleteBtn = styled.button`
    font-size: 1.5rem;
    border: 1px solid crimson;
    color: ${(props) => props.theme.textColor};
    border-radius: 3rem;
    padding: 1.3rem;
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
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 3rem;
    padding: 1.3rem;
`;

const Date = styled.span`
    font-size: 1.5rem;
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 3rem;
    padding: 1.3rem;
`;

const Dynamiccontent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 3rem;
    padding: 2.5rem;
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
    padding: 3rem;
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

const CommentItems = styled.ul``;

const CommentItem = styled.li`
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 3rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 2rem;
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
`

function Community() {
    const { communityid } = useParams();
    const [content, setContent] = useState<IContent>();
    const [commentList, setCommentList] = useState<IComment[]>([]);
    const [comment, setComment] = useState("");
    const [editCommentId, setEditCommentId] = useState<number | null>(null); // 수정할 댓글 ID
    const [editCommentContent, setEditCommentContent] = useState(""); // 수정할 댓글 내용
    const [date, setDate] = useState<string>("");

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

    const cancelComment = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.location.reload();
    }

    return (
        <Wrapper>
            {content && (
                <MainContainer key={content.id}>
                    <Title>{content.title}</Title>
                    <Header>
                        <NickName>{content.nickname}</NickName>
                        <Date>{date}</Date>
                        <Link to="edit">
                            <EditBtn>Edit</EditBtn>
                        </Link>

                        <DeleteBtn onClick={deleteCommunity}>Delete</DeleteBtn>
                    </Header>
                    <Dynamiccontent
                        dangerouslySetInnerHTML={{
                            __html: content.content,
                        }}
                    />
                    <CommentBox>
                        {commentList.map((comment) => (
                            <div key={comment.id}>
                                <CommentItems>
                                    <CommentItem>
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
                                        )}
                                    </CommentItem>
                                </CommentItems>
                            </div>
                        ))}

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
