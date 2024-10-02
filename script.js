const chemicalsData = [
    { name: 'Ammonium Persulfate', vendor: 'LG Chem', density: 3525.92, viscosity: 60.63, packaging: 'Bag', packSize: 100.00, unit: 'kg', quantity: 6495.18 },
    { name: 'Caustic Potash', vendor: 'Formosa', density: 3172.15, viscosity: 48.22, packaging: 'Bag', packSize: 100.00, unit: 'kg', quantity: 8751.90 },
    { name: 'Dimethylaminopropylamino', vendor: 'LG Chem', density: 8435.37, viscosity: 12.62, packaging: 'Barrel', packSize: 75.00, unit: 'L', quantity: 5964.61 },
    { name: 'Mono Ammonium Phosphate', vendor: 'Sinopec', density: 1597.65, viscosity: 76.51, packaging: 'Bag', packSize: 105.00, unit: 'kg', quantity: 8183.73 },
    { name: 'Ferric Nitrate', vendor: 'DowDuPont', density: 364.04, viscosity: 14.90, packaging: 'Bag', packSize: 105.00, unit: 'kg', quantity: 4154.33 },
    { name: 'n-Pentane', vendor: 'Sinopec', density: 4535.26, viscosity: 66.76, packaging: 'N/A', packSize: 'N/A', unit: 't', quantity: 6272.34 },
    { name: 'Glycol Ether PM', vendor: 'LG Chem', density: 6495.18, viscosity: 72.12, packaging: 'Bag', packSize: 250.00, unit: 'kg', quantity: 8749.54 },
    { name: 'Sulfuric Acid', vendor: 'BASF', density: 1800.45, viscosity: 21.78, packaging: 'Drum', packSize: 50.00, unit: 'L', quantity: 4321.65 },
    { name: 'Acetone', vendor: 'DowDuPont', density: 784.90, viscosity: 0.32, packaging: 'Can', packSize: 25.00, unit: 'L', quantity: 5298.12 },
    { name: 'Hydrochloric Acid', vendor: 'Solvay', density: 1150.28, viscosity: 18.54, packaging: 'Drum', packSize: 60.00, unit: 'L', quantity: 7023.45 },
    { name: 'Isopropyl Alcohol', vendor: 'LG Chem', density: 786.50, viscosity: 2.37, packaging: 'Can', packSize: 30.00, unit: 'L', quantity: 8419.75 },
    { name: 'Benzene', vendor: 'Shell', density: 876.40, viscosity: 0.65, packaging: 'Can', packSize: 20.00, unit: 'L', quantity: 5211.20 },
    { name: 'Methyl Ethyl Ketone', vendor: 'DowDuPont', density: 805.20, viscosity: 0.41, packaging: 'Can', packSize: 25.00, unit: 'L', quantity: 6584.30 },
    { name: 'Formic Acid', vendor: 'LG Chem', density: 1220.78, viscosity: 19.05, packaging: 'Drum', packSize: 55.00, unit: 'L', quantity: 7390.88 },
    { name: 'Sodium Hypochlorite', vendor: 'DowDuPont', density: 1230.11, viscosity: 1.20, packaging: 'Drum', packSize: 70.00, unit: 'L', quantity: 8921.45 }
];

let selectedRowIndex = null;


let newdata = false;
let filteredData = []; 

function searchByName() {
    const searchValue = document.getElementById('search-input').value.toLowerCase();
    filteredData = chemicalsData.filter(chemical =>
        chemical.name.toLowerCase().includes(searchValue)
    );

    if (searchValue === "") {
        document.getElementById('add-btn').disabled = false;
        renderFilteredTable(chemicalsData);
        newdata = false;
    } else {
        document.getElementById('add-btn').disabled = true;
        renderFilteredTable(filteredData);
        newdata = true;
    }
}

function renderTable() {
    if (newdata) {
        
        renderFilteredTable(filteredData);
        
    } else {
        
        renderFilteredTable(chemicalsData);
       
    }
}


function renderFilteredTable(data) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';  

    data.forEach((chemical, index) => {
        const row = document.createElement('tr');
        row.setAttribute('onclick', `selectRow(${index})`);
        row.classList.toggle('selected-row', selectedRowIndex === index);

        const checkboxCell = document.createElement('td');
        checkboxCell.setAttribute('onclick', `selectRow(${index})`);
        checkboxCell.classList.toggle('check-row', selectedRowIndex === index);
        checkboxCell.innerHTML = '&#10004;';
        row.appendChild(checkboxCell);

        for (const key in chemical) {
            const cell = document.createElement('td');
            cell.innerText = chemical[key];
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    });
}



let currentSortColumn = null;
let isAscending = true;

function sortTable(columnIndex) {
    const keys = ['name', 'vendor', 'density', 'viscosity', 'packaging', 'packSize', 'unit', 'quantity'];
    const key = keys[columnIndex - 1]; 

    if (currentSortColumn === columnIndex) {
        isAscending = !isAscending;
    } else {
        currentSortColumn = columnIndex;
        isAscending = true;
    }
    const sortdata = newdata ? filteredData : chemicalsData;
    sortdata.sort((a, b) => {
        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
            return isAscending ? a[key] - b[key] : b[key] - a[key];
        } else {
            const valA = a[key].toString().toLowerCase();
            const valB = b[key].toString().toLowerCase();
            if (valA < valB) return isAscending ? -1 : 1;
            if (valA > valB) return isAscending ? 1 : -1;
            return 0;
        }
    });

    renderTable();
}



function addRow() {
    const newRow = {
        name: 'New Chemical',
        vendor: 'New Vendor',
        density: 0,
        viscosity: 0,
        packaging: 'New',
        packSize: 0,
        unit: 'kg',
        quantity: 0
    };

  if(newdata){
    return
  }else{

    chemicalsData.push(newRow);

    const container = document.getElementById('table-body');
    const lastElement = container.lastElementChild; 
    lastElement.scrollIntoView({ behavior: 'smooth' });

  }
    

    renderTable();
  

}



function selectRow(index) {
    selectedRowIndex = index;
    renderTable();
}


function editCell(event) {
    event.stopPropagation(); 

    const cell = event.target;
    const initialValue = cell.innerText;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = initialValue;
    cell.innerText = '';
    cell.appendChild(input);
   
}

function editRow() {
    if (selectedRowIndex === null) {
        alert('Select a row to edit!');
        return;
    }

    const tableRow = document.querySelector(`tbody tr:nth-child(${selectedRowIndex + 1})`);
    tableRow.childNodes.forEach((cell, index) => {
        if (index !== 0) { 
            cell.setAttribute('onclick', `editCell(event)`);
            const input = document.createElement('input');
            input.type = 'text';
            input.value = cell.innerText;
            cell.innerText = '';
            cell.appendChild(input);
        }
    });

    document.getElementById('save-btn').disabled = false;
}


function saveRow() {
    if (selectedRowIndex === null) {
        alert('Select a row to save changes!');
        return;
    }

    const dataToSave = newdata ? filteredData : chemicalsData;

    const tableRow = document.querySelector(`tbody tr:nth-child(${selectedRowIndex + 1})`);
    const updatedData = {};

    tableRow.childNodes.forEach((cell, index) => {
        if (index !== 0) {
            const input = cell.querySelector('input');
            if (input) {
                const columnName = Object.keys(dataToSave[selectedRowIndex])[index - 1];
                const newValue = isNaN(input.value) ? input.value : parseFloat(input.value);
                updatedData[columnName] = newValue;
                cell.innerText = newValue;
            }
        }
    });

    Object.assign(dataToSave[selectedRowIndex], updatedData);

    if (newdata) {
        const originalIndex = chemicalsData.findIndex(chemical => chemical.name === dataToSave[selectedRowIndex].name);
        Object.assign(chemicalsData[originalIndex], updatedData);
    }

    selectedRowIndex = null;
    document.getElementById('save-btn').disabled = true;

    renderTable();
}

function moveUp() {
    if (selectedRowIndex !== null && selectedRowIndex > 0) {
        const movedata = newdata ? filteredData : chemicalsData;
        const temp = movedata[selectedRowIndex];
        movedata[selectedRowIndex] = movedata[selectedRowIndex - 1];
        movedata[selectedRowIndex - 1] = temp;
        selectedRowIndex--;
        renderTable();
    } else {
        alert('Select a row and ensure it is not the first row!');
    }
}

function moveDown() {
    if (selectedRowIndex !== null && selectedRowIndex < chemicalsData.length - 1) {
        const movedata = newdata ? filteredData : chemicalsData;
        const temp = movedata[selectedRowIndex];
        movedata[selectedRowIndex] = movedata[selectedRowIndex + 1];
        movedata[selectedRowIndex + 1] = temp;
        selectedRowIndex++;
        renderTable();
    } else {
        alert('Select a row and ensure it is not the last row!');
    }
}

function deleteRow() {
    if (selectedRowIndex !== null) {
        const dataToDelete = newdata ? filteredData : chemicalsData;
        const deletedChemical = dataToDelete.splice(selectedRowIndex, 1)[0]; 
        if (newdata) {
            const originalIndex = chemicalsData.findIndex(chemical => chemical.name === deletedChemical.name);
            chemicalsData.splice(originalIndex, 1);
        }

        selectedRowIndex = null;
        renderTable();
    } else {
        alert('Select a row to delete!');
    }
}

function refreshData() {
    selectedRowIndex = null;
    renderTable();
}

renderTable();
