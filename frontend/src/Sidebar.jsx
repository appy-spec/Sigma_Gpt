import "./Sidebar.css";
import { MyContext } from "./MyContext.jsx";
import { useContext, useEffect, useState } from "react";
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
    showSidebar,
    setShowSidebar
  } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch(
        "https://sigma-gpt-9ujx.onrender.com/api/thread"
      );

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
    setShowSidebar(false);

    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChat([]);
  };

  const changeThread = async (threadId) => {
    setShowSidebar(false);

    setReply(null);
    setNewChat(false);

    try {
      const response = await fetch(
        `https://sigma-gpt-9ujx.onrender.com/api/thread/${threadId}`
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
        `https://sigma-gpt-9ujx.onrender.com/api/thread/${threadId}`,
        {
          method: "DELETE",
        }
      );

      await response.json();

      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId)
      );

      if (threadId === currThreadId) {
        createNewChat();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className={`sidebar ${showSidebar ? "active" : ""}`}>
        <button onClick={createNewChat}>
          <img
            src="src/assets/blacklogo.png"
            alt="gpt logo"
            className="logo"
          />
          <span>
            <i className="fa-solid fa-pen-to-square"></i>
          </span>
        </button>

        <ul className="history">
          {allThreads?.length > 0 &&
            allThreads.map((thread) => (
              <li
                key={thread.threadId}
                onClick={() => changeThread(thread.threadId)}
              >
                {thread.title}&nbsp;&nbsp;&nbsp;&nbsp;

                <i
                  className="fa-solid fa-trash"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteThread(thread.threadId);
                  }}
                ></i>
              </li>
            ))}
        </ul>

        <div className="sign">
          <p>By Rahul &hearts;</p>
        </div>
      </section>
    </>
  );
}

export default Sidebar;
