const root = document.querySelector('#app > div:nth-child(2)');
root.style.maxWidth = '100vw';

function resizeToColumns(columns) {
    const headersContainer = root.children[0].children[2].children[1].children[0].children[0].children[0].children[1];
    headersContainer.style.display = 'grid';
    headersContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    for (const child of headersContainer.children) {
        child.style.width = "100%";
    }

    const sections = [
        root.children[0].children[2].children[1].children[0].children[1].children[1],
        root.children[0].children[2].children[1].children[0].children[2].children[1],
        root.children[0].children[2].children[1].children[0].children[4],
    ];
    for (const section of sections) {
        console.log(section)
        for (const row of section.children) {
            const rowContainer = row.children[1];
            rowContainer.style.display = 'grid';
            rowContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
            for (const cell of rowContainer.children) {
                cell.style.width = '100%';
            }
        }
    }
}

resizeToColumns(5);
