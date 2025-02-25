function send(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}

const slider = document.getElementById('slider');
slider.addEventListener("input", () => {
    send({ columns: slider.value });
});

const onoffswitch = document.getElementById("onoffswitch");

onoffswitch.addEventListener("change", () => {
    send({ onoff: onoffswitch.checked.toString() });
});
