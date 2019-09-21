function getDataset(element, name) {
    if (element.dataset) {
        return element.dataset[name] || '';
    } else if (element.getAttribute) {
        return element.getAttribute(`data-${name}`) || '';
    }
}