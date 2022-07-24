async function newFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const device = document.querySelector('input[name="device"]').value;

    const response = await fetch(`/api/devices`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            device
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);