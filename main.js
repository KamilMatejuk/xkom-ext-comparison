const containerSelector = ['ComparePageWrapper', 'CompareTableProductsWrapper', 'OverflowWrapper', 'ScrollingContainer'];
const headersContainerSelector = [...containerSelector, 'Wrapper/0', 'Row', 'ValueColumnsWrapper'];
const sectionContainerSelector1 = [...containerSelector, 'Wrapper/1', 'GridRowsWrapper'];
const sectionContainerSelector2 = [...containerSelector, 'Wrapper/2', 'GridRowsWrapper'];
const sectionContainerSelector3 = [...containerSelector, 'Wrapper/4'];


function findChild(parent, classes) {
    let element = parent;
    for (const selectedClassName of classes) {
        const name = selectedClassName.includes('/') ? selectedClassName.split('/')[0] : selectedClassName;
        const index = selectedClassName.includes('/') ? selectedClassName.split('/')[1] : 0;
        const found = [];
        for (const child of element.children) {
            for (const className of child.classList) {
                if (className.includes(name)) {
                    found.push(child);
                    break;
                }
            }
        }
        element = index < found.length ? found[index] : found[0];
    }
    return element;
}


function resizeToColumns(columns) {
    const root = document.querySelector('#app > div:nth-child(2)');
    root.style.maxWidth = columns ? '100vw' : '1156px';

    const headersContainer = findChild(root, headersContainerSelector);
    headersContainer.style.display = columns ? 'grid' : 'flex';
    headersContainer.style.gridTemplateColumns = columns ? `repeat(${columns}, 1fr)` : undefined;
    for (const child of headersContainer.children) {
        child.style.width = columns ? '100%' : '25%';
    }

    const sections = [sectionContainerSelector1, sectionContainerSelector2, sectionContainerSelector3];
    for (const section of sections) {
        const sectionElement = findChild(root, section);
        for (const row of sectionElement.children) {
            const rowContainer = row.children[1];
            rowContainer.style.display = columns ? 'grid' : 'flex';
            rowContainer.style.gridTemplateColumns = columns ? `repeat(${columns}, 1fr)` : undefined;
            for (const cell of rowContainer.children) {
                cell.style.width = columns ? '100%' : '25%';
            }
        }
    }
}


// receive message from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.columns) {
        resizeToColumns(message.columns);
    }
    if (message.onoff) {
        if (message.onoff === "true") {
            console.log('on')
            resizeToColumns(5);
        } else {
            console.log('off')
            resizeToColumns(undefined);
        }
    }
});


resizeToColumns(5);
