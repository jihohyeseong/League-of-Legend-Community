import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IContent } from "../Types/api";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  color: black;
`;

const Title = styled.span`
  font-size: 25px;
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 20px;
  color: ${(props) => props.theme.textColor};
`;

function CommunityEdit() {
  const { communityid } = useParams();
  const [community, setCommunity] = useState<IContent>();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const editCommunity = async (
    event: React.FormEvent<HTMLButtonElement>,
    title: string,
    content: string
  ) => {
    event.preventDefault();
    await fetch(`http://localhost:8080/community/${communityid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
      credentials: "include",
    });
    navigate(`/community/${communityid}`);
  };

  const customUploadAdapter = (loader: any) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then((file: File) => {
            formData.append("upload", file);
            fetch(`http://localhost:8080/image/upload`, {
              method: "POST",
              body: formData,
              credentials: "include",
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.uploaded) {
                  resolve({ default: data.url });
                  console.log(resolve({ default: data.url }));
                } else {
                  reject("Image upload failed.");
                }
              })
              .catch((error) => {
                console.error("Fetch error:", error);
                reject(error);
              });
          });
        });
      },
    };
  };

  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return customUploadAdapter(loader);
    };
  }

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
      // console.log(json);
      setCommunity(json);
      setTitle(json.title); // 초기 title 설정
      setContent(json.content); // 초기 content 설정
    })();
  }, []);

  const onChange = () => {
    setTitle(title);
  };

  return (
    <Wrapper>
      <MainContainer>
        <Title>글 수정</Title>
        {community && (
          <form>
            <input
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
            <CKEditor
              editor={ClassicEditor}
              config={{
                extraPlugins: [uploadPlugin],
              }}
              data={content}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data); // content 업데이트
              }}
            />
            <button onClick={(event) => editCommunity(event, title, content)}>
              Save
            </button>
          </form>
        )}
      </MainContainer>
    </Wrapper>
  );
}

export default CommunityEdit;
