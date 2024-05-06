const baseUrl = "https://mock-api.shpp.me/ochumachenko";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(problemMessage, error);
    return null;
  }
}

// DataTable

const problemMessage = "There was a problem with the fetch operation:";

const createTableItem = (itemType, content) => {
  const element = document.createElement(itemType);
  element.innerHTML = content;
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
    if (typeof column === "function") {
      tr.appendChild(createTableItem("td", column(item)));
    } else {
      tr.appendChild(createTableItem("td", item[column]));
    }
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

const DataTable = async (config) => {
  const { data } = await fetchData(config.apiUrl);
  const tableWrapper = document.querySelector(`${config.parent}`);
  if (!data) {
    tableWrapper.textContent = problemMessage;
  }
  const table = document.createElement("table");
  table.appendChild(createTableHead(config.columns));
  table.appendChild(createTableBody(config.columns, Object.values(data)));
  tableWrapper.appendChild(table);
};

// use

const getColorLabel = (color) => {
  const label = `<div class="color-label" style="width: 100%; height: 20px; background-color: ${color};"></div>`;
  return label;
};

const getAge = (userBirthday) => {
  const today = new Date();
  const birthDate = new Date(userBirthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const config1 = {
  parent: "#usersTable",
  columns: [
    { title: "Ім’я", value: "name" },
    { title: "Прізвище", value: "surname" },
    { title: "Вік", value: (user) => getAge(user.birthday) },
    {
      title: "Фото",
      value: (user) =>
        `<img src="${user.avatar}" alt="${user.name} ${user.surname}"/>`,
    },
  ],
  apiUrl: `${baseUrl}/users`,
};

const config2 = {
  parent: "#productsTable",
  columns: [
    { title: "Назва", value: "title" },
    {
      title: "Ціна",
      value: (product) => `${product.price} ${product.currency}`,
    },
    { title: "Колір", value: (product) => getColorLabel(product.color) },
  ],
  apiUrl: `${baseUrl}/products`,
};

DataTable(config1);
DataTable(config2);
