
// Attach an event listener to intercept the form submission 
document.getElementById('smsForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect the form data into an object
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try{
        const response = await fetch('/api/send-sms',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(data)
        });
        const result = await response.json();
        if(result.success){
            alert('SMS sent successfully!');
            event.target.reset();
        }else{
            alert('Failed to Send SMS. Please try again!');
        }
    } catch(error){
        console.error('Error:',error);
        alert("Error sending SMS")
    }

});