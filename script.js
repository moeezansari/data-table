document.addEventListener("DOMContentLoaded", function() {
  const headers = document.querySelectorAll("#data-table th");

  headers.forEach(header => {
    header.addEventListener("click", () => {
      const table = header.closest("table");
      const headerIndex = Array.prototype.indexOf.call(header.parentNode.children, header);
      const rows = Array.from(table.querySelectorAll("tbody tr"));

      let sortedRows;

      if (headerIndex === 2) { // Check if the clicked header is the "Product Name" column
        sortedRows = rows.sort((a, b) => {
          const aValue = a.cells[headerIndex].textContent.trim();
          const bValue = b.cells[headerIndex].textContent.trim();
          return aValue.localeCompare(bValue);
        });
      } else {
        sortedRows = rows.sort((a, b) => {
          const aValue = a.cells[headerIndex].textContent.trim();
          const bValue = b.cells[headerIndex].textContent.trim();
          return compareValues(aValue, bValue);
        });
      }

      if (header.classList.contains("asc")) {
        sortedRows.reverse();
        header.classList.remove("asc");
        header.classList.add("desc");
      } else {
        header.classList.remove("desc");
        header.classList.add("asc");
      }

      const tbody = table.querySelector("tbody");
      tbody.innerHTML = "";
      tbody.append(...sortedRows);
    });
  });

  function compareValues(a, b) {
    if (isNaN(a) || isNaN(b)) {
      return a.localeCompare(b, undefined, { numeric: true });
    } else {
      return parseFloat(a) - parseFloat(b);
    }
  }
});
