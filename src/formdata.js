export class JFormData {
    constructor(form) {
        this._data = {}

        if (form.toJSON) {
            this._data = form.toJSON()
            return this
        }

        const sortsNodes = (elements) => {
            let sorted = []
            let visited = new Set()
            const visit = (element) => {
                if (visited.has(element)) { return }
                visited.add(element)
                for (let child of element.children) {
                    if (element.contains(child)) {
                       visit(child)
                    }
                }
                sorted.unshift(element)
            }
            for (let element of elements) {
                visit(element)
            }
            return sorted
        }

        const nodes = sortsNodes(form.querySelectorAll('*[name]'))

        const parents = new Set()
        nodes.forEach((element) => {
            if (!element.getAttribute('name')) { return }
            const name = element.getAttribute('name')
            if (element.toJSON) {            
                parents.add(element)
                this._data[name] = element.toJSON()                
            } else {
                for (let parent of parents.values()) {
                    if (parent.contains(element)) {
                        return
                    }
                }
                const value = element.value || element.dataset.value || element.textContent
                switch (typeof element.value) {
                    case 'string':
                        this._data[name] = value
                        break;
                    case 'number':
                        this._data[name] = value
                        break;
                    case 'boolean':
                        this._data[name] = checked
                        break;
                    default:
                        this._data[name] = value
                        break;
                }
            }
        })
    }

    get data() {
        return this._data
    }

    set data(data) {
        this._data = data
    }

    toJSON() {
        return this._data
    }

    toString() {
        return JSON.stringify(this._data)
    }


}