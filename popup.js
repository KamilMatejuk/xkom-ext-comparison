function send(columns) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { columns: columns });
    });
    console.log(`sent ${columns}`)
}

const slider = document.getElementById('slider');
slider.addEventListener("input", function() {
    send(slider.value);
});
