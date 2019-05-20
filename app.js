class Book {
    constructor(name, author, isdn){
        this.name = name
        this.author= author
        this.isdn = isdn
    }
}

class UI {

    showAlert(message, classname){
        const div = document.createElement('div')
        div.appendChild(document.createTextNode(message))
        div.classList.add('alert', classname)
        const form = document.getElementById('book_form')
        form.insertAdjacentElement('beforebegin', div)
        setTimeout(() => {
            document.querySelector(`.${classname}`).remove()
        }, 3000);
    }

    addBookToList(book) {
        const table = document.getElementById('book_table').insertRow()
        Object.values(book).forEach(item => {
            const el = table.insertCell()
            el.appendChild(document.createTextNode(item))
        });
        const el = table.insertCell()
        el.innerHTML = '<button class="btn btn-danger delete"> DELETE </button>'
    }

    removeBookFromList(target) {
        if(target.nodeName === 'BUTTON')
            target.parentElement.parentElement.remove()
    }

    clearFields() {
        document.getElementById('book_name').value = '' 
        document.getElementById('author_name').value = ''
        document.getElementById('isdn').value = ''
    }
}


// Attach event listener to form on submit
document.getElementById("book_form").addEventListener("submit", (e) => {
    e.preventDefault()

    const book_name = document.getElementById('book_name').value
    const author_name = document.getElementById('author_name').value
    const isdn = document.getElementById('isdn').value

    const book = new Book(book_name, author_name, isdn)
    const ui = new UI()

    if ( book_name === '' || author_name === '' || isdn === '') {

        ui.showAlert('please fill all the fields correctly','error')

    } else {

        ui.addBookToList(book)
        ui.showAlert('new book added', 'success')
        ui.clearFields()

    }
})

// Attach event listener to book table delete button
document.getElementById('book_table').addEventListener('click', (e) => {
    e.preventDefault()
    const ui = new UI()
    ui.removeBookFromList(e.target)
    ui.showAlert('book removed', 'success')
})