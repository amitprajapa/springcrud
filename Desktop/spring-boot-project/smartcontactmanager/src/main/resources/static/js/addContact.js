 function saveContact() {
            debugger;
            const firstNameInput = document.getElementById('firstName');
            const secondNameInput = document.getElementById('secondName');
            const phoneInput = document.getElementById('phone');
            const emailInput = document.getElementById('email');
            const workInput = document.getElementById('work');
            const descriptionInput = document.getElementById('description');
            const imageInput = document.querySelector('input[name="contactImage"]');

            function getAllFieldValues() {
                const values = {
                    firstName: firstNameInput.value,
                    secondName: secondNameInput.value,
                    phone: phoneInput.value,
                    email: emailInput.value,
                    work: workInput.value,
                    description: descriptionInput.value,
                    image: imageInput.value // Note: This will return the file path, not the actual file content
                };
                return values;
            }

            const formValues = getAllFieldValues();
            $.ajax({
                url: "http://localhost:8081/user/add-contact", 
                type: "POST",
                data: formValues,
                dataType: "json", 
                success: function(response) {
                    debugger;
                    console.log("Service response:", response);
                },
                error: function(xhr, status, error) {
                    console.error("Error:", error);
                }
            });
        }