import "./Note.css";

export default function Note() {
  return (
    <div className="note">
      <h3>Note title</h3>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo excepturi
        nam hic iusto vitae voluptas iure ipsam esse atque. Illo veniam quasi
        iure asperiores ab animi voluptatum vero totam voluptatibus!
      </p>
      <ul className="buttons">
        <button>Edit</button>
        <button>Delete</button>
      </ul>
    </div>
  );
}
