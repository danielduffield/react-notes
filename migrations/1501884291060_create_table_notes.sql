-- up

create table notes (
  id INT unique not null,
  title TEXT,
  content TEXT
);

---

-- down

drop table saved_notes;
