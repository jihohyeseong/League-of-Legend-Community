import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IComment, IContent, UserInfo } from "../Types/api";
import SideMenu from "../Components/SideMenu";
import Chat from "../Components/Chat";
import { CustomButton } from "../Components/Button";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 3rem;
`;

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 50rem;
    height: 50rem;
    border: 1px solid ${(props) => props.theme.textColor};
    padding: 1rem 2rem;
    border-radius: 1rem;
    overflow-y: scroll;
`;

const Title = styled.h2`
    font-size: 2rem;
    text-align: left;
`;

const NickName = styled.span`
    font-size: 1.2rem;
    border-radius: 3rem;
`;

const Date = styled.span`
    font-size: 1.2rem;
    border-radius: 3rem;
`;

const Dynamiccontent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.textColor};
    padding: 2rem;
    margin-top: 1rem;
    gap: 1rem;
    img {
        width: 20rem;
        height: 20rem;
    }
    p {
        font-size: 1rem;
    }
`;

const CommentBox = styled.div`
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.textColor};
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
`;

const CommentItems = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CommentItem = styled.li`
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1rem;
`;

const InputBox = styled.input`
    border:transparent;
    background-color: transparent;
    color: ${(props) => props.theme.textColor};

    &:focus {
        outline: transparent;
    }
`;

const BtnBox = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const CommentForm = styled.form`
    display: flex;
    border: 1px solid ${props => props.theme.textColor};
    border-radius: 1rem;
    padding: 0.3rem;
`;

const ContentHeader = styled.div`
    display: flex;
    margin-top: 1rem;
    align-items: center;
    gap: 1rem;
`;

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

    const deleteCommunity = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const response = await fetch(
            `http://localhost:8080/community/${communityid}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );
        if (response.status === 200) {
            alert("게시글 삭제가 완료되었습니다.");
            navigate("/");
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

    const gotoEdit = () => {
        navigate(`/community/${communityid}/edit`);
    };

    return (
        <>
            <Wrapper>
                <SideMenu />
                {content && (
                    <MainContainer key={content.id}>
                        <Title>{content.title}</Title>
                        <ContentHeader>
                            <NickName>{content.nickname}</NickName>
                            <Date>{date}</Date>
                            {content.nickname === userInfo?.nickname &&
                                <BtnBox>
                                    <CustomButton variant="edit" onClick={gotoEdit}>수정</CustomButton>
                                    <CustomButton variant="delete" onClick={deleteCommunity}>삭제</CustomButton>
                                </BtnBox>
                            }
                        </ContentHeader>


                        <Dynamiccontent
                            dangerouslySetInnerHTML={{
                                __html: content.content,
                            }}
                        />

                        <CommentBox>
                            <CommentItems>
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
                                                <CustomButton variant="edit" onClick={updateComment}>수정완료</CustomButton>
                                                <CustomButton variant="cancel" onClick={cancelComment}>취소</CustomButton>
                                            </BtnBox>
                                        ) : (
                                            <>
                                                {comment.content}
                                                {comment.nickname === userInfo?.nickname &&
                                                    <>
                                                        <BtnBox>
                                                            <CustomButton variant="edit" onClick={() => editCommentToggle(comment)}>수정</CustomButton>
                                                            <CustomButton variant="delete" onClick={(e) => deleteComment(e, comment.id)}>삭제</CustomButton>
                                                        </BtnBox>
                                                    </>
                                                }
                                            </>
                                        )}
                                    </CommentItem>
                                ))}
                            </CommentItems>
                        </CommentBox>
                        <CommentForm onSubmit={postComment}>
                            <InputBox
                                placeholder="댓글을 입력하세요"
                                onChange={onChangeInput}
                            />
                            <CustomButton variant="input" type="submit">입력</CustomButton>
                        </CommentForm>
                    </MainContainer>
                )}
                <Chat />
            </Wrapper>
        </>

    );
}

export default Community;
