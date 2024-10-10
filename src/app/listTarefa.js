const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTak = document.querySelector('.app__form-add-task');
const textAreaForm = document.querySelector('.app__form-textarea');

const task = []

btnAddTask.addEventListener('click', () => {
    formAddTak.classList.toggle('hidden-task');

});

formAddTak.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskObjet = {
        descricao: textAreaForm.value,
    }
    task.push(taskObjet);
    localStorage.setItem('task', taskObjet)

});
