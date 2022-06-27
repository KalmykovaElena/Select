const options = [
    {id: 1, value: 'Витебск'},
    {id: 2, value: 'Гродно'},
    {id: 3, value: 'Гомель'},
    {id: 4, value: 'Минск'},
    {id: 5, value: 'Брест'},
    {id: 6, value: 'Могилев'}

]
const newOptions = [
    {id: 1, value: 'Без группы'},
    {id: 2, value: 'С группой', group: 'Группа №1'},
    {id: 3, value: 'Без группы'},
    {id: 6, value: 'С группой', group: 'Группа №2'},
    {id: 4, value: 'С группой', group: 'Группа №1'},
    {id: 5, value: 'С группой', group: 'Группа №2'},
    {id: 5, value: 'С группой', group: 'Группа №2'},
    {id: 5, value: 'С группой', group: 'Группа №1'},
    {id: 6, value: 'С группой', group: 'Группа №2'}
]

class DropDown {
    constructor(selector, options, label, drop) {
        this.$select = document.querySelector(selector)
        this.options = options
        this.$label = document.querySelector(label)
        this.$dropDown = document.querySelector(drop)


        this.$select.addEventListener('click', (e) => {

            if (e.target.classList.contains(this.$label.classList.value)) {

                if (this.$dropDown.classList.contains('active')) {
                    this.close()
                } else {
                    this.open()

                }

            } else if (e.target.classList.contains('select__item')) {
                this.selectedItem(e.target)
                this.close()
            }

        })


    }

    addItems() {
        this.itemsHTML = options.map(({id, value}) => {

            return `<li data-id=${id} class="select__item">${value}</li>`
        }).join('')
        return this.$dropDown.insertAdjacentHTML("afterbegin", this.itemsHTML)
    }

    open() {
        this.$dropDown.classList.add('active')
    }

    close() {
        this.$dropDown.classList.remove('active')
    }

    selectedItem(li) {
        this.$label.innerHTML = li.innerHTML
    }

    groupSelect() {
        this.itemsGroup = this.options.reduce((acc, el) => {
            if (!acc[el.group]) {
                acc[el.group] = []
            }
            acc[el.group].push(el)
            return acc
        }, {})
        this.itemsHTML = Object.keys(this.itemsGroup).map((el) => {
            return `<ul> <span class="select__groups">${el !== 'undefined' ? el : ''}</span>${(this.itemsGroup[el]).map(({
                                                                                                                             id,
                                                                                                                             value
                                                                                                                         }) => {
                return `<li ${id} class="select__item select__group">${value}</li>`
            }).join('')}</ul>`
        }).join('')
        return this.$dropDown.insertAdjacentHTML('afterbegin', this.itemsHTML)
    }

}

const customSelect = new DropDown('.select', options, '.select__label', '.select__drop-down').addItems()
const newCustomSelect = new DropDown('.newSelect', newOptions, '.newSelect__label', '.newSelect__drop-down').groupSelect()
