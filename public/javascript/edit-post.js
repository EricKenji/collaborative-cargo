async function editFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const device = document.querySelector('input[name="device"]').value;
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/devices/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            device
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText)
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);