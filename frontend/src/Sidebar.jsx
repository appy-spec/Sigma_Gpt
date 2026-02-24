import "./Sidebar.css";
import { MyContext } from "./MyContext.jsx";
import { useContext, useEffect } from "react";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setPrevChat,
    setReply,
    setCurrThreadId,
  } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const res = await response.json();

      const filterData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filterData.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChat([]);
  };

  const changeThread = async (threadId) => {
    setReply(null);
    setNewChat(false);

    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${threadId}`,
      );
      const res = await response.json();
      setPrevChat(res.message);
      setCurrThreadId(res.threadId);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${threadId}`,
        { method: "DELETE" },
      );
      const res = await response.json();
      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId != threadId),
      );

      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="sidebar">
      <button onClick={createNewChat}>
        <img
          src="src/assets/blacklogo.png"
          alt="gpt logo"
          className="logo"
        ></img>
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>

      <ul className="history">
        {allThreads?.length > 0 &&
          allThreads.map((thread, idx) => (
            <li key={idx} onClick={(e) => changeThread(thread.threadId)}>
              {thread.title}&nbsp;&nbsp;&nbsp;&nbsp;
              <i
                className="fa-solid fa-trash"
                onClick={(e) => (
                  e.stopPropagation(),
                  deleteThread(thread.threadId)
                )}
              ></i>
            </li>
          ))}
      </ul>

      <div className="sign">
        <p>By Rahul &hearts;</p>
      </div>
    </section>
  );
}

export default Sidebar;
