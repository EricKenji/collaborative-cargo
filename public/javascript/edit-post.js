async function editFormHandler(event) {
    event.preventDefault();

    const origin = document.querySelector('input[name="origin"]').value;
    const destination = document.querySelector('input[name="destination"]').value;
    const pickup_date = document.querySelector('input[name="pickup_date"]').value;
    const weight = document.querySelector('input[name="weight"]').value;
    const miles = document.querySelector('input[name="miles"]').value;
    const equipment_type = document.querySelector('input[name="equipment_type"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            origin,
            destination,
            pickup_date,
            weight,
            miles,
            equipment_type
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText)
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);