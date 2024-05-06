const createTableItem = (itemType, content) => {
  const element = document.createElement(itemType);
  element.textContent = content;
  return element;
};

const createThRow = (columns) => {
  const tr = document.createElement("tr");
  columns.forEach((column) => {
    tr.appendChild(createTableItem("th", column));
  });
  return tr;
};

const createTableRow = (columns, item) => {
  const tr = document.createElement("tr");
  columns.forEach((column) => {
    tr.appendChild(createTableItem("td", item[column]));
  });
  return tr;
};

const createTableHead = (columns) => {
  return document
    .createElement("thead")
    .appendChild(createThRow(columns.map((column) => column.title)));
};

const createTableBody = (columns, data) => {
  const tbody = document.createElement("tbody");
  data.forEach((item) => {
    tbody.appendChild(
      createTableRow(
        columns.map((column) => column.value),
        item
      )
    );
  });
  return tbody;
};

function DataTable(config, data) {
  const tableWrapper = document.querySelector(`${config.parent}`);
  const table = document.createElement("table");
  table.appendChild(createTableHead(config.columns));
  table.appendChild(createTableBody(config.columns, data));
  tableWrapper.appendChild(table);
}

const config1 = {
  parent: "#usersTable",
  columns: [
    { title: "Ім’я", value: "name" },
    { title: "Прізвище", value: "surname" },
    { title: "Вік", value: "age" },
  ],
};

const users = [
  { id: 30050, name: "Вася", surname: "Петров", age: 12 },
  { id: 30051, name: "Вася", surname: "Васечкін", age: 15 },
  { id: 30051, name: "Aleks", surname: "Myself", age: 35 },
];

const users2 = [
  { id: 30050, name: "Вася", surname: "Петров", age: 12 },
  { id: 30051, name: "Вася", surname: "Васечкін", age: 15 },
  { id: 30051, name: "Aleks", surname: "Myself", age: 35 },
];

DataTable(config1, users);
DataTable(config1, users2);
