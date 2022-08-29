import { useState } from "react";
import "./App.css";
import List from "./components/List";
import Alert from "./components/Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ show: true, msg: "", type: "" });

  const onsubmitHandler = (event) => {
    event.preventDefault();
    console.log("hrllloo");

    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else {
      showAlert(true, "success", "Item added to the List");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const onchangeHandler = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty List");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", " items removed");
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <div>
      <section className="section-center">
        <form className="grocery-form" onSubmit={onsubmitHandler}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} />}

          <h3>Remainder App</h3>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="eg :- Sleep ( 10pm to 5am )"
              value={name}
              onChange={onchangeHandler}
            ></input>
            <button type="submit" className="submit-btn">
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </form>

        {list.length > 0 && (
          <div className="grocery-container">
            <List items={list} removeItem={removeItem} />
            <button className="clear-btn" onClick={clearList}>
              Clear All
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
