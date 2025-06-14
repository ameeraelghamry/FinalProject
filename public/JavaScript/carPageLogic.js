window.addEventListener('DOMContentLoaded', () => {
document.getElementById('editCarForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const formData = new FormData(e.target);
        const carId = document.getElementById('carId').value;
        
        // Convert FormData to object (preserve all fields)
        const data = Object.fromEntries(formData.entries());
        
        // Convert empty strings to null for all fields
        Object.keys(data).forEach(key => {
            data[key] = data[key].trim() === '' ? null : data[key];
        });

        const response = await fetch(`/api/v1/cars/inside/${encodeURIComponent(carId)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data) // Send ALL fields
        });

        if (!response.ok) throw new Error(await response.text());
        
        alert('Car updated successfully!');
        window.location.href = `/api/v1/cars/inside/${carId}`;
    } catch (error) {
        console.error('Update failed:', error);
        alert(error.message || 'Update failed. Please try again.');
    }
})
});