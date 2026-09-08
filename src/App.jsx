import { useState } from "react";

export const App = () => {
  const [contents, setContents] = useState("");
  const [time, setTime] = useState(0);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(true);

  const handleInputContents = (e) => {
    const value = e.target.value;
    setContents(value);
    checkInputForm(value, time);
  };

  const handleinputTime = (e) => {
    const value = Number(e.target.value);
    setTime(value);
    checkInputForm(value, contents);
  };

  const handleClickEntry = (contents, time) => {
    setRecords([...records, { title: contents, time: time }]);
    setContents("");
    setTime(0);
  };

  const checkInputForm = (contents, time) => {
    if (contents === "" || time === 0 || time === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  const totalTime = records.reduce((total, record) => {
    return total + record.time;
  }, 0);

  return (
    <div>
      <h1>学習記録一覧</h1>
      <div>
        <label htmlFor="contents">
          学習内容：
          <input
            type="text"
            value={contents}
            id="contents"
            onChange={handleInputContents}
          />
        </label>
      </div>
      <div>
        <label htmlFor="time">
          学習時間：
          <input
            type="number"
            id="time"
            min="0"
            value={time}
            onChange={handleinputTime}
          />
          時間
        </label>
      </div>
      <p>入力されている学習内容：{contents}</p>
      <p>入力されている学習時間：{time}時間</p>
      <div>
        <button
          type="button"
          onClick={() => handleClickEntry(contents, time)}
          disabled={error}
        >
          登録
        </button>
      </div>
      {error && <p style={{ color: "red" }}>入力されていない項目があります</p>}
      <ul>
        {records.map((record) => (
          <li key={record.time}>
            <p>
              {record.title}：{record.time}時間
            </p>
          </li>
        ))}
      </ul>
      <p>合計時間：{totalTime}/1000（h）</p>
    </div>
  );
};
