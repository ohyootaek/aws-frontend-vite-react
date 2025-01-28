import React, { useState, useEffect } from 'react';

const Chatting = () => {
  const [messages, setMessages] = useState<string[]>([]); // 메시지 목록
  const [input, setInput] = useState<string>(""); // 입력 메시지
  const [nickname, setNickname] = useState<string>(""); // 닉네임
  const [socket, setSocket] = useState<WebSocket | null>(null); // WebSocket 인스턴스
  const [isNicknameSet, setIsNicknameSet] = useState<boolean>(false); // 닉네임 설정 여부

  useEffect(() => {
    if (isNicknameSet) {
      const socket = new WebSocket("ws://localhost:8080/ws/chat");
      console.log(socket);
      socket.onopen = () => {
        console.log("WebSocket 연결이 열렸습니다.");
        // 닉네임을 세션에 저장 (백엔드에서 사용)
        socket.send(JSON.stringify({ nickname }));
      };

      socket.onmessage = (event) => {
        console.log("메시지 수신: ", event.data);
        setMessages((prevMessages) => [...prevMessages, event.data]); // 수신된 메시지를 상태에 추가
      };

      socket.onerror = (error) => {
        console.log("WebSocket 에러: ", error);
      };

      socket.onclose = () => {
        console.log("WebSocket 연결이 종료되었습니다.");
      };

      setSocket(socket);

      // 컴포넌트 언마운트 시 WebSocket 종료
      return () => {
        socket.close();
      };
    }
  }, [isNicknameSet]);

  // 닉네임 설정
  const setNicknameHandler = () => {
    if (nickname.trim()) {
      setIsNicknameSet(true); // 닉네임 설정 완료
      setMessages(["환영합니다, " + nickname + "!"]);
    } else {
      alert("닉네임을 입력하세요.");
    }
  };

  // 메시지 전송
  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(input); // 메시지 전송
      setInput(""); // 입력 필드 초기화
    } else {
      console.error("WebSocket 연결이 열려있지 않습니다.");
    }
  };

  return (
      <div style={{ padding: "20px" }}>
        {!isNicknameSet ? (
            <div>
              <h1>닉네임을 설정하세요</h1>
              <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="닉네임을 입력하세요"
                  style={{ padding: "5px", marginRight: "10px" }}
              />
              <button onClick={setNicknameHandler} style={{ padding: "5px 10px" }}>
                닉네임 설정
              </button>
            </div>
        ) : (
            <div>
              <h3>Redis Pub/Sub Chat</h3>
              {/* 메시지 출력 */}
              <div
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    height: "200px",
                    overflowY: "scroll",
                  }}
              >
                {messages.map((msg, index) => (
                    <p key={index} style={{ margin: "5px 0", fontFamily: "Arial, sans-serif" }}>
                      {msg}
                    </p>
                ))}
              </div>

              {/* 메시지 입력 */}
              <div style={{ marginTop: "10px" }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ padding: "5px", width: "80%" }}
                    placeholder="메시지를 입력하세요"
                />
                <button
                    onClick={sendMessage}
                    style={{ padding: "5px 10px", marginLeft: "10px" }}
                >
                  전송
                </button>
              </div>
            </div>
        )}
      </div>
  );
};

export default Chatting;
