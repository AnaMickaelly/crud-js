const modal = document.querySelector('.modal-container');
const container = document.querySelector('.container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sFuncao = document.querySelector('#m-funcao');
const sSalario = document.querySelector('#m-salario');
const btnSalvar = document.querySelector('#btnSalvar');
let itens;
let id;

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
const setItensDB = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = '';
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

loadItens();

function insertItem(item, index) {
  let tr = document.createElement('tr');

  tr.innerHTML = `
  <td>${item.nome}</td>
  <td>${item.funcao}</td>
  <td>R$ ${item.salario}</td>
  <td class="acao">
    <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
  </td>
  <td class="acao">
    <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
  </td>
  `;
  tbody.appendChild(tr);
}

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onClick = (e) => {
    if (e.target.className.index.Of('modal-container') !== -1) {
      modal.classList.remove('active');
    }

    if (edit) {
      sNome.value = itens[index].nome;
      sFuncao.value = itens[index].funcao;
      sSalario.value = itens[index].salario;
      id = index;
    } else {
      sNome.value = '';
      sFuncao.value = '';
      sSalario.value = '';
    }
  };

  setItensDB();

  // modal.classList.remove('active');

  loadItens();
  id = undefined;
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensDB();
  loadItens();
}

btnSalvar.onclick = (e) => {
  if (sNome.value === '' || sFuncao.value === '' || sSalario.value === '') {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value;
    itens[id].funcao = sFuncao.value;
    itens[id].salario = sSalario.value;
  } else {
    itens.push({
      nome: sNome.value,
      funcao: sFuncao.value,
      salario: sSalario.value,
    });
  }
  setItensDB();

  modal.classList.remove('active');
  loadItens();
  id = undefined;
};
