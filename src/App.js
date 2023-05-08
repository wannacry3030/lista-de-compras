import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  //adicionando um hook para o local storage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("shoppingListItems"));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  //salvando os items no localstorage antes de sair da pagina
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("shoppingListItems", JSON.stringify(items));
    });
  }, [items]);

  function onRemoveItem(itemToRemove) {
    const newItems = items.filter((item) => {
      return item !== itemToRemove;
    });
    setItems(newItems);
  }

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const input = form.item;
    const newItems = [...items, input.value];
    setItems(newItems);
    form.reset();
  }

  return (
    <>
      <h1>Lista de compras</h1>
      <div className="shopping-list">
        <h2>Items para comprar</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="item"
            placeholder="adicione um item"
            required
          />
          <button>Adicionar</button>
        </form>
        <ul>
          {items.map((item, index) => (
            <Item onRemoveItem={onRemoveItem} key={item + index} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
}

//deletando items
function Item({ item, onRemoveItem }) {
  return (
    <li>
      {item}
      <button className="delete" onClick={() => onRemoveItem(item)}>
        x
      </button>
    </li>
  );
}
